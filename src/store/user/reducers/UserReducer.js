import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLogin: false,
    token: '',
    user: {},
    cards: [],
    managers: {},
    isLoading: false,
};

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
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
        case actionTypes.CLEAR_USER:
            return {
                isLogin: false,
                token: '',
                user: {},
                cards: [],
                managers: {},
                isLoading: false,
            };
        default:
            return state;
    }
}

export default UserReducer;
