import axios from 'axios';
import Cookies from 'universal-cookie';
import React, { useState, useEffect } from 'react';
import './consts.js'
import jwt from 'jwt-decode';
const cookies = new Cookies();
const token = cookies.get('user-info');

const useInterceptor = () => {
  axios.defaults.baseURL = window.baseUrl;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  const [language, setLanguage] = useState(null);
  const [token, setToken] = useState(null);
  let role = null;

  useEffect(() => {
    setLanguage(cookies.get('i18next'));
    axios.defaults.headers.common['X-lang'] = `${language}`;
    if (token) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    }
  });
  return 1;
  // maybe not good for performance, but without redux i cannot do better
};

export default useInterceptor;
