import {useDispatch} from 'react-redux';
import React, {useState, Fragment, useEffect} from "react";
import clsx from "clsx";
import {Router, Route, Link} from "react-router-dom";
import {createBrowserHistory} from "history";
import "./MenuScreen.css"
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Button} from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BuildIcon from '@material-ui/icons/Build';
import WarningLights from "./WarningLights";
import HomeScreen from "./HomeScreen";
import SigninScreen from './SigninScreen';
import RegisterScreen from './RegisterScreen';
import IdentifyWarningLightsInDashboardScreen from './IdentifyWarningLightsInDashboardScreen';
import IdentificationResultsScreen from "./IdentificationResultsScreen";
import Favorites from "./Favorites";
import ManageData from "./ManageSystemScreen/ManageSystemScreen";

const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    drawerPaper: {
        position: "relative",
        width: drawerWidth
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: "1250 !important",
        marginTop: "63px"
    },
    menuButton: {
        marginRight: -1,
    },
    toolbarMargin: theme.mixins.toolbar,

});


const MyToolbar = withStyles(styles)(({classes, user, onMenuClick, onItemClick, setUserName, setIsAdmin}) => (

    <Router history={history}>
        <Fragment>
            <AppBar className="aboveDrawer">
                <Toolbar>
                    <IconButton
                        className='logoButton'
                        color="inherit"
                        aria-label="Menu"
                        onClick={onMenuClick}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Button title="Home Screen"
                            component={Link}
                            to="/"
                            onClick={onItemClick("Home Screen")}
                            className="logoBtn"
                    >
                        <img className="logo" src={'images/AutoLight_Logo.png'}/>
                    </Button>

                    <Typography className="userName" style={{visibility: user ? '' : 'hidden'}}>
                        Hello,&nbsp; {user}
                    </Typography>

                    <section className='rightToolbar'>
                        <Button classes={{label: 'appBarBtn'}}
                                component={Link}
                                to={user ? "/" : "/signin"}
                                onClick={() => {
                                    setUserName('')
                                    setIsAdmin(false)
                                    localStorage.removeItem("signedUser");
                                }}
                        >
                            {user === '' ? 'Sign In' : 'Logout'}
                        </Button>
                    </section>

                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin}/>
        </Fragment>

        <main>
            <Route exact path="/" component={HomeScreen}/>
        </main>

    </Router>
));

