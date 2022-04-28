import React, {useCallback, useState, useEffect} from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Message from '../../components/toster/message'
import { withTranslation } from 'react-i18next';
import "../../i18n";
import {resetPasswordEmail} from "../../consts";
import './ResetPasswordEmail.scss'

const ResetPasswordEmail = (props) => {

    const [email, setEmail] = useState('');
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
                    "email": email
                }
        };
        axios.post(`${resetPasswordEmail}`,
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

    }, [email]);

    return (
        <div className={'reset-password-email'}>
            { !!text  ? <Message text={text}/> : null }
            <h2>{t("resetPasswordEmail.head")}</h2>
            <form onSubmit={handleSubmit}>
                <FormInput name='email' type='email'
                           value={email} required
                           handleChange={event => { setEmail(event.target.value)}}
                           label = {t("resetPasswordEmail.email")} />
                <CustomButton type='submit'>{t("resetPasswordEmail.button")}</CustomButton>
            </form>
        </div>
    )
}

export default withTranslation()(ResetPasswordEmail);
