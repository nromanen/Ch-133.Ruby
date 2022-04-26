import React, {useState, useEffect} from "react";
import axios from 'axios';
import Message from '../../../../components/toster/message'
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import {baseShowAdvert} from "../../../../consts";
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "../../../../i18n";
import './Like.scss'
import Chip from '@mui/material/Chip';
import IconButton from "@mui/material/IconButton";
const cookies = new Cookies();

const Like = (props) => {
    let params = useParams();
    const [liked, setLiked] = useState('');
    const [text, setText] = useState('');
    const [severity, setSeverity] = useState('');
    const { t } = props;

    // useEffect(()=>{
    //     axios.get(`${baseShowAdvert}/${params.advertId}`)
    //         .then((response)=>{
    //             setLiked(response.data.advert.liked);
    //         })
    //         .catch(function (error) {
    //             setText(error.response.data.message);
    //             if (error.response.data.message === "Advert doesn't exist.") {
    //                 window.location = '/HomePage';
    //             }
    //         })
    // }, [params.advertId]);


    return (
        <div className={'like'}>
            {!!text ? <Message text={text} type={severity}/> : null}
            <FormControlLabel
                control={<Checkbox icon={<FavoriteBorder />}
                                   checkedIcon={<Favorite />}
                                   name="checkedH" />}
                label="2"
            />

        </div>
    )
};

export default Like;