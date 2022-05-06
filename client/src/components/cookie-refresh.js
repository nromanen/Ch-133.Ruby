import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import {useNavigate} from "react-router-dom";
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
    localStorage.clear();
  }

  let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(
      cookies.remove('user-info'),
      reqLogOut(),
      navigate("/sign_in")
    ), time);
  }).then(
  );

  useEffect(() => {
    const clear = async () => {
      await promise
    }
    let admin = localStorage.getItem('role');
    if (admin == "Admin") {
      navigate("/admin/roles")
    } else {
      navigate("/adverts")
    }
    clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export default CookieRefresh;
