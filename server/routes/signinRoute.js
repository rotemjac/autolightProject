const express = require("express");
const router = express.Router();
const dbOperations = require('../db/dbOperations');

router.post('/signin', async (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;

    let signinUser = await queryUser(userName, password);
    if (signinUser) {
        res.send({
            Id: signinUser.Id,
            UserName: signinUser.UserName,
            IsAdmin: signinUser.IsAdmin,
        });

    } else {
        res.status(401).send('Incorrect user name or password');
    }
});

async function queryUser(userName, password) {
    try {
        var queryToExecute = "select * from [autoLightDb].[dbo].[Users] WHERE userName='" + userName + "' AND Password='" + password + "'";

        data = await dbOperations.execQuery(queryToExecute);
        let curUserData = data[0];
        return curUserData;
    } catch (error) {
        console.log(error);
    }
}

//export this router to use in our index.js
module.exports = router;
