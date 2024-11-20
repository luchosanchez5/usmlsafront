import * as actionTypes from '../actions/actionTypes';

const initialState = {
    PersonData: [],
    PersonDetails:{},
    Persondata:{},
    ForgetPasswordEmail:{},
    // VenuData: false
    isLoading: false,
};

const PersonsReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case actionTypes.ADD_PERSONS:
            return {
                ...state,
            };

        case actionTypes.GET_PERSONS:
            return {
                ...state,
                PersonData: action.payload || [],
            };
        case actionTypes.Delete_PERSONS:
            return {
                ...state,
                // VenuDataUpdate: !state.VenuDataUpdate
            }
        case actionTypes.GET_PERSONS_BY_ID:
            return {
                ...state,
                PersonDetails:action.payload || {},
                // VenuDataUpdate: !state.VenuDataUpdate
            }
            case actionTypes.GET_PERSON:
                return{
                    ...state,
                    Persondata:action.payload || {}
                }
            case actionTypes.FORGET_PASSWORD:
                return{
                    ...state,
                    ForgetPasswordEmail:action.payload || {}
                }
        default:
            return state;
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

    }
}

export default PersonsReducer;
