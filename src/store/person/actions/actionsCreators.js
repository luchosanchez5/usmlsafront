import * as actionTypes from "./actionTypes";
import axios from "axios";
import Toast from "../../../shared/Toast";
const Url = process.env.REACT_APP_MAIN_URL;
export const Add_Persons = (data, Token, Navigate, role) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios
    .post(`${Url}api/persons`, data, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
    .then((response) => {
      console.log(response);
      dispatch({
        type: actionTypes.ADD_PERSONS,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });
      if (role === "ADMIN") {
        Navigate("/dashboard/allpersons");
      } else {
        Navigate("/dashboard/allteams");
      }
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};
export const Update_Persons = (data, id, Token, Navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios
    .put(`${Url}api/persons/${id}`, data, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })

    .then((response) => {
      dispatch({
        type: actionTypes.UPDATE_PERSON,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: true,
      });

      Toast.success(response.data.message);
      Navigate("/dashboard/allpersons");
    })
    .catch((error) => {
      Toast.success(error.data.message);
      // Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};
export const GetPersons = (page, token) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios
    .get(`${Url}api/persons?page=${page}&size=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PERSONS,
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
          type: actionTypes.GET_PERSONS,
          payload: [],
        });
      }
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};
export const getPersonsbySearch = (value) => (dispatch) => {
  axios
    .get(`${Url}api/persons/search?name=${value.toLowerCase()}&page=0&size=10`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PERSONS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("🚀 ~ GetPersons ~ error:", error);
    });
};
export const GetPersonsById = (id, Token) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios
    .get(`${Url}api/persons/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PERSONS_BY_ID,
        payload: response.data.data,
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
export const DelPersons = (Personid, token, callback) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios
    .delete(`${Url}api/persons/${Personid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch({
        type: actionTypes.Delete_PERSONS,
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

export const GetPerson =
  (id = "10", Token) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: true,
    });
    axios
      .get(
        `${Url}api/persons/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: actionTypes.GET_PERSON,
          payload: response.data,
        });
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: false,
        });
      })
      .catch((error) => {
        Toast.success(error.response.data.message);
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: false,
        });
      });
  };
export const ForgetPassword = (email, Navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios
    .post(`${Url}api/persons/forgot-password?email=${email}`, {})
    .then((response) => {
      console.log(
        "🚀 : ~ file: actionsCreators.js:135 ~ .then ~ response",
        response
      );
      dispatch({
        type: actionTypes.FORGET_PASSWORD,
        payload: response.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Navigate("/auth/reset-password");
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.error);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};
export const ResetPassword = (email, pass, otp, navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios
    .post(
      `${Url}api/persons/reset-password?email=${email}&newPassword=${pass}&token=${otp}
`,
      {}
    )
    .then((response) => {
      console.log(response);
      dispatch({
        type: actionTypes.GET_PERSON,
        payload: response.data,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Toast.success(response.data.message);
      navigate("/auth/login");
    })
    .catch((error) => {
      Toast.error(error.response.data.error);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};
export const UploadPersonImg = (id, Token,file) => (dispatch) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log(formData)

  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios
    .post(`${Url}api/persons/${id}/upload-picture`,formData, {
      headers: {
        Authorization: `Bearer ${Token}`,
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