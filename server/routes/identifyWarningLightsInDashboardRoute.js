const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
const dbOperations = require('../db/dbOperations');
const fs = require('fs');

//todo: change storageDanit name
const multer = require('multer');
const storageDanit = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./server/imgProcessing/uploaded");
    },
    filename: function (req, file, cb) {
        cb(null, 'uploadedImg.jpg');
    }
});
const uploadDanit = multer({storage: storageDanit});

router.post("/saveImg", uploadDanit.single('uploadedFile'), async (req, res) => {
    console.log("Image saved successfully in ./server/uploaded/uploadedImg");
});

router.get("/", async (req, res) => {
    let warningLightsNum = req.query.warningLightsNum;
    let imgName = req.query.imgName;
    await runPythonIdentification(warningLightsNum, imgName, res);
})

router.get("/showResults", async (req, res) => {

    let resultsIds = req.query.resultsIds;
    let userName = req.query.userName ? req.query.userName : "";
    let data = await getIdentifiedLightsData(resultsIds, userName);
    // res.send(data);
    res.send({
        warningLights: data[0],
        favorites: data[1],
    });
})

async function getIdentifiedLightsData(resultsIds, userName) {
    let warningLightsList = null;
    let warningLightsQuery = "select * from [dbo].[WarningLightsTbl] WHERE Id IN (" + resultsIds + ")";
    warningLightsList = await dbOperations.execQuery(warningLightsQuery);

    let favoritesList = [];
    if (userName !== "") {
        // Get userId
        let userIdQuery = "SELECT Id FROM [dbo].[Users] WHERE UserName='" + userName + "'";
        let userIdResult = await dbOperations.execQuery(userIdQuery);
        let userId = userIdResult[0].Id;

        // Get user favorite list
        let favoritesQuery = "SELECT WarningLightId FROM [dbo].[Favorites] WHERE UserId='" + userId + "'";
        favoritesList = await dbOperations.execQuery(favoritesQuery);
    }

    return [warningLightsList, favoritesList];
    // return data;
}

async function runPythonIdentification(warningLightsNum, imgName, res) {
    const {spawn} = require('child_process');
    // const pythonProcess = spawn('C:\\Users\\danit\\AppData\\Local\\Programs\\Python\\Python37\\python.exe', ['.\\server\\imgProcessing\\identifyWarningLights.py',warningLightsNum]);
    const pythonProcess = spawn('.\\server\\imgProcessing\\Python37\\python.exe', ['.\\server\\imgProcessing\\identifyWarningLights.py', warningLightsNum, imgName]);


    pythonProcess.stdout.on('data', (data) => {
        data = data.toString().replace('\r\n', '');
        console.log(data);
        res.end(data);

    });
}

//export this router to use in our index.js
module.exports = router;
