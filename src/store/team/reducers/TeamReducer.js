import * as actionTypes from '../actions/actionTypes';

const initialState = {
    TeamData: [],
    TeamDetailsData: [],
    TeamMembers: {},
    CoManagerData: [],
    PaymentRecords: [],
    PendingPaymentRecords: [],
    // VenuData: false
    YourTeamData: [],
    isLoading: false,
};

const TeamReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case actionTypes.ADD_TEAMS:
            return {
                ...state,

            };

        case actionTypes.GET_TEAMS:
            return {
                ...state,
                TeamData: action.payload || [],
            };
        case actionTypes.GET_TEAM_BY_ID:
            return {
                ...state,
                TeamDetailsData: action.payload || []
            }
        case actionTypes.GET_CO_MANAGERS:
            return {
                ...state,
                CoManagerData: action.payload || []
            }
        case actionTypes.GET_MEMBER_BY_TEAMID:
            return {
                ...state,
                TeamMembers: action.payload || {}
            }
        case actionTypes.GET_YOUR_TEAM:
            return {
                ...state,
                YourTeamData: action.payload || []
            }

        case actionTypes.GET_PAYMENT_RECORDS:
            return {
                ...state,
                PaymentRecords: action.payload || []
            }
        case actionTypes.GET_PENDING_PAYMENT_RECORDS:
            return {
                ...state,
                PendingPaymentRecords: action.payload || []
            }
        case actionTypes.CLEAR_TEAM:
            return {
                TeamData: [],
                TeamDetailsData: [],
                TeamMembers: {},
                CoManagerData: [],
                PaymentRecords: [],
                PendingPaymentRecords: [],
                // VenuData: false
                YourTeamData: [],
                isLoading: false,
            }



        default:
            return state;



    }
}

export default TeamReducer;
