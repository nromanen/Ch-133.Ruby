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

    if (email !== 'LOGGIN') {
      return(
        <>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="contained" {...bindTrigger(popupState)} >
                  {t("header.button")}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={()=>navigate("/user_info")}>User info</MenuItem>
                  <MenuItem onClick={()=>navigate("/language_settings")}>Language</MenuItem>
                  <MenuItem onClick={()=>navigate("/logout")}>Logout</MenuItem>
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
