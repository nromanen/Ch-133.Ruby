import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Message from '../../components/toster/message'
import CookieRefresh from '../../components/cookie-refresh.js'
import LoggedContext from '../../context'
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import "../../i18n";
import './SingIn.scss'
import '../../consts.js'
import useInterceptor from '../../interceptor.js'

const SignIn = () => {
  const [message, setMessage] = useState(false);
  const [text, setText] = useState('');
  const [token, setToken] = useState(false);
  const interseptor = useInterceptor();
  const { t } = useTranslation();
  const axios = require('axios');
  const cookies = new Cookies();
  const { logged, setLogged } = useContext(LoggedContext);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { email, password } = formValue;

  const handleSubmit = (event) => {
    setMessage(false);
    event.preventDefault();
    axios.post('users/sign_in', {
      "user": {
        "email": email,
        "password": password
      }
    })
    .then(function (response) {
      setToken(true);
      cookies.set('user-info', response.data['token'], {
        path: '/',
        sameSite: 'Strict',
        secure: true,
      });
      setLogged(true);
    })
    .catch(function (error) {
      setMessage(true);
      setText(error.response.data['message']);
    });
  }

  return(
    <div className='sign-in'>
      { message ? <Message text={text} type={"error"}/> : null }
      { token ? <CookieRefresh/> : null }
      <h2>{t("singIn.head")}</h2>
      <form onSubmit={handleSubmit}>
        <FormInput name='email' type='email' value={email}
          required handleChange={handleChange} label={t("singIn.email")} />
        <FormInput name='password' type='password'
          value={password} required
          handleChange={handleChange} label={t("singIn.password")} />
        <CustomButton type='submit'>{t("singIn.button")}</CustomButton>
      </form>
    </div>
  );
}

export default SignIn
