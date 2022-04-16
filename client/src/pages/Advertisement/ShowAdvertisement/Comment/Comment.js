import React, {useState, useEffect} from "react";
import axios from 'axios';
import Message from '../../../../components/toster/message'
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import {baseShowAdvert} from "../../../../consts";
import { withTranslation } from 'react-i18next';
import { teal } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import "../../../../i18n";
import './Comment.scss'
const cookies = new Cookies();

const Comment = (comments) => {
    let params = useParams();
    const [text, setText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [messageText, setMessageText] = useState('');
    const [severity, setSeverity] = useState('');
    console.log(typeof comments.comments);
    console.log(comments.comments);

    useEffect(()=>{
        const comment = Object.values(comments.comments)
        // console.log(comment);
            setText(comment.map(function (comment, i) {
                    console.log(comment.text);
                    return <p>{comment.text}</p>
                })
            );
                // setAuthorName(this.resp.map(function(comment, i) {
                //     console.log(comment.author.author_name);
                //     return <div>{comment.author.authorName}</div>
                // }));
            // })
            // .catch(function (error) {
            //     setMessageText(error.response.data.message);
                // if (error.response.data.message === "Advert doesn't exist.") {
                //     window.location = '/HomePage';
                // }
            // })
        // const result = Object.keys(comments).map(key => {
        //     console.log(key);;});
     }, [params.advertId]);

    return (
        <div className={'comment'}>
            {!!messageText ? <Message text={messageText} type={severity}/> : null}

            <Avatar name={authorName} src="" sx={{ bgcolor: teal[500] }} title={{authorName}} />
            {/*<div className={"owner-name"}>{comment.author.authorName}</div>*/}
            {/*<div className={"owner-name"}>{comment.text}</div>*/}

        </div>
    )
};

export default withTranslation()(Comment);