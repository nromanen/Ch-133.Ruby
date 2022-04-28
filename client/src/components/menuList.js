import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {useNavigate} from "react-router-dom";
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import LoggedContext from '../context';
import { useContext } from 'react';
import '../consts.js';
import './menuList.scss';
import { useTranslation } from "react-i18next";

export default function MenuPopupState() {
    const button_unable_name = 'LOGIN';
    const { t } = useTranslation();
    const [email, setEmail] = useState(button_unable_name);
    const navigate = useNavigate();
    const cookies = new Cookies();
    const { logged } = useContext(LoggedContext);
    const token = cookies.get('user-info');
    const axios = require('axios');

    function getEmail() {
      const decoded = jwt(token);
      let token_email = decoded["email"];
      setEmail(token_email)
    }

    function reqLogOut() {
      axios.delete(window.singOutUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    }

    useEffect(() => {
      if(localStorage.getItem('loged')) {
        getEmail()
      }
    });

    const logout = () => {
      cookies.remove('user-info')
      reqLogOut()
      localStorage.clear();
      setEmail(button_unable_name)
      navigate("/")
    }

    const goInfo = () => {
      const decoded = jwt(token);
      let token_id = decoded["id"];
      let resultUrl = `/users/${token_id}/user_infos`
      navigate(resultUrl)
    }

    if (email !== button_unable_name) {
      return(
        <>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button className={"log_btn"} variant="contained" {...bindTrigger(popupState)} style={{
                  backgroundColor: '#5ba19a',
                  color: '#fffff'
                }}>
                  {email}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={goInfo}>{t("header.info")}</MenuItem>
                  <MenuItem onClick={()=>navigate("/categories")}>{t("header.category")}</MenuItem>
                  <MenuItem onClick={logout}>{t("header.logout")}</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </>
      );
    } else {
      return(
        <>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button className={"log_btn"} variant="contained" {...bindTrigger(popupState)} style={{
                  backgroundColor: '#5ba19a',
                  color: '#fffff'
                }}>
                  {email}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={()=>navigate("/sign_in")}>{t("header.signin")}</MenuItem>
                  <MenuItem onClick={()=>navigate("/sign_up")}>{t("header.signup")}</MenuItem>
                  <MenuItem onClick={()=>navigate("/send_email")}>{t("header.reset")}</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </>
      );
    }
}
