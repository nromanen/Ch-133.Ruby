import axios from 'axios';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';
import './consts.js'
const cookies = new Cookies();

const useInterceptor = (needLanguage, needToken) => {
  axios.defaults.baseURL = window.baseUrl;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  useEffect(() => {
    if (needToken) {
      const token = cookies.get('user-info');
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    }
    if (needLanguage) {
      axios.defaults.headers.common['X-lang'] = `${cookies.get('i18next')}`;
    }
  }, [needLanguage, needToken]);

  return 1;
};

export default useInterceptor;
