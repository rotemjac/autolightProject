import Favorite from "@material-ui/icons/Favorite";
import * as constants from "../constants/productConstants";


function productListReducer(state = {products: [], favorites: []}, action) {
    switch (action.type) {
        case constants.PRODUCT_LIST_REQUEST:
            return {loading: false};
        case  constants.PRODUCT_FAVORITE_REQUEST:
            return {loading: false, errorMsg: null};

        case constants.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.warningLights,
                favorites: action.payload.favorites
            };

        case constants.PRODUCT_ADD_FAVORITE_SUCCESS:
            return {
                loading: false,
                products: [...state.products],
                favorites: [...state.favorites.concat(action.payload)]
            };
        case constants.PRODUCT_REM_FAVORITE_SUCCESS:
            state.favorites.map((i) => console.log(i.WarningLightId));
            return {
                loading: false,
                products: [...state.products],
                favorites: [...state.favorites.filter((i) => i.WarningLightId != action.payload.WarningLightId)]
            };
        case constants.FAVORITE_LIST_REQUEST:
            return {loading: false};
        case constants.FAVORITE_LIST_SUCCESS:
            return {
                loading: false,
                products: [],
                favorites: action.payload
            };
        case constants.PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        case constants.PRODUCT_LIST_DELETE:
            return {
                loading: false,
                products: [...state.products.filter((light) => light.Id !== action.payload[0].Id)],
                favorites: [...state.favorites]
            }
        case constants.PRODUCT_LIST_ADD:
            console.log(action.payload);
            return {
                loading: false,
                products: [...state.products.concat(action.payload)],
                favorites: [...state.favorites]
            };
        case constants.EDIT_WARNING_LIGHT:
            return {
                loading: false,
                products: [...state.products.filter((product) => product.Id !== action.payload[0].Id).concat(action.payload)],
                favorites: [...state.favorites]
            };
        default:
            return state;
    }
}

export {productListReducer}

