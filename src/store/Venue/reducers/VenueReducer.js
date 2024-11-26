import * as actionTypes from '../actions/actionTypes';

const initialState = {
    VenueData: [],
    VenuDetails: [],
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
            };

        case actionTypes.GET_VENUE:
            return {
                ...state,
                VenueData:action.payload || [],
            };
        case actionTypes.Delete_VENUE:
            return {
                ...state,
                // VenuDataUpdate: !state.VenuDataUpdate
            }
        case actionTypes.GET_VENUE_BY_ID:
            return {
                ...state,
                VenuDetails: action.payload || [],
                // VenuDataUpdate: !state.VenuDataUpdate
            }
        case actionTypes.CLEAR_VENUE:
            return {
                VenueData: [],
                VenuDetails: [],
                // VenuData: false
                isLoading: false,
            }
        default:
            return state;

    }
}

export default VenueReducer;
