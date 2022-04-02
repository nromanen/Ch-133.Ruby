import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Message from '../../components/message/message'

import './CategoryPage.scss'
import '../../consts.js'
import Cookies from 'universal-cookie';
import axios from "axios";
const cookies = new Cookies();

export default function App() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const token = cookies.get('user-info');
    const lang = cookies.get('i18next');
    const [status, setStatus] = useState('message-style-bad');
    const [category, setCategory] = useState('');
    const params = useParams();

    useEffect( () => {
        axios.get(window.createCategoryUrl+`/${params.id}`).then(response => {
            setName(response.data.name);
        }).then(console.log(category));
    }, [params]);

    const Submit = event => {
        event.preventDefault();

        const requestHeaders = {
            headers: { 'Content-Type': 'application/json', 'X-lang': lang, 'Authorization': `Bearer ${token}` },
        };

        const requestBody = {
            "name": name
        };

        axios.patch(`/categories/${params.id}`, requestBody, requestHeaders)
            .then((res) => {
                setMessage(res.data.message);
                setShowMessage(true);
            })
            .catch((err) => {
                setShowMessage(true);
                setMessage(err.response.data.message);
            });

    }

    return (
        <div className='category'>
            { !!showMessage? <Message text={message} style={status}/> :null }
            <h2>Create category</h2>
            <form onSubmit={Submit}>
                <FormInput name='name' type='text' value={name}
                           handleChange={event => {setName(event.target.value)}}
                           label='Name'/>
                <CustomButton type='submit'>Create</CustomButton>
            </form>
        </div>
    );
}
