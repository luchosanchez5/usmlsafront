import * as actionTypes from "./actionTypes";
import Toast from "../../../shared/Toast";

import axios from "axios";
const Url = process.env.REACT_APP_MAIN_URL;
export const userLogin = (data, navigate) => (dispatch) => {
  axios.post(`${Url}api/v1/auth/authenticate`, data)
    .then((response) => {
      console.log("🚀 : ~ file: actionCreators.js:9 ~ .then ~ response", response.data.data);
      dispatch({
        type: actionTypes.USER_LOGIN,
        payload: response?.data?.data,
      });
      if (response?.data?.data?.roles.includes('ADMIN') || response?.data?.data?.roles.includes('ADMIN') ) {
        navigate("/dashboard");

      } else if (response?.data?.data?.roles?.includes('MANAGER') || response?.data?.data?.role === 'MANAGER') {
        navigate("/dashboard/allteams");
      }
      else {
        navigate("/dashboard/yourteam");
      }
 

      //  Toast.success(response?.data?.data?.message);
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
      Toast.error(error.response.data.error);
      console.error("Login error:", error);

    });
};
export const userRegister = (data, navigation) => (dispatch) => {
  axios.post(`${Url}api/v1/auth/register`, data)
    .then((response) => {
      dispatch({
        type: actionTypes.USER_REGISTER,
        payload: response.data.data,
      });
      navigation("/auth/login");
      Toast.success(response?.data?.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.error);
    });
};