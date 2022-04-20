import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";

import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Message from '../../components/toster/message'

import './CategoryPage.scss'
import '../../consts.js'
import Cookies from 'universal-cookie';
import axios from "axios";
import "../../i18n";
import { useTranslation } from "react-i18next";
import jwt from 'jwt-decode';
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
    const params = useParams();
    let tokentest = decoded['role'];
    let navigate = useNavigate();

    useEffect( () => {
        if ((tokentest!=='Moderator')&&(tokentest!=='Admin')){
            navigate(`/`, {replace: true});
        }
        axios.get(window.createCategoryUrl+`/${params.id}`).then(response => {
            setName(response.data.name);
        });
    }, [params]);

    const Submit = event => {
        event.preventDefault();

        const requestHeaders = {
            headers: { 'Content-Type': 'application/json', 'X-lang': lang, 'Authorization': `Bearer ${token}` },
        };

        const requestBody = {
            "name": name
        };

        axios.patch(window.createCategoryUrl+`/${params.id}`, requestBody, requestHeaders)
            .then((res) => {
                setStatus('success');
                setMessage(res.data.message);
                setShowMessage(true);
            })
            .catch((err) => {
                setStatus('error');
                setMessage(err.response.data.message[0]);
                setShowMessage(true);
            });

    }

    return (
        <div className='category'>
            { !!showMessage? <Message text={message} style={status}/> :null }
            <h2>{t("category.editCategory")}</h2>
            <form onSubmit={Submit}>
                <FormInput name='name' type='text' value={name}
                           handleChange={event => {setName(event.target.value)}}
                           label={t("category.name")}/>
                <CustomButton type='submit'>{t("category.edit")}</CustomButton>
            </form>
        </div>
    );
}
