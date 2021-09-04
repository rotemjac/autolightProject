import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_FAVORITE_REQUEST, PRODUCT_ADD_FAVORITE_SUCCESS, PRODUCT_REM_FAVORITE_SUCCESS,
    FAVORITE_LIST_REQUEST, FAVORITE_LIST_SUCCESS, PRODUCT_LIST_DELETE, EDIT_WARNING_LIGHT, PRODUCT_LIST_ADD
} from "../constants/productConstants"
import axios from 'axios';

const listProducts = (filter = '') => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        // Get userName of connected user
        let userName = '';
        if (localStorage.getItem("signedUser")) {
            userName = JSON.parse(localStorage.getItem("signedUser")).UserName;
        }
        const {data} = await axios.get("/api/products?filter=" + filter, {params: {userName}});
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const listFavorites = () => async (dispatch) => {
    try {
        dispatch({type: FAVORITE_LIST_REQUEST});
        let userName = JSON.parse(localStorage.getItem("signedUser")).UserName;
        const {data} = await axios.get("/api/favorites", {params: {userName}});
        dispatch({type: FAVORITE_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const addToFavoritesAction = (warningLightId) => async (dispatch) => {
    try {
        let userName = JSON.parse(localStorage.getItem("signedUser")).UserName;
        const {data} = await axios.post("/api/favorites", {warningLightId, userName});
        dispatch({type: PRODUCT_ADD_FAVORITE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const removeFromFavoritesAction = (warningLightId) => async (dispatch) => {
    try {
        let userName = JSON.parse(localStorage.getItem("signedUser")).UserName;
        const {data} = await axios.delete("/api/favorites", {params: {warningLightId, userName}});
        dispatch({type: PRODUCT_REM_FAVORITE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}


const deleteWarningLight = (filter = '') => async (dispatch) => {
    try {
        const {data} = await axios.delete("/api/products?filter=" + filter);
        deleteFromLocalStorage(String(data[0].Id));
        dispatch({type: PRODUCT_LIST_DELETE, payload: data});

    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const handleAddWarningLight = (gotoEndOfTable, name, explanation, recommendation, img, color, severity, isCommon) => async (dispatch) => {

    let formData = new FormData();
    formData.append("name", name);
    formData.append("severity", severity)
    formData.append("explanation", explanation);
    formData.append("recommendation", recommendation);
    formData.append("color", color);
    formData.append("isCommon", isCommon);
    formData.append("image", img);

    try {
        const {data} = await axios.post("/api/products", formData, {headers: {'Content-Type': 'multipart/form-data'}});
        dispatch({type: PRODUCT_LIST_ADD, payload: data});
        gotoEndOfTable();
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const handleEditWarningLights = (id, name, explanation, recommendation, img, severity) => async (dispatch) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("severity", severity);
    formData.append("explanation", explanation);
    formData.append("recommendation", recommendation);
    formData.append("image", img);

    try {
        const {data} = await axios.put("/api/products", formData, {headers: {'Content-Type': 'multipart/form-data'}});
        const updatedData = data.map((dataItem) => ({
            ...dataItem,
            displayImgPath: `${dataItem.displayImgPath}?lastChangeTime=${Date.now()}`
        }))
        dispatch({type: EDIT_WARNING_LIGHT, payload: updatedData});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const deleteFromLocalStorage = (deletedIdStr) => {
    // let isDeleted;
    let currKey;
    let keysToDelete = [];

    // for (currKey in localStorage) {
    // isDeleted=false;
    for (let i = 0; i < localStorage.length; i++) {
        currKey = localStorage.key(i);
        if (currKey != "signedUser") {
            let currResultsIds = JSON.parse(localStorage[currKey]).resultIds;
            if (currResultsIds.includes("'" + deletedIdStr + "'"))
                keysToDelete.push(currKey);
        }
    }

    for (let j = 0; j < keysToDelete.length; j++) {
        currKey = keysToDelete[j];
        localStorage.removeItem(currKey);
    }
}

export {
    listProducts, addToFavoritesAction, removeFromFavoritesAction, listFavorites,
    deleteWarningLight, handleAddWarningLight, handleEditWarningLights
}
