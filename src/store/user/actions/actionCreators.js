import * as actionTypes from "./actionTypes";
import Toast from "../../../shared/Toast";

import axios from "axios";
import { FaLess } from "react-icons/fa6";
const Url = process.env.REACT_APP_MAIN_URL;
export const userLogin = (data, navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.post(`${Url}api/v1/auth/authenticate`, data)
    .then((response) => {
      dispatch({
        type: actionTypes.USER_LOGIN,
        payload: response?.data?.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      if (response?.data?.data?.roles.includes('ADMIN') || response?.data?.data?.roles.includes('ADMIN')) {
        navigate("/dashboard");

      } else if (response?.data?.data?.roles?.includes('MANAGER') || response?.data?.data?.role === 'MANAGER') {
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
      navigate('/dashboard/yourteam')
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
      Toast.error(error.response.data.error);
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
      Toast.success(response.data.message);
      navigate('/dashboard/yourteam')
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
      navigate('/auth/login');
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