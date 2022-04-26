import React, {useState, useEffect, useCallback} from "react";
import axios from 'axios';
import Message from '../../../../components/toster/toster'
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import {baseShowAdvert} from "../../../../consts";
import { withTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import FormInput from '../../../../components/form-input/form-input'
import AddCommentIcon from '@mui/icons-material/AddComment';
import "../../../../i18n";
import './Comment.scss'
const cookies = new Cookies();

const CreateComment = (props) => {
    let params = useParams();
    let token = cookies.get('user-info');
    const [text, setText] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState();
    const [messageText, setMessageText] = useState('');
    const [severity, setSeverity] = useState('');

    const handleSubmit = useCallback((event, value) => {
        event.preventDefault();
        const cookies = new Cookies();
        const language = cookies.get('i18next');
        const config = {
            headers: { Authorization: `Bearer ${token}`, 'X-lang': language, 'Content-Type': 'application/json' }
        };

        const bodyParameters = {
            "comment":
                {
                    "advert_id": params.advertId,
                    "text": text
                }
        };
        console.log(bodyParameters)

        axios.post(`${baseShowAdvert}/${params.advertId}/comments`, bodyParameters, config)
            .then((response)=>{
                setMessage(response.data.message);
                setSeverity("success")
            })
            .catch(function (error) {
                setMessageText(error.response.data.message);
                if (error.response.status === 422) {
                    setMessageText(error.response.data);
                    setSeverity("error")
                }
            })
    }, [params.advertId, text]);

    return (
        <div className={'create-comment'}>
            <Message open={showMessage} text={message}/>
            <form onSubmit={handleSubmit}>
                <Box classNane={'create-comment'}>
                    <AddCommentIcon />
                    <FormInput name='comment' type='text' value={text}
                               required  handleChange={event => { setText(event.target.value)}}>
                    </FormInput>
                    <IconButton aria-label="send" size={"small"} type='submit' onClick={handleSubmit}>
                        <SendIcon/>
                    </IconButton>
                </Box>
            </form>
        </div>
    )
};

export default withTranslation()(CreateComment);