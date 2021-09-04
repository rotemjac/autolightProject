import Axios from "axios";
import * as constants from "../constants/identifyWarningLightsInDashboardConstants";
import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from "../constants/productConstants"

const saveDashImgAction = (dashboardfImg) => async (dispatch) => {
    dispatch({type: constants.USER_UPLOAD_IMG_REQUEST});
    try {
        var formData = new FormData();
        formData.append("uploadedFile", dashboardfImg[0]);

        await Axios.post("/api/identifyWarningLightsInDashboard/saveImg", formData);
        dispatch({type: constants.USER_UPLOAD_IMG_SUCCESS});

    } catch (error) {
        dispatch({type: constants.USER_UPLOAD_IMG_FAIL, payload: error.message});
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const identifyWarningLightsInDashboardAction = (warningLightsNum, history, imgName) => async (dispatch) => {
    dispatch({type: constants.IDENTIFICATION_REQUEST});
    let currImgPath = "";
    let data = "";
    try {
        if (localStorage.getItem(imgName)) {
            await delay(1000);
            data = JSON.parse(localStorage.getItem(imgName)).resultIds;
            currImgPath = JSON.parse(localStorage.getItem(imgName)).imgPath;
        } else {
            data = (await Axios.get("api/identifyWarningLightsInDashboard",
                {
                    params: {
                        "warningLightsNum": warningLightsNum,
                        "imgName": imgName
                    }
                })).data;
            currImgPath = "https://autolight-bucket.s3.amazonaws.com/IdentificationResults/" + imgName;
            localStorage.setItem(imgName, JSON.stringify({
                resultIds: data,
                imgPath: currImgPath
            }));
        }
        if (data == "")
            dispatch({type: constants.IDENTIFICATION_FAIL, payload: "No results were found"});
        else {
            history.push("/identificationResults", {"resultIds": data, "imgPath": currImgPath});
            dispatch({type: constants.IDENTIFICATION_SUCCESS, payload: data});
        }
    } catch (error) {
        dispatch({type: constants.IDENTIFICATION_FAIL, payload: error.message});
    }
}

const clearErrorMsgAction = () => async (dispatch) => {
    dispatch({type: constants.CLEAR_ERROR_MSG});
}

const showResultsAction = (resultsIds) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        let userName = '';
        if (localStorage.getItem("signedUser")) {
            userName = JSON.parse(localStorage.getItem("signedUser")).UserName;
        }
        const {data} = await Axios.get("/api/identifyWarningLightsInDashboard/showResults",
            {params: {resultsIds, userName}});
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) { // TODO CHANGE
        dispatch({type: constants.SHOW_RESULTS_FAIL, payload: error.message});
    }
}

export {
    saveDashImgAction,
    identifyWarningLightsInDashboardAction,
    clearErrorMsgAction,
    showResultsAction
};
