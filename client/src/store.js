import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {productListReducer} from './reducers/productReducers';
import {userSigninReducer} from './reducers/userReducers';
import {userRegisterReducer} from './reducers/userReducers';
import {
    identifyWarningLightsInDashboardReducer,
    showResultsReducer,
    saveImgReducer
} from './reducers/identifyWarningLightsInDashboardReducer';


// const userInfo = Cookie.getJSON('userInfo') || null;
const userInfo = null //todo:OK ?
const initialState = {userSignin: {userInfo},};

const reducer = combineReducers({
    productList: productListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    saveImg: saveImgReducer,
    identifyWarningLightsInDashboard: identifyWarningLightsInDashboardReducer,
    showIdentificationResults: showResultsReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
