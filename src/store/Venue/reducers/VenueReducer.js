import * as actionTypes from '../actions/actionTypes';

const initialState = {
    VenueData: [],
    VenuDetails:[],
    // VenuData: false
    isLoading: false,
};

const VenueReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case actionTypes.Add_VENUE:
            return {
                ...state,
                // VenuData: !state.VenuDataUpdate
            };

        case actionTypes.GET_VENUE:
            return {
                ...state,
                VenueData: action.payload || [],
            };
        case actionTypes.Delete_VENUE:
            return {
                ...state,
                // VenuDataUpdate: !state.VenuDataUpdate
            }
        case actionTypes.GET_VENUE_BY_ID:
            return {
                ...state,
                VenuDetails:action.payload || [],
                // VenuDataUpdate: !state.VenuDataUpdate
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

export default VenueReducer;
