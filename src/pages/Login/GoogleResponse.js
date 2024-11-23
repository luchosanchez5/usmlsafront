import React, { useEffect } from 'react'
import AuthLayout from '../../layout/AuthLayout'
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getToken } from '../../store/user/actions/actionCreators';
import Loading from '../../shared/Loading';

const GoogleResponse = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  useEffect(() => {
    // Extract token from URL params
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("xbyd");
    if (tokenParam) {
      const timer = setTimeout(() => {
        dispatch(getToken(tokenParam, navigate));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, location.search, navigate]);




  return (
    <Loading />
  )
}

export default AuthLayout(GoogleResponse)