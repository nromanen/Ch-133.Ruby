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
    const [liked, setLiked] = useState(null);
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState();
    const [likeId, setLikeId] = useState();
    const token = cookies.get('user-info');
    const config = {
        headers:{
            'Authorization': `Bearer ${token}`,
        }
    };
    const Url = {
        LIKES_URL: `${baseShowAdvert}/${advertId}/likes`
    }

    useEffect(() => {
        getIfLiked();
    }, []);

    function Like () {
        if (liked) {
            deleteLike();
        }  else {
            createLike();
        } 
    };

    const getIfLiked = async () => {
        await axios.get(Url.LIKES_URL, config).then(function (response) {
            setLiked(!!response.data["message"])
            setNumberOfLikes(response.data["amount"])
            setLikeId(response.data["message"])
        }) 
    };   

    const createLike = async () => {
        await axios.post(Url.LIKES_URL, {}, config).then(function (response) {
            setMessage(response.data["message"])
            setNumberOfLikes(response.data["amount"])
            setLikeId(response.data["id"])
            setLiked(true)
            setShowMessage(true);
        }) 
    };

    const deleteLike = async () => {
        await axios.delete(`${Url.LIKES_URL}/${likeId}`, config).then(function (response) {
            setMessage(response.data["message"])
            setNumberOfLikes(response.data["amount"])
            setLiked(false)
            setShowMessage(true);
        }) 
    };

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