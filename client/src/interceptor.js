import axios from 'axios';
import Cookies from 'universal-cookie';
import './consts.js'
const cookies = new Cookies();
const token = cookies.get('user-info');
const language = cookies.get('i18next');

axios.defaults.baseURL = window.baseUrl;
axios.defaults.headers.common['X-lang'] = `${language}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(req => {
  if (token)
    req.headers.authorization = `Bearer ${token}`;
  return req;
});
