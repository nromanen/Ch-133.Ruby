import React, {useCallback, useState} from "react";
import axios from 'axios';
import Message from '../../components/toster/message'
import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Cookies from 'universal-cookie';
import {signUpUrl} from "../../consts";
import { withTranslation } from 'react-i18next';
import "../../i18n";
import './SignUp.scss'
import '../../consts.js'

const SignUp = (props) => {
    const [nick_name, setNickName] = useState('');
    const [email, setEmail] = useState('');
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
                    "nick_name": nick_name,
                    "email": email,
                    "password": password,
                    "password_confirmation": password_confirmation
                }
        };
        axios.post(`${signUpUrl}`,
            bodyParameters,
            config,
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

    }, [nick_name, email, password, password_confirmation]);

    return (
        <div className={'sign-up'}>
            { !!text  ? <Message text={text} type={severity}/> : null }
            <h2>{t("signUp.head")}</h2>
            <form onSubmit={handleSubmit}>
                <FormInput name='nick_name' type='text' value={nick_name}
                           required  handleChange={event => { setNickName(event.target.value)}} label={t("signUp.nick")} />
                <FormInput name='email' type='email' value={email}
                           required  handleChange={event => { setEmail(event.target.value)}} label={t("signUp.email")} />
                <FormInput name='password' type='password'
                           value={password} required
                           handleChange={event => { setPassword(event.target.value)}}
                           label={t("signUp.password")} />
                <FormInput name='password_confirmation' type='password'
                           value={password_confirmation} required
                           handleChange={event => { setPasswordConfirmation(event.target.value)}}
                           label={t("signUp.passwordConfirmation")} />
                <CustomButton type='submit'>{t("signUp.button")}</CustomButton>
            </form>
        </div>
    )
}

export default withTranslation()(SignUp);
