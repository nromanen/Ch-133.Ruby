import React, {useState, useEffect} from "react";
import axios from 'axios';
import Message from '../../../../components/toster/toster'
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import {baseShowAdvert} from "../../../../consts";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "../../../../i18n";
import  "../../../../consts";
import  './Like.scss'
const cookies = new Cookies();
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Like = (props) => {
    let { advertId } = useParams();
    const [liked, setLiked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("O-ops, something went wrong");
    const token = cookies.get('user-info');
    const config = {
        headers:{
            'Authorization': `Bearer ${token}`,
        }
    };
    const Url = {
        LIKED_URL: `${baseShowAdvert}/${advertId}/liked`,
        LIKES_URL: `${baseShowAdvert}/${advertId}/likes`
    }

    useEffect(() => {
        getIfLiked();
    }, []);

    function Like () {
        if (liked) {
            deleteLike()
        } else {
            createLike()
        }
        setShowMessage(true)
    };

    function getIfLiked () {
       axios.get(Url.LIKED_URL, config)
        .then(function (response) {
            setLiked(!!response.data["message"])
            setNumberOfLikes(response.data["amount"])
        }) 
    }   

    function createLike () {
       axios.post(Url.LIKES_URL, {}, config)
        .then(function (response) {
            setMessage(response.data["message"])
            setNumberOfLikes(response.data["amount"])
            setLiked(true)
        }) 
    }

    function deleteLike () {
        axios.delete(Url.LIKES_URL, config).then(function (response) {
            setMessage(response.data["message"])
            setNumberOfLikes(response.data["amount"])
            setLiked(false)
        }) 
    }

    return (
        <>
           <Message open={showMessage} text={message}/> 
           <div className="like">
                <FormControlLabel
                    control={
                        <Checkbox {...label} 
                            icon={<FavoriteBorder />} 
                            checkedIcon={<Favorite />} 
                            checked={liked} 
                            onClick={Like}
                        />
                    }
                    label={numberOfLikes}
                />
           </div>
        </>
    )
};

export default Like;