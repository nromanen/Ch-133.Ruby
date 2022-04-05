import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import FormInput from '../../components/form-input/form-input';
import CustomButton from '../../components/custom-button/custom-button';
import Message from '../../components/toster/message'

import './CategoryPage.scss';
import '../../consts.js';
import axios from "axios";
import "../../i18n";
import { useTranslation } from "react-i18next";
import '../../interceptor.js';
import jwt from 'jwt-decode';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function App() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const token = cookies.get('user-info');
    const lang = cookies.get('i18next');
    const [status, setStatus] = useState('');
    const { t } = useTranslation();
    const decoded = jwt(token);
    let navigate = useNavigate();

    useEffect( () => {
        checkrole(decoded['role']);
    });

    const checkrole = (tokentest) =>{
        if((tokentest!=='Admin')&&(tokentest!=='Moderator')) {
            navigate(`/`, {replace: true});
        }
    };

    const Submit = event => {
        event.preventDefault();

        const requestHeaders = {
            headers: { 'Content-Type': 'application/json', 'X-lang': lang, 'Authorization': `Bearer ${token}` },
        };

        const requestBody = {
            "name": name
        };

        axios.post(window.createCategoryUrl, requestBody, requestHeaders)
            .then((res) => {
                setStatus('success');
                setMessage(res.data.message);
                setShowMessage(true);
            })
            .catch((err) => {
                setStatus('error');
                setShowMessage(true);
                setMessage(err.response.data.message);
            });

    }

    return (
            <div className='category'>
                { !!showMessage? <Message text={message} type={status}/> :null }
                <h2>{t("category.createCategory")}</h2>
                <form onSubmit={Submit}>
                    <FormInput name='name' type='name' value={name}
                    handleChange={event => {setName(event.target.value)}}
                    label = {t("category.name")}/>
                    <CustomButton type='submit'>{t("category.create")}</CustomButton>
                </form>
            </div>
        );
}
