import React, {useCallback, useState, useEffect} from "react";
import axios from 'axios';
import Cookies from "universal-cookie";
import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Message from '../../components/toster/message'
import { withTranslation } from 'react-i18next';
import "../../i18n";
import {resetPasswordUrl} from "../../consts";
import './ResetPassword.scss'
import {useParams} from "react-router-dom";

const ResetPassword = (props) => {
    let params = useParams();
    let { reset_password_token } = useParams();
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [text, setText] = useState('');
    const [severity, setSeverity] = useState('');
    const { t } = props;
    
    const handleSubmit = useCallback((event, value) => {
        event.preventDefault();
        const cookies = new Cookies();
        const language = cookies.get('i18next');
        const config = {
            headers: { 'X-lang': language }
        };

        const bodyParameters = {
            "user":
                {
                    "password": password,
                    "password_confirmation": password_confirmation
                }
        };
        console.log(bodyParameters)
        axios.patch(`${resetPasswordUrl}/${params.resetPasswordToken}`,
            bodyParameters,
            config
        )
            .then(function (response) {
                setText(response.data.message);
                setSeverity("success")
            })
            .catch(function (error) {
                if (error.response.status === 422) {
                    setText(error.response.data.join(', \n'));
                    setSeverity("error")
                }
            });

    }, [password, password_confirmation, params.resetPasswordToken]);

    return (
        <div className={'reset-password'}>
            { !!text  ? <Message text={text}/> : null }
            <h2>{t("resetPassword.head")}</h2>
            <form onSubmit={handleSubmit}>
                 <FormInput name='password' type='password'
                           value={password} required
                           handleChange={event => { setPassword(event.target.value)}}
                           label={t("resetPassword.password")} />
                <FormInput name='password_confirmation' type='password'
                           value={password_confirmation} required
                           handleChange={event => { setPasswordConfirmation(event.target.value)}}
                           label={t("resetPassword.passwordConfirmation")} />
                <CustomButton type='submit'>{t("resetPassword.button")}</CustomButton>
            </form>
        </div>
    )
}

export default withTranslation()(ResetPassword);
