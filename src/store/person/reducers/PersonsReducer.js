import * as actionTypes from '../actions/actionTypes';

const initialState = {
    PersonData: [],
    PersonDetails: {},
    Persondata: {},
    ForgetPasswordEmail: {},
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
                PersonDetails: action.payload || {},
                // VenuDataUpdate: !state.VenuDataUpdate
            }
        case actionTypes.GET_PERSON:
            return {
                ...state,
                Persondata: action.payload || {}
            }
        case actionTypes.FORGET_PASSWORD:
            return {
                ...state,
                ForgetPasswordEmail: action.payload || {}
            }
        case actionTypes.CLEAR_PERSON:
            return {
                PersonData: [],
                PersonDetails: {},
                Persondata: {},
                ForgetPasswordEmail: {},
                // VenuData: false
                isLoading: false,
            }

        default:
            return state;
    }
}

export default PersonsReducer;
