import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import {useNavigate} from "react-router-dom";
import LoggedContext from '../context';
import { useContext } from "react";
const cookies = new Cookies();
const token = cookies.get('user-info');
const axios = require('axios');

function CookieRefresh() {
  const navigate = useNavigate();
  let time = 86400000; //24 hours in miliseconds

  function reqLogOut() {
    axios.delete(window.singOutUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    localStorage.setItem('logged', false);
  }

  let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(
      cookies.remove('user-info'),
      reqLogOut(),
      navigate("/sign_in")
    ), time);
  }).then(
    result => console.log(result),
  );

  useEffect(() => {
    const clear = async () => {
      await promise
    }
    navigate("/adverts")
    clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export default CookieRefresh;
