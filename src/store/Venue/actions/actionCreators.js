import * as actionTypes from "./actionTypes";
import Toast from "../../../shared/Toast";

import axios from "axios";
const Url = process.env.REACT_APP_MAIN_URL;
export const AddVenue = (data, Token, Navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.post(`${Url}api/venues`, data, {
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": 'application/json'
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.Add_VENUE,
        // payload: response.data,
      });
      Navigate('/dashboard/allvenue')
      Toast.success(response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};
export const GetVenue = (page) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/venues?page=${page}&size=10`)
    .then((response) => {
      const data = response?.data;
      dispatch({
        type: actionTypes.GET_VENUE,
        payload: data
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });

    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch({
          type: actionTypes.GET_VENUE,
          payload: []
        });
      }
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
    });
};
export const GetVenueByVenueId = (VenueId, token) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.get(`${Url}api/venues/${VenueId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      const data = response.data.data || [];
      dispatch({
        type: actionTypes.GET_VENUE_BY_ID,
        payload: data
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
export const DelVenue = (Venueid, token, callback) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: true,
  });
  axios.delete(`${Url}api/venues/${Venueid}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.Delete_VENUE,
      });
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Toast.success(response.data.message);
      if (callback) callback();

    })
    .catch((error) => {
      console.log('error')
      dispatch({
        type: actionTypes.SET_LOADING,
        payload: false,
      });
      Toast.error(error.response.data.message);
    });
};
export const UpdateVenue = (data, Token, VenueId, Navigate) => (dispatch) => {
  axios.put(`${Url}api/venues/${VenueId}`, data, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.UPDATE_VENUE,
      });
      Navigate('/dashboard/allvenue')
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};
export const SearchVenue = (value) => (dispatch) => {
  axios.get(`${Url}api/venues/search?name=${value.toLowerCase()}&page=0&size=10`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_VENUE,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("🚀 ~ SearchVenue ~ error:", error)
    });
};
