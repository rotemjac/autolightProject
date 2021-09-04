const express = require('express');
const router = express.Router();

const dbOperations = require('../db/dbOperations');

const sqlConfig = require('../db/dbconfig');
const sql = require('mssql')

const fs = require('fs');
const multer = require('multer');
const {uploadFile, deleteFile} = require('./s3')
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./server/images");
    },
    filename: async function (req, file, cb) {
        let id = await findNextId(req);
        console.log(id);
        cb(null, id.toString());
    }
});
const upload = multer({storage: storage});

const colors = ["Red", "Yellow", "Green", "Blue"];

router.get("/", async (req, res) => {
    const filter = req.query.filter ? req.query.filter : "";

    let filterQuery = getFilterQuery(filter);
    let results = await executeQueries(req, filterQuery);
    res.send({
        warningLights: results[0],
        favorites: results[1],
    });
});


async function executeQueries(req, filterQuery) {
    console.log(new Date())
    let pool = await sql.connect(sqlConfig);
    console.log(new Date())
    //Get warning lights filtered list

    let warningLightsResult = await pool.request().query(filterQuery);

    let warningLightsList = warningLightsResult.recordset;

    // Get userId
    let userName = req.query.userName ? req.query.userName : "";

    let favoritesList = [];
    if (userName !== "") {
        let userIdQuery = "SELECT Id FROM [dbo].[Users] WHERE UserName='" + userName + "'";
        let userIdResult = await pool.request().query(userIdQuery);
        let userId = userIdResult.recordset[0].Id;

        // Get userName
        let favoritesQuery = "SELECT WarningLightId FROM [dbo].[Favorites] WHERE UserId='" + userId + "'";
        let favoritesResult = await pool.request().query(favoritesQuery);
        favoritesList = favoritesResult.recordset;
    }

    return [warningLightsList, favoritesList];
}


function getFilterQuery(filter) {
    let whereQuery = "";

    if (filter) {
        if (filter === "Common") {
            whereQuery = "where IsCommon=1";
        } else if (colors.indexOf(filter) > -1) // Is color
        {
            whereQuery = "where Color=" + "'" + filter + "'";
        } else if (filter.startsWith('ByText')) {
            whereQuery = "where Text like " + "'%" + filter.substring(6) + "%'";
        } else if (filter.startsWith('ByName')) {
            whereQuery = "where Name like " + "'%" + filter.substring(6) + "%'";
        }
    }

    // Get filtered warning lights list
    let filterQuery = "select * from [dbo].[WarningLightsTbl] " + whereQuery;

    return filterQuery;
}

router.delete("/", async (req, res) => {
    const id = req.query.filter ? req.query.filter : "";
    let query = "select * from [dbo].[WarningLightsTbl] where Id = " + id;
    let data = await dbOperations.execQuery(query);
    let whereQuery = "where Id=" + "'" + id + "'";
    let currQuery = "delete from [dbo].[WarningLightsTbl] " + whereQuery;
    await deleteFile(id);
    await dbOperations.execQuery(currQuery);
    res.send(data);
});

async function findNextId(req) {
    if (req.body.id === undefined) {
        let queryToExecute = "SELECT MAX(Id) as maxId FROM [dbo].[WarningLightsTbl]";
        let data = await dbOperations.execQuery(queryToExecute);
        let maxId = data[0].maxId;
        if (maxId == null)
            maxId = -1; //first id is 0

        return maxId + 1;
    } else {
        return req.body.id;
    }

}

router.post("/", upload.single('image'), async (req, res) => {
    console.log("in post");
    const file = req.file;
    let id = await findNextId(req);
    let severity = req.body.severity + '/10';
    let name = req.body.name;
    let explanation = req.body.explanation;
    let reccomendation = req.body.recommendation;
    let color = req.body.color;
    let common = req.body.isCommon;
    let isCommon = common === 'true' ? 1 : 0;
    const result = await uploadFile(file);
    await unlinkFile(file.path)

    let query = 'INSERT INTO WarningLightsTbl  (Id,Name,displayImgPath,SearchImgDir,Explanation,Recommendation,Color,Severity,IsCommon) VALUES'
        + "(" + id + "," +
        "'" + name + "'," +
        "'" + result.Location + "'," +
        "'" + './searchImages/warningLight' + id + "'," +
        "'" + explanation + "'," +
        "'" + reccomendation + "'," +
        "'" + color + "'," +
        "'" + severity + "'," +
        "'" + isCommon + "');";

    await dbOperations.execQuery(query);
    let currQuery = "select * from [dbo].[WarningLightsTbl] where Id = " + id;
    let data = await dbOperations.execQuery(currQuery);

    res.send(data);
})

router.put("/", upload.single('image'), async (req, res) => {
    const file = req.file;

    let severity = req.body.severity + '/10';
    let id = req.body.id;
    let name = req.body.name;
    let explanation = req.body.explanation;
    let reccomendation = req.body.recommendation;
    if (file !== undefined) {
        console.log("not undefined");
        await deleteFile(id);
        await uploadFile(file);
    }
    let query = 'UPDATE WarningLightsTbl ' + 'SET Name = ' + "'" + name + "'," +
        'Explanation = ' + "'" + explanation + "'," +
        'Recommendation = ' + "'" + reccomendation + "'," +
        'Severity = ' + "'" + severity + "'" +
        ' WHERE Id = ' + id + ';';

    await dbOperations.execQuery(query);
    let currQuery = "select * from [dbo].[WarningLightsTbl] where Id = " + id;
    let data = await dbOperations.execQuery(currQuery);
    res.send(data);
})

module.exports = router;

