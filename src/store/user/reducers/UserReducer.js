import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLogin: false,
    token: '',
    user: {},
    cards: [],
    managers: {}
};

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return {
                ...state,
                isLogin: true,
                token: action.payload.access_token,
                user: action.payload
            };
        case actionTypes.USER_REGISTER:
            return {
                ...state,
                isLogin: true,
                token: action.payload.access_token,
                user: action.payload
            };
        // case actionTypes.UPDATE_ACCOUNT:
        //     return {
        //         ...state,
        //         user: action.payload
        //     };
        // case actionTypes.UPDATE_PASSWORD:
        //     return {
        //         ...state,
        //         token: action.payload
        //     };
        // case actionTypes.USER_CARDS:
        //     return {
        //         ...state,
        //         cards: action.payload
        //     };
        // case actionTypes.USER_MANAGERS:
        //     return {
        //         ...state,
        //         managers: action.payload
        //     };
        // case actionTypes.USER_LOGOUT:
        //     return {
        //         isLogin: false,
        //         token: '',
        //         user: {},
        //         cards: [],
        //         managers: {}
        //     };
        // case actionTypes.OTP_TOKEN:
        //     return {
        //         ...state,
        //         token: action.payload.token
        //     };
        default:
            return state;
    }
}

export default UserReducer;
