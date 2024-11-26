import * as actionTypes from "./actionTypes";
import axios from "axios";
import Toast from "../../../shared/Toast";
const Url = process.env.REACT_APP_MAIN_URL;
export const Add_Tournaments = (data, Token, Navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.post(`${Url}api/tournaments`, data, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_TOURNAMENT,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Toast.success(response.data.message);
      Navigate('/dashboard/tournaments')

    })
    .catch((error) => {
      Toast.error(error.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
    });
};
export const GetTournaments = (page) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/tournaments?page=${page}&size=10`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_TOURNAMENT,
        payload: response.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch({
          type: actionTypes.GET_TOURNAMENT,
          payload: []
        });
      }
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      // Toast.error(error.response.data.message);
    });
};
export const GetTournamentsBySearch = (token, page) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/tournaments/search?status=ACTIVE&page=0&size=10`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_TOURNAMENTS_BY_SEARCH,
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
          type: actionTypes.GET_TOURNAMENTS_BY_SEARCH,
          payload: []
        });
      }
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
      // Toast.error(error.response.data.message);
    });
};
export const GetDefaultTournamentsBySearch = (token, page) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/tournaments/search?page=0&size=10`)
    .then((response) => {
      dispatch({
        type: actionTypes.DEFAULT_TOURNAMENTS,
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
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      // Toast.error(error.response.data.message);
    });
};

export const GetDivisionsBySearch = (token, page, tournamentId, teamId) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/divisions/all/no-link-with-team/${tournamentId}/${teamId}?page=0&size=10`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_DIVISION_BY_SEARCH,
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
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
      // Toast.error(error.response.data.message);
    });
};
export const GetAllDivisions = (page, token) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/divisions?page=${page}&size=10`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_DIVISIONS,
        payload: response.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    })
    .catch((error) => {
      if (error.response.status === 400) {
        dispatch({
          type: actionTypes.GET_ALL_DIVISIONS,
          payload: []
        });
      }
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};
export const DeleteDivision = (id, token, callback) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.delete(`${Url}api/divisions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.DELETE_DIVISION,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Toast.success(response.data.message);
      if (callback) callback();

    })
    .catch((error) => {
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
      Toast.error(error.response.data.message);
    });
};
export const GetDivisionsDetailsBySearch = (token, page, divisionName) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/divisions/search?divisionName=${divisionName}&page=0&size=10`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_DIVISION__Details_BY_SEARCH,
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
export const GetDivisionsDetailsByDivisionId = (id, token) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/divisions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_DIVISION__DETAILS_BY_DIVISION_ID,
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
        payload: false,
      });
    });
};
export const GetTournamentsDetailsByTournamentId = (id, token) => (dispatch) => {

  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/tournaments/${id}`, {}, {

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_TOURNAMENT_BY_ID,
        payload: response?.data?.data,
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
export const DelTournaments = (tournamentId, token, callback) => (dispatch) => {
  axios.delete(`${Url}api/tournaments/${tournamentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.DELETE_TOURNAMENT,
      });
      Toast.success(response.data.message);
      if (callback) callback();
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};
export const UpdateTournaments = (TournamentId, data, Token, Navigate) => (dispatch) => {
  axios.put(`${Url}api/tournaments/${TournamentId}`, data, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.UPDATE_TOURNAMENT,
      });
      Toast.success(response.data.message);
      Navigate("/dashboard/tournaments");

    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};
export const AddDivisions = (data, token, Navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.post(`${Url}api/divisions`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_DIVISION,

      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Navigate("/dashboard/alldivisions");
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};
export const UpdateDivisions = (DivisionId, data, token, Navigate) => (dispatch) => {
  axios.put(`${Url}api/divisions/${DivisionId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_DIVISION,

      });
      Navigate("/dashboard/alldivisions");
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};
export const SearchTournaments = (Tournamentid, Token, navigate) => (dispatch) => {
  axios.get(`${Url}/tournaments/search}`,)
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_TOURNAMENT,
        payload: response.data.data,
      });
      navigate("/dashboard");
    })
    .catch((error) => {
      // Toast.error(error.response.data.message);
    });
};


export const uploadTournamentPicture = (tournamentId, token, file) => (dispatch) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log(formData)


  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });

  axios
    .post(`${Url}api/tournaments/${tournamentId}/upload-picture`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response?.data?.message || "An error occurred");
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};

export const uploadDivisionPicture = (divisionId, token, file) => (dispatch) => {
  const formData = new FormData();
  formData.append("picture", file);

  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });

  axios
    .post(`${Url}api/divisions/${divisionId}/upload-picture`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response?.data?.message || "An error occurred");
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};