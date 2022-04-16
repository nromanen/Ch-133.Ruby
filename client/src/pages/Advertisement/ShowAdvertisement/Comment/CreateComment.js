import React, {useState, useEffect, useCallback} from "react";
import axios from 'axios';
import Message from '../../../../components/toster/message'
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import {baseShowAdvert} from "../../../../consts";
import { withTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import AddCommentIcon from '@mui/icons-material/AddComment';
import "../../../../i18n";
import './Comment.scss'
const cookies = new Cookies();

const CreateComment = (props) => {
    let params = useParams();
    const [text, setText] = useState('');
    const [messageText, setMessageText] = useState('');
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
            "comment":
                {
                    "text": text
                }
        };

        axios.post(`${baseShowAdvert}/${params.advertId}/comments`, bodyParameters, config)
            .then((response)=>{
                setText(response.data.comments.object.text);
                setSeverity("success")
            })
            .catch(function (error) {
                setMessageText(error.response.data.message);
                if (error.response.status === 422) {
                    setText(error.response.data.join(', \n'));
                    setSeverity("error")
                }
            })
    }, [params.advertId]);

    return (
        <div className={'create-comment'}>
        <Box classNane={'create-comment'}>
            <AddCommentIcon />
            <TextField id="input-with-sx" variant="standard"/>
               <IconButton aria-label="send" size={"medium"}>
                <SendIcon />
            </IconButton>
        </Box>
        </div>
    )
};

export default withTranslation()(CreateComment);