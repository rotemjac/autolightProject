import Axios from "axios";
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";

const signinAction = (setUserName, setIsAdmin, userName, password, history) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {userName, password}});

    try {
        const {data} = await Axios.post("/api/userSignin/signin", {userName, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        doAfterSuccessLogin(setUserName, setIsAdmin, data, history);

    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.response.data});

    }
}


const registerAction = (userName, email, password, history) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {userName, email, password}});
    try {
        const {data} = await Axios.post("/api/userRegister/register", {userName, email, password});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        doAfterSuccessLogin(data, history);

    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.response.data});
    }
}

const logout = () => (dispatch) => {
    localStorage.removeItem("signedUser");
    dispatch({type: USER_LOGOUT})
}

const doAfterSuccessLogin = (setUserName, setIsAdmin, data, history) => {
    localStorage.setItem("signedUser", JSON.stringify(data));
    //history.push("/");
    history.push('/', {userName: data.UserName});
    setUserName(data.UserName);
    setIsAdmin(data.IsAdmin);

}
export {signinAction, registerAction, logout};
