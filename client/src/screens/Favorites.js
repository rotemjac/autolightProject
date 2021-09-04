import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {listFavorites, removeFromFavoritesAction} from '../actions/productActions';
import clsx from 'clsx';
import {
    alpha, makeStyles, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton,
    Typography, Grid, Container, Box
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from "@material-ui/core/Tooltip";

import './Favorites.css';

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


function Favorites(props) {
    const classes = useStyles();
    const [expandedId, setExpandedId] = useState(-1);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const favoritesList = useSelector(state => state.productList);
    const {products, favorites, loading, error} = favoritesList;

    const handleFavorites = (warningLightid) => {
        // Remove from favorites
        dispatch(removeFromFavoritesAction(warningLightid));
    }

    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
    };


    const handleClick = (event) => {
        setExpandedId(-1);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listFavorites());
        return () => {
            //
        };
    }, [dispatch])


    return loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
            <Container>
                {/* Header */}
                <Box className="headerBox" fontSize={32}>My Favorite Warning Lights </Box>
                {/* Lighs cards */}
                <Grid container spacing={3} className="rootG">
                    {
                        favorites && favorites.map((product, i) =>
                            <Grid item xs={7} sm={5} md={3} key={i}>
                                <Card className="rootCard" key={product.Id}>
                                    <CardHeader className="title"
                                                title={product.Name}/>
                                    <CardMedia className="media" style={{display: 'flex'}}
                                               title={product.Name}>
                                        <img className="img" src={product.displayImgPath} alt={product.Name}/>
                                    </CardMedia>

                                    <CardActions disableSpacing>
                                        <IconButton onClick={() => handleFavorites(product.Id)}
                                                    aria-label="add to favorites">
                                            <Tooltip title="remove from favorites">
                                                <FavoriteIcon style={{fill: "red"}}/>
                                            </Tooltip>
                                        </IconButton>

                                        <Box textAlign="right"
                                             className={clsx(classes.expandText)}
                                        >
                                            {expandedId === i ? "Hide info" : "Show info"}
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
                                            <Box className="titleBox">Explanation:</Box>
                                            <Typography paragraph>
                                                {product.Explanation}
                                            </Typography>
                                            <Box className="titleBox">Recommendation:</Box>
                                            <Typography paragraph>
                                                {product.Recommendation}
                                            </Typography>
                                            <Box className="titleBox">Severity:</Box>
                                            <Typography paragraph>
                                                {product.Severity}
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

export default Favorites;
