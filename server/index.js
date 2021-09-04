const http = require("http");
const express = require("express");
const app = express();
// import bodyParser from 'body-parser';
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;
const warningLights = require('./routes/warningLightsRoute');
const signinRoute = require('./routes/signinRoute');
const registerRoute = require('./routes/registerRoute');
const identifyWarningLightsInDashboardRoute = require('./routes/identifyWarningLightsInDashboardRoute');
const favoritesRoute = require('./routes/favoritesRoute');

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/products', warningLights);
app.use('/api/userSignin', signinRoute);
app.use('/api/userRegister', registerRoute);
app.use('/api/identifyWarningLightsInDashboard', identifyWarningLightsInDashboardRoute);
app.use('/api/favorites', favoritesRoute);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
