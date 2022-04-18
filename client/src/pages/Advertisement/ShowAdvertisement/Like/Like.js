import React, {useState, useEffect} from "react";
import axios from 'axios';
import Message from '../../../../components/toster/toster'
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import {baseShowAdvert} from "../../../../consts";
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "../../../../i18n";
import  "../../../../consts";
import  './Like.scss'
const cookies = new Cookies();


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
        getNumberOfLikes();
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
        }) 
    }   

    function createLike () {
       axios.post(Url.LIKES_URL, {}, config)
        .then(function (response) {
            setMessage(response.data["message"])
            setLiked(true)
            getNumberOfLikes()
        }) 
    }

    function deleteLike () {
        axios.delete(Url.LIKES_URL, config).then(function (response) {
            setMessage(response.data["message"])
            setLiked(false)
            getNumberOfLikes()
        }) 
    }

    function getNumberOfLikes () {
        axios.get(Url.LIKES_URL)
        .then(function (response) {
            setNumberOfLikes(response.data["message"])
        }) 
    }

    return (
        <>
           { showMessage ? <Message open={true} text={message}/> : null }
            <div className={'like'}>
                <FormControlLabel
                    control={
                        <Checkbox icon={<FavoriteBorder />}
                            checked={liked}
                            checkedIcon={<Favorite />}
                            name="checkedH" 
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