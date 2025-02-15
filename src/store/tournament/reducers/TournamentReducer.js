import * as actionTypes from '../actions/actionTypes';

const initialState = {
    TournamentData: [],
    TournamentDetails: [],
    TournamentBySearch: [],
    DivisionBySearch: [],
    DivisionDetailsBySearch: {},
    DivisionDetails: {},
    AllDivisionsData: [],
    DefaultTournamentData: [],
    // VenuData: false
    isLoading: false,
    tournamentDivision: {}
};

const TournamentReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case actionTypes.ADD_TOURNAMENT:
            return {
                ...state,

            };

        case actionTypes.GET_TOURNAMENT:
            return {
                ...state,
                TournamentData: action.payload || []
            };

        case actionTypes.GET_TOURNAMENT_BY_ID:
            return {
                ...state,
                TournamentDetails: action.payload || []
            };
        case actionTypes.GET_TOURNAMENTS_BY_SEARCH:
            return {
                ...state,
                TournamentBySearch: action.payload || []
            };
        case actionTypes.GET_DIVISION_BY_SEARCH:
            return {
                ...state,
                DivisionBySearch: action.payload || []
            };

        case actionTypes.GET_DIVISION__Details_BY_SEARCH:
            return {
                ...state,
                DivisionDetailsBySearch: action.payload || {}
            };
        case actionTypes.GET_ALL_DIVISIONS:
            return {
                ...state,
                AllDivisionsData: action.payload || []
            };

        case actionTypes.GET_DIVISION__DETAILS_BY_DIVISION_ID:
            return {
                ...state,
                DivisionDetails: action.payload || {}
            };

        case actionTypes.DEFAULT_TOURNAMENTS:
            return {
                ...state,
                DefaultTournamentData: action.payload || []
            };
        case actionTypes.GET_TOURNAMENT_DIVISIONS:
            return {
                ...state,
                tournamentDivision: action.payload || {}
            };
        case actionTypes.CLEAR_TOURNAMENT:
            return {
                TournamentData: [],
                TournamentDetails: [],
                TournamentBySearch: [],
                DivisionBySearch: [],
                DivisionDetailsBySearch: {},
                DivisionDetails: {},
                AllDivisionsData: [],
                DefaultTournamentData: [],
                // VenuData: false
                isLoading: false,
                tournamentDivision: {}
            };

        default:
            return state;



    }
}

export default TournamentReducer;
