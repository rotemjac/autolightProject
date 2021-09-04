const express = require("express");
const favoritesRouter = express.Router();

var sqlConfig = require('../db/dbconfig');
const sql = require('mssql');

favoritesRouter.get('/', async (req, result) => {
    console.log("------------------------ GET FAVORITES -----------------------------------");

    let userName = req.query.userName;

    let results = await getFavoritesList(userName);
    result.send(results.recordset);
});


favoritesRouter.post('/', async (req, result) => {
    console.log("------------------------ POST ADD FAVORITES -----------------------------------");

    let userName = req.body.userName;
    let favWarningLightId = req.body.warningLightId;
    // let currRequest = req.body.req;

    // if (currRequest === "ADD")
    // {
    await addToFavorites(userName, favWarningLightId);
//    }
//     else if  (currRequest === "REMOVE")
//     {
//         await removeFromFavorites(userName, favWarningLightId);
//     }

    result.send({
        //UserName: userName,
        WarningLightId: favWarningLightId,
    });
});

favoritesRouter.delete('/', async (req, result) => {
    console.log("------------------------ DELETE FAVORITES -----------------------------------");
    let userName = req.query.userName;
    console.log("userName req.query.userName= " + userName);
    let favWarningLightId = req.query.warningLightId;

    await removeFromFavorites(userName, favWarningLightId);

    result.send({
        //UserName: userName,
        WarningLightId: favWarningLightId,
    });
});

async function addToFavorites(userName, favWarningLightId) {
    try {
        let pool = await sql.connect(sqlConfig);

        // Get UserId
        let queryToExecute = "SELECT Id FROM [dbo].[Users] WHERE UserName='" + userName + "'";
        let userIdResult = await pool.request().query(queryToExecute);
        let userId = userIdResult.recordset[0].Id;

        // TODO: check if necessery
        // Check if warning light is already in favorites
        queryToExecute = "SELECT WarningLightId FROM [dbo].[Favorites] WHERE WarningLightId='" + favWarningLightId + "'";
        let warningLightExist = await pool.request().query(queryToExecute);

        // Add new warning light to favorites
        if (warningLightExist.recordset[0] === undefined) {
            queryToExecute = "INSERT INTO [autoLightDb].[dbo].[favorites] (UserId, WarningLightId) VALUES ("
                + userId + ","
                + "'" + favWarningLightId + "'"
                + ")"

            await pool.request().query(queryToExecute);
        }
    } catch (error) {
        console.log(error);
    }
}

async function removeFromFavorites(userName, favWarningLightId) {
    console.log("------------------ REMOVE -----------------");
    try {
        let pool = await sql.connect(sqlConfig);

        // Get UserId
        console.log("userName = " + userName);
        let queryToExecute = "SELECT Id FROM [dbo].[Users] WHERE UserName='" + userName + "'";
        let userIdResult = await pool.request().query(queryToExecute);
        let userId = userIdResult.recordset[0].Id;

        // Remove warning light from favorites
        queryToExecute = "DELETE FROM [autoLightDb].[dbo].[favorites] WHERE WarningLightId='" + favWarningLightId + "' AND UserId='" + userId + "'";

        await pool.request().query(queryToExecute);
    } catch (error) {
        console.log(error);
    }
}

async function getFavoritesList(userName) {
    console.log("------------------ GET FAVORITE LIST -----------------");
    try {
        let pool = await sql.connect(sqlConfig);

        // Get UserId
        let queryToExecute = "SELECT Id FROM [dbo].[Users] WHERE UserName='" + userName + "'";
        console.log(userName);
        let userIdResult = await pool.request().query(queryToExecute);
        console.log(userIdResult);
        let userId = userIdResult.recordset[0].Id;

        queryToExecute = "SELECT F.WarningLightId , W.* FROM [autoLightDb].[dbo].[Favorites] F JOIN [autoLightDb].[dbo].[WarningLightsTbl] W ON F.WarningLightId=W.Id  WHERE F.UserId='" + userId + "'";
        let results = await pool.request().query(queryToExecute);

        return results;

    } catch (error) {
        console.log(error);
    }
}


module.exports = favoritesRouter;
