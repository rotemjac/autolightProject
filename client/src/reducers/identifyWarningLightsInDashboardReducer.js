import * as constants from "../constants/identifyWarningLightsInDashboardConstants";

function identifyWarningLightsInDashboardReducer(state = {}, action) {
    switch (action.type) {
        case constants.IDENTIFICATION_REQUEST:
            return {loading: true, errorMsg: null};
        case constants.IDENTIFICATION_SUCCESS:
            return {loading: false, resultsIds: action.payload};
        case constants.IDENTIFICATION_FAIL:
            return {loading: false, errorMsg: action.payload};
        case constants.CLEAR_ERROR_MSG:
            return {loading: false, errorMsg: null};
        default:
            return state;
    }
}

//todo: fix ?
function saveImgReducer(state = {}, action) {
    switch (action.type) {
        case constants.USER_UPLOAD_IMG_REQUEST:
            return {loading: true, errorMsg: null};
        case constants.USER_UPLOAD_IMG_SUCCESS:
            return {loading: false};
        case constants.USER_UPLOAD_IMG_FAIL:
            return {loading: false, errorMsg: action.payload};
        default:
            return state;
    }
}

function showResultsReducer(state = {products: [], favorites: []}, action) {
    switch (action.type) {
        case constants.SHOW_RESULTS_REQUEST:
            return {loading: true, errorMsg: null};
        case constants.SHOW_RESULTS_SUCCESS:
            //return { loading: false, products: action.payload };
            return {
                loading: false,
                products: action.payload.warningLights,
                favorites: action.payload.favorites
            };
        case constants.SHOW_RESULTS_FAIL:
            return {loading: false, errorMsg: action.payload};
        default:
            return state;
    }
}

export {
    saveImgReducer, identifyWarningLightsInDashboardReducer, showResultsReducer
}
