import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {listProducts, addToFavoritesAction, removeFromFavoritesAction} from '../actions/productActions';
import clsx from 'clsx';
import {
    alpha, makeStyles, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton,
    Typography, Grid, Container, Box, Tabs, Tab, Popover, MenuItem, InputBase, Button
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from "@material-ui/icons/Search";
import AppsIcon from '@material-ui/icons/Apps';
import Tooltip from "@material-ui/core/Tooltip";

import './WarningLights.css';
import ButtonGroup from "@material-ui/core/ButtonGroup";

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
            width: "22ch"
        }
    },
}));


function WarningLights(props) {
    const classes = useStyles();
    const [expandedId, setExpandedId] = useState(-1);
    const [filter, setFilter] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const productList = useSelector(state => state.productList);
    const {products, favorites, loading, error} = productList;

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

    const handleSearchChange = (e) => {
        setFilter("Advanced");
        e.preventDefault();
        setAnchorEl(null);
        dispatch(listProducts(searchKeyword));
    }

    const handleFilterChange = (e, value) => {
        setExpandedId(-1);

        if (value !== "Advanced") {
            setFilter(value);
            dispatch(listProducts(value));
        } else {
            handleClick(e);
            setFilter(value);
        }
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
        dispatch(listProducts());
        return () => {
            //
        };
    }, [dispatch])


    return loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
            <Container>
                {/* Header */}
                <Box className="headerBox" fontSize={32}> Search Warning Lights By Filters </Box>

                {/* Filters */}
                <Tabs
                    //   classes={{ root: classes.tabRoot, scroller: classes.scroller }}
                    classes={{root: "tabRoot", scroller: "scroller"}}
                    onChange={handleFilterChange}
                    value={filter}
                    indicatorColor="primary"
                    aria-label="icon label tabs example"
                    variant={"scrollable"}
                    scrollButtons={"on"}
                >
                    <Tab
                        value=""
                        icon={<AppsIcon style={{fill: "black"}}/>}
                        label="All"
                    />
                    <Tab
                        value="Red"
                        icon={<FiberManualRecordIcon style={{fill: "red"}}/>}
                        label="Red"
                    />
                    <Tab
                        value="Green"
                        icon={<FiberManualRecordIcon style={{fill: "green"}}/>}
                        label="Green"
                    />
                    <Tab
                        value="Yellow"
                        icon={<FiberManualRecordIcon style={{fill: "orange"}}/>}
                        label="Yellow"
                    />
                    <Tab
                        value="Blue"
                        icon={<FiberManualRecordIcon style={{fill: "blue"}}/>}
                        label="BLUE"
                    />
                    <Tab
                        value="Common"
                        icon={<StarBorderIcon style={{fill: "black"}}/>}
                        label="Common"
                    />
                    <Tab
                        value="Advanced"
                        icon={<MoreHorizIcon style={{fill: "black"}}/>}
                        label="Advanced"
                    />
                </Tabs>


                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                >
                    <MenuItem>
                        <form onSubmit={handleSearchChange} className="form">
                            <InputBase
                                onChange={e => setSearchKeyword("ByText" + e.target.value)}
                                placeholder="Search by contained text"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{"aria-label": "search"}}
                            />
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </form>
                    </MenuItem>
                    <MenuItem>
                        <form onSubmit={handleSearchChange} className="form">
                            <InputBase
                                onChange={e => setSearchKeyword("ByName" + e.target.value)}
                                placeholder="Search by name"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{"aria-label": "search"}}
                            />
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </form>
                    </MenuItem>
                </Popover>

                {/* Lighs cards */}
                <Grid container spacing={3} className="rootGrid">
                    {
                        products && products.map((product, i) =>
                            <Grid item xs={7} sm={5} md={3} key={product.Id + product.Name}>
                                <Card className="rootCard" key={product.Id}>
                                    <CardHeader className="title"
                                                title={product.Name}/>
                                    <CardMedia className="media" style={{display: 'flex'}}
                                               title={product.Name}>
                                        <img className="img" src={product.displayImgPath} alt={product.Name}/>
                                    </CardMedia>

                                    <CardActions disableSpacing>

                                        {props.user !== "" ?

                                            (<IconButton onClick={() => handleFavorites(product.Id)}
                                                         aria-label="add to favorites">
                                                {favorites.findIndex(favorites => favorites.WarningLightId === product.Id) > -1 ?
                                                    (<Tooltip title="remove from favorites">
                                                            <FavoriteIcon style={{fill: "red"}}/>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip title="add to favorites">
                                                            <FavoriteIcon/>
                                                        </Tooltip>
                                                    )}

                                            </IconButton>) : (<div/>)}

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

export default WarningLights;



