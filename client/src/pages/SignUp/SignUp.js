import React, {useCallback, useState} from "react";
import axios from 'axios';

import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Message from '../../components/message/message'
import {signUpUrl} from "../../consts";
import './SignUp.scss'
import '../../consts.js'

const SignUp = (props) => {

    const [nick_name, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = useCallback((event, value) => {
        event.preventDefault();
        console.log('values = ', nick_name, email, password, password_confirmation);

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
            bodyParameters
        )
            .then(function (response) {
                setText(response.data.message);

            })
            .catch(function (error) {
                if (error.response.status === 422) {
                    setText(error.response.data.join(', \n'));
                }
            });

    }, [nick_name, email, password, password_confirmation]);

    return (
        <div className={'sign-up'}>
            { !!text  ? <Message text={text}/> : null }
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <FormInput name='nick_name' type='text' value={nick_name}
                           required  handleChange={event => { setNickName(event.target.value)}} label='nick' />
                <FormInput name='email' type='email' value={email}
                           required  handleChange={event => { setEmail(event.target.value)}} label='email' />
                <FormInput name='password' type='password'
                           value={password} required
                           handleChange={event => { setPassword(event.target.value)}}
                           label='password' />
                <FormInput name='password_confirmation' type='password'
                           value={password_confirmation} required
                           handleChange={event => { setPasswordConfirmation(event.target.value)}}
                           label='password confirmation' />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )
}

export default SignUp;
