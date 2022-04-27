import React, {useState, useEffect} from "react";
import axios from 'axios';
import Message from '../../components/toster/toster'
import Cookies from 'universal-cookie';
import {baseShowAdvert} from "../../consts";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "../../i18n";
import  "../../consts";
import  '../Like/Like.scss';
const cookies = new Cookies();
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Like = (props) => {
    let  advertId  = (props.id);
    const[liked, setLiked] = useState(props.liked);
    const[numberOfLikes, setNumberOfLikes] = useState(props.likes);
    const[likeId, setLikeId] = useState();
    const token = cookies.get('user-info');
    const language = cookies.get('i18next');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState();
    const config = {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-lang': language
        }
    };
    const Url = {
        LIKES_URL: `${baseShowAdvert}/${advertId}/likes`
    }

    useEffect(() => {
        if (props.liked === true) {
            getIds();
        }
    }, []);

    const getIds = async () => {
            await axios.get(Url.LIKES_URL, config).then(function (response) {
                setLiked(!!response.data["message"])
                setNumberOfLikes(response.data["amount"])
                setLikeId(response.data["message"])
            })
    };

    function Like () {
        if (liked) {
            deleteLike();
        }  else {
            createLike();
        }
    };

    const createLike = async () => {
        await axios.post(Url.LIKES_URL, {}, config).then(function (response) {
            setLiked(true)
            setNumberOfLikes(response.data["amount"]);
            setMessage(response.data["message"]);
            setShowMessage(true);
            setLikeId(response.data["id"]);
        })
    };

    const deleteLike = async () => {
        await axios.delete(`${Url.LIKES_URL}/${likeId}`, config).then(function (response) {
            setNumberOfLikes(response.data["amount"]);
            setLiked(false);
            setMessage(response.data["message"]);
            setShowMessage(true);
        })
    };

    return (
        <>
            <Message open={showMessage} text={message}/>
            <div className="likeAdvs">
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