import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import {useNavigate} from "react-router-dom"
const cookies = new Cookies();

function CookieRefresh() {
  const navigate = useNavigate();
  let time = 86400000; //24 hours in miliseconds
  let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(
      cookies.remove('user-info'),
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
  }, []);

  return <></>;
}

export default CookieRefresh;
