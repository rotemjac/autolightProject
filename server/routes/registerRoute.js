const express = require("express");
const registerRouter = express.Router();
const dbOperations = require('../db/dbOperations');

registerRouter.post('/register', async (req, result) => {

    let userName = req.body.userName;
    let isUserTaken = await isUserNameExist(userName);
    if (isUserTaken)
        result.status(400).send('User name already taken');
    else {
        let email = req.body.email;
        let password = req.body.password;

        currId = await createNewUser(userName, email, password);
        result.send({
            Id: currId,
            UserName: userName,
            IsAdmin: 0,
        });
    }
});

async function createNewUser(userName, email, password) {
    try {
        let currId = await findNextId();
        let queryToExecute = "INSERT INTO [autoLightDb].[dbo].[Users] VALUES ("
            + currId + ","
            + "'" + userName + "',"
            + "'" + email + "',"
            + "'" + password + "',"
            + "0"
            + ")"

        await dbOperations.execQuery(queryToExecute);
        return currId;
    } catch (error) {
        console.log(error);
    }
}

async function findNextId() {
    let queryToExecute = "SELECT MAX(Id) as maxId FROM [dbo].[Users]";
    let data = await dbOperations.execQuery(queryToExecute);
    let maxId = data[0].maxId;
    if (maxId == null)
        maxId = -1; //first id is 0

    return maxId + 1;
}

async function isUserNameExist(userName) {

    let queryToExecute = "SELECT COUNT(*) as usersNum "
        + "FROM [dbo].[Users] WHERE UserName ='" + userName + "'";
    let data = await dbOperations.execQuery(queryToExecute);
    let usersNum = data[0].usersNum;

    return usersNum != 0;

}

//export this router to use in our index.js
module.exports = registerRouter;
