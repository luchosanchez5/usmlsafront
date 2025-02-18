import * as actionTypes from "./actionTypes";
import * as venueType from '../../Venue/actions/actionTypes';
import * as tournamentType from '../../tournament/actions/actionTypes';
import * as personType from '../../person/actions/actionTypes';
import * as teamType from '../../team/actions/actionTypes';
import Toast from "../../../shared/Toast";
import axios from "axios";
const Url = process.env.REACT_APP_MAIN_URL;
export const userLogin = (data, navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.post(`${Url}api/v1/auth/authenticate`, data)
    .then((response) => {
      console.log(response?.data?.data?.roles[0])
      dispatch({
        type: actionTypes.USER_LOGIN,
        payload: response?.data?.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      if (response?.data?.data?.roles[0] === "ADMIN") {
        navigate("/dashboard");

      } else if (response?.data?.data?.roles[0] === "MANAGER") {
        navigate("/dashboard/allteams");
      }
      else {
        navigate("/dashboard/yourteam");
      }
      const roles = response.data.data.roles;
      if (roles && roles.length > 0) {
        roles.forEach((role) => {
          Toast.success(`Welcome ${role} to the  dashboard !`);
        });
      } else {
        Toast.info("No roles assigned");
      }
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });

    });
};

export const changePassword = (data, navigate, token) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  const { password } = data
  axios.post(`${Url}api/persons/change-password?newPassword=${password}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
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
export const getToken = (token, navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`http://localhost:8082/api/v1/auth/token-for-google-user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.USER_LOGIN,
        payload: response?.data?.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Toast.success(response.data.message);
      if (response?.data?.data?.roles.includes('MANAGER')) {
        navigate("/dashboard/allteams");
      } else {
        navigate("/dashboard/yourteam");
      }
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });

    });
};
export const userRegister = (data, navigation) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.post(`${Url}api/v1/auth/register`, data)
    .then((response) => {
      dispatch({
        type: actionTypes.USER_REGISTER,
        payload: response.data.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      navigation("/auth/login");
      Toast.success(response?.data?.message);

    })
    .catch((error) => {
      console.log("🚀 ~ userRegister ~ error:", error)
      Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};



export const changeRole = (role, token, navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.put(`${Url}api/persons/change-google-user-role?newRole=${role}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {

      dispatch({
        type: actionTypes.USER_LOGIN,
        payload: response?.data?.data,
      });
      if (response?.data?.data?.roles.includes('ADMIN') || response?.data?.data?.roles.includes('ADMIN')) {
        navigate("/dashboard");

      } else if (response?.data?.data?.roles?.includes('MANAGER') || response?.data?.data?.role === 'MANAGER') {
        navigate("/dashboard/allteams");
      }
      else {
        navigate("/dashboard/yourteam");
      }
      Toast.success(response.data.message);


      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.error);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};


export const logOut = (token, navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.post(`${Url}api/v1/auth/logout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      Toast.success(response.data.message);
      dispatch({
        type: actionTypes.CLEAR_USER
      });
      dispatch({
        type: venueType.CLEAR_VENUE
      });
      dispatch({
        type: tournamentType.CLEAR_TOURNAMENT
      });
      dispatch({
        type: personType.CLEAR_PERSON
      });
      dispatch({
        type: teamType.CLEAR_TEAM
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      navigate('/auth/login');
    })
    .catch((error) => {
      Toast.error(error.response.data.error);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};