const MyDrawer = withStyles(styles)(({
                                         classes,
                                         variant,
                                         open,
                                         onClose,
                                         onItemClick,
                                         user,
                                         setUserName,
                                         title,
                                         IsAdmin,
                                         setIsAdmin
                                     }) => (
        <Router history={history}>
            <Drawer
                variant={variant}
                open={open}
                onClose={onClose}
                classes={{
                    paper: classes.drawerPaper,
                    root: classes.drawer
                }}>

                <div
                    className={clsx({
                        [classes.toolbarMargin]: variant === "persistent"
                    })}/>

                <List>
                    <ListItem
                        className={title === "identifyWarningLightsInDashboard" ? "drawerItemChoosen" : "drawerItem"}
                        button
                        component={Link}
                        to="/identifyWarningLightsInDashboard"
                        onClick={onItemClick("identifyWarningLightsInDashboard")}
                    >
                        <PhotoCameraIcon //className='drawerListIcons'
                            className={title === "identifyWarningLightsInDashboard" ? "drawerListIconsChoosen" : "drawerListIcons"}
                        />
                        <ListItemText
                            className={title === "identifyWarningLightsInDashboard" ? "drawerListTextChoosen" : "drawerListText"}>
                            Search by image</ListItemText>
                    </ListItem>

                    <ListItem
                        className={title === "WarningLights" ? "drawerItemChoosen" : "drawerItem"}
                        button
                        component={Link}
                        to='/WarningLights'
                        onClick={onItemClick("WarningLights")}
                    >
                        <SearchIcon //className='drawerListIcons'
                            className={title === "WarningLights" ? "drawerListIconsChoosen" : "drawerListIcons"}
                        />
                        <ListItemText className={title === "WarningLights" ? "drawerListTextChoosen" : "drawerListText"}>
                            Search by filters</ListItemText>
                    </ListItem>

                    {user !== "" ? (<ListItem
                        className={title === "favorites" ? "drawerItemChoosen" : "drawerItem"}
                        button
                        component={Link}
                        to="/favorites"
                        onClick={onItemClick("favorites")}
                    >
                        <FavoriteBorderIcon //className='drawerListIcons'
                            className={title === "favorites" ? "drawerListIconsChoosen" : "drawerListIcons"}
                        />
                        <ListItemText className={title === "favorites" ? "drawerListTextChoosen" : "drawerListText"}>
                            My favorites</ListItemText>
                    </ListItem>) : (<div/>)}

                    {IsAdmin == true ? (<ListItem
                        className={title === "manageData" ? "drawerItemChoosen" : "drawerItem"}
                        button
                        component={Link}
                        to="/manageData"
                        onClick={onItemClick("manageData")}
                    >
                        <BuildIcon //className='drawerListIcons'
                            className={title === "manageData" ? "drawerListIconsChoosen" : "drawerListIcons"}
                        />
                        <ListItemText className={title === "manageData" ? "drawerListTextChoosen" : "drawerListText"}>
                            Manage Warning Lights</ListItemText>
                    </ListItem>) : (<div/>)}


                </List>

            </Drawer>

            <main>
                <Route exact path="/WarningLights" render={(props) => <WarningLights {...props} user={user}/>}/>
                <Route exact path="/signin"
                       render={(props) => <SigninScreen {...props} setUserName={setUserName} setIsAdmin={setIsAdmin}/>}/>
                <Route exact path="/register" component={RegisterScreen}/>
                <Route exact path="/identifyWarningLightsInDashboard" component={IdentifyWarningLightsInDashboardScreen}/>
                <Route exact path="/identificationResults" component={IdentificationResultsScreen}/>
                <Route exact path="/favorites" component={Favorites}/>
                <Route exact path="/manageData" component={ManageData}/>
            </main>

        </Router>
    )
);


function Menu({classes, variant}) {

    const initUserName = () => {
        let name = '';
        if (localStorage.getItem("signedUser") !== null) {
            name = JSON.parse(localStorage.getItem("signedUser")).UserName;
        }
        return name;
    }

    const initIsAdmim = () => {
        let isAdmin = false;
        if (localStorage.getItem("signedUser") !== null) {
            isAdmin = JSON.parse(localStorage.getItem("signedUser")).IsAdmin;
        }
        return isAdmin;
    }

    const [user, setUserName] = useState(initUserName);
    const [IsAdmin, setIsAdmin] = useState(initIsAdmim);

    console.log("LOCATION" + window.location.pathname.substring(window.location.pathname.indexOf('/') + 1));

    const dispatch = useDispatch();
    useEffect(() => {
        setTitle(window.location.pathname.substring(window.location.pathname.indexOf('/') + 1));
        console.log("menu screen useEfect");
    }, [user])

    console.log("menu screen localStorage: " + localStorage.getItem("signedUser"));

    const [drawer, setDrawer] = useState(false);
    const [title, setTitle] = useState('');

    const toggleDrawer = () => {
        setDrawer(!drawer);
    };

    const onItemClick = title => () => {
        setTitle(title);
        if (title !== 'Home Screen') {
            setDrawer(variant === "temporary" ? false : drawer);
            setDrawer(!drawer);
        }
    };


    return (
        <div className={classes.root}>
            <MyToolbar
                onMenuClick={toggleDrawer}
                open={drawer}
                onItemClick={onItemClick}
                user={user}
                setUserName={setUserName}
                setIsAdmin={setIsAdmin}
            />
            <MyDrawer
                open={drawer}
                onClose={toggleDrawer}
                onItemClick={onItemClick}
                variant={variant}
                user={user}
                IsAdmin={IsAdmin}
                setUserName={setUserName}
                setIsAdmin={setIsAdmin}
                title={title}
            />

            {/* Screen opens here */}

        </div>
    );
}

export default withStyles(styles)(Menu);



