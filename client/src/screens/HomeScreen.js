import React from "react";
import {Link} from "react-router-dom";
import {Grid, Box, Button} from '@material-ui/core';
import "./HomeScreen.css"

function HomeScreen() {
    return (
        <main>
            <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></link>

            <Box className="headerBox"> Welcome to AutoLight! </Box>

            <Grid container className="homeScreenGrid">
                <Grid item xs={12} sm={12} md={6} className="gridItem">
                    <Button
                        variant='outlined'
                        classes={{label: "label", outlined: "homeBtn"}}
                        component={Link}
                        to="/identifyWarningLightsInDashboard">
                        <img src="/Images/Menu_Images/Auto_Search.jpg" className="homeImg" alt="Auto Search"/>
                        Auto search by uploading an image
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="gridItem">
                    <Button
                        variant='outlined'
                        classes={{label: "label", outlined: "homeBtn"}}
                        component={Link}
                        to="/WarningLights">
                        <img src="/Images/Menu_Images/Filter_Search.jpg" className="homeImg" alt="Filter Search"/>
                        Manual search using various filters
                    </Button>
                </Grid>
            </Grid>
        </main>

    );
}

export default HomeScreen;
