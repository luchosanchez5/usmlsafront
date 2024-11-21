import * as actionTypes from "./actionTypes";
import axios from "axios";
import Toast from "../../../shared/Toast";
const Url = process.env.REACT_APP_MAIN_URL;
export const AddTeams = (data, Token, Navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.post(`${Url}api/teams`, data, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_TEAMS,
        // payload: response.data.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Navigate('/dashboard/allteams')
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const GetTeams = (page, Token, role, userId) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(role?.role === 'ADMIN' || role?.roles?.includes('ADMIN') ? ` ${Url}api/teams?page=${page}&size=10 ` : `${Url}api/teams/all/${userId}?page=${page}&size=10`, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_TEAMS,
        payload: response.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      //   navigate("/dashboard");
      // Toast.success(response.data.status);
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch({
          type: actionTypes.GET_TEAMS,
          payload: []
        });
      }
      // Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const DeleteTeams = (teamId, Token, callback) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.delete(`${Url}api/teams/${teamId}`, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.DELETE_TEAMS,
        // payload: response.data.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Toast.success(response.data.message);
      if (callback) callback();
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const UpdateTeams = (teamId, data, Token, Navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.put(`${Url}api/teams/${teamId}`, data, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.UPDATE_TEAMS,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Navigate('/dashboard/allteams')
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const GetTeamsbyTeamId = (Id, Token) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/teams/${Id}`, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_TEAM_BY_ID,
        payload: response.data.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      //   navigate("/dashboard");
      // Toast.success(response.data.status);
    })
    .catch((error) => {
      // Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const GetMemberByTeamId = (Id, Token) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/teams/${Id}/members`, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_MEMBER_BY_TEAMID,
        payload: response.data.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      //   navigate("/dashboard");
      // Toast.success(response.data.status);
    })
    .catch((error) => {
      // Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const AddCoManagerToTeam = (id, selectedCard, Token) => (dispatch) => {

  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.post(`${Url}api/teams/${id}/co-manager/${selectedCard}`, {}, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_CO_MANAGER,
        // payload: response.data.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      //   navigate("/dashboard");
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.success(error.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const GetCoManager = (role, token, page) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/persons/search?role=${role}&page=${page}&size=10`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CO_MANAGERS,
        payload: response.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      //   navigate("/dashboard");
      // Toast.success(response.data.message);
    })
    .catch((error) => {
      // Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const AddPlayerToTeam = (id, selectedCard, Token) => (dispatch) => {

  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.post(`${Url}api/teams/${id}/players/${selectedCard}`, {}, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_PLAYER,
        // payload: response.data.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      //   navigate("/dashboard");
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.success(error.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const AddVenue = (tournamentId, selectedCard, Token) => (dispatch) => {

  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.put(`${Url}api/tournaments/${tournamentId}/assign-venue/${selectedCard}`, {}, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_CO_MANAGER,
        // payload: response.data.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      //   navigate("/dashboard");
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.success(error.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const GetYourTeam = (userid, page, Token) => (dispatch) => {

  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/teams/all/${userid}?page=${page}&size=10`, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_YOUR_TEAM,
        payload: response.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const GetPaymentRecords = (teamId, page, Token, isUser = false) => (dispatch) => {

  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(isUser ? `${Url}api/payment-records?paymentDoneBy=${teamId}&page=${page}&size=10&forceFirstAndLastRels=true` : `${Url}api/payment-records?teamId=${teamId}&page=${page}&size=10&forceFirstAndLastRels=true`, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PAYMENT_RECORDS,
        payload: response.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};