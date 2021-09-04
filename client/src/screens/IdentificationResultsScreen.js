import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addToFavoritesAction, removeFromFavoritesAction} from '../actions/productActions';
import {showResultsAction} from '../actions/identifyWarningLightsInDashboardActions';
import clsx from 'clsx';
import {
    alpha, makeStyles, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton,
    Typography, Grid, Container, Box
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './IdentificationResultsScreen.css';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandText: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    iconButtonLabel: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto"
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch"
        }
    },
}));


//todo: add result image
//todo: make all cards same size
//todo: resize pictures to smaller
function IdentificationResultsScreen(props) {

    const classes = useStyles();
    const [expandedId, setExpandedId] = useState(-1);

    const identificationResults = useSelector(state => state.productList);
    console.log(identificationResults);
    const {products, favorites, loading, error} = identificationResults;

    const handleFavorites = (warningLightid) => {
        // Add to favorites
        if (favorites.findIndex(favorites => favorites.WarningLightId === warningLightid) === -1) {
            dispatch(addToFavoritesAction(warningLightid));
        } else // Remove from favorites
        {
            dispatch(removeFromFavoritesAction(warningLightid));
        }
    }

    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        console.log("NEHNAKNU");
        dispatch(showResultsAction(props.location.state.resultIds));
    }, [dispatch])


    return <Container>
        {/* Header */}
        <Box className="headerBox" fontSize={32}> Recognized Warning Lights </Box>

        <div className="resultsTop">
            <img className="resuslt" key={Date.now()} src={props.location.state.imgPath} alt="dashboard image"/>
        </div>

        {/* <div >AutoLight recognized the following warning lights</div> */}

        <Grid container spacing={3} className="rootG">
            {
                // products && products.map((warningLight, i) =>
                products && products.map((warningLight, i) =>
                    <Grid item xs={7} sm={5} md={3} key={warningLight.Id}>
                        <Card className="rootCard">
                            <CardHeader className="title"
                                        title={warningLight.Name}/>
                            <CardMedia className="media" style={{display: 'flex'}}
                                       title={warningLight.Name}>
                                <img className="img" src={warningLight.displayImgPath}/>
                            </CardMedia>
                            <CardContent>
                                <Typography className="Explanation"
                                            variant="body2" color="textSecondary" component="p">
                                    {/*<Typography paragraph color="textSecondary">*/}
                                    {warningLight.Explanation}
                                    {/*</Typography>*/}
                                </Typography>
                            </CardContent>

                            <CardActions disableSpacing>

                                {localStorage.getItem("signedUser") !== null ?

                                    (<IconButton onClick={() => handleFavorites(warningLight.Id)}
                                                 aria-label="add to favorites">
                                        {favorites.findIndex(favorites => favorites.WarningLightId === warningLight.Id) > -1 ?
                                            (<Tooltip title="remove from favorites">
                                                    <FavoriteIcon style={{fill: "red"}}/>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="add to favorites">
                                                    <FavoriteIcon/>
                                                </Tooltip>
                                            )}
                                        {/*// (<FavoriteIcon style={{ fill: "red" }}/>) : (<FavoriteIcon/>)}*/}
                                    </IconButton>) : (<div/>)}

                                <Box textAlign="right"
                                     className={clsx(classes.expandText)}
                                >
                                    {expandedId == i ? "Hide more info" : "Show more info"}
                                </Box>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expandedId === i,
                                    })}
                                    onClick={() => handleExpandClick(i)}
                                    aria-expanded={expandedId === i}
                                    aria-label="show more">
                                    <ExpandMoreIcon/>
                                </IconButton>

                            </CardActions>
                            <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                                <CardContent className="cardContant">
                                    <Box className="titleBox">Recommendation:</Box>
                                    <Typography paragraph>
                                        {warningLight.Recommendation}
                                    </Typography>
                                    <Box className="titleBox">Severity:</Box>
                                    <Typography paragraph>
                                        {warningLight.Severity}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                )
            }
        </Grid>
    </Container>

}

export default IdentificationResultsScreen;
