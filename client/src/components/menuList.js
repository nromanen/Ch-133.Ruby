import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {useNavigate} from "react-router-dom"
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie';
import LoggedContext from 'context'
import { useContext } from 'react';
import { useTranslation } from "react-i18next";

export default function MenuPopupState() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('LOGGIN');
    const navigate = useNavigate();
    const cookies = new Cookies();
    const { logged } = useContext(LoggedContext);
    const token = cookies.get('user-info');

    function getEmail() {
      const decoded = jwt(token);
      let token_email = decoded["email"];
      setEmail(token_email)
    }

    useEffect(() => {
      if(logged) {
        getEmail()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logged]);

    useEffect(() => {
      if (token) {
        getEmail()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
      cookies.remove('user-info')
      navigate("/")
    }

    const goInfo = () => {
      const decoded = jwt(token);
      let token_id = decoded["id"];
      let resultUrl = `/users/${token_id}/user_infos`
      navigate(resultUrl)
    }

    if (email !== 'LOGGIN') {
      return(
        <>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="contained" {...bindTrigger(popupState)} style={{
                  backgroundColor: '#5ba19a',
                  color: '#fffff'
                }}>
                  {email}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={goInfo}>{t("header.info")}</MenuItem>
                  <MenuItem onClick={logout}>{t("header.logout")}</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </>
      );
    } else {
      return(
        <Button variant="contained" style={{
          backgroundColor: '#5ba19a',
          color: '#fffff'
        }}
            onClick={()=>navigate("/sign_in")}>
          {email}
        </Button>
      );
    }
}
