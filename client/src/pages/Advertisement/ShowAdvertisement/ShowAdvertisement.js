import React, {useState, useEffect} from "react";
import axios from 'axios';
import {teal} from "@mui/material/colors";
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useParams } from "react-router-dom";
import {baseShowAdvert} from "../../../consts";
import Owner from "../../../pages/Advertisement/ShowAdvertisement/Owner/Owner"
import Like from "../../../pages/Advertisement/ShowAdvertisement/Like/Like"
import Advert from "../../../pages/Advertisement/ShowAdvertisement/Advert/Advert"
import Comment from "../../../pages/Advertisement/ShowAdvertisement/Comment/Comment"
import CreateComment from "../../../pages/Advertisement/ShowAdvertisement/Comment/CreateComment"
import './ShowAdvertisement.scss'

const ShowAdvertisement = (props) => {
    let params = useParams();
    const [resp,setResp] = useState('');
    const [owner, setOwner] = useState('');
    const [comments, setComments] = useState('');

   console.log(comments)

    useEffect(()=>{
        axios.get(`${baseShowAdvert}/${params.advertId}`)
            .then((response)=>{
                setResp(response.data.advert)
                setOwner(response.data.advert.owner)
                setComments(response.data.advert.comments)
            })
    }, [params.advertId]);

        return (
            <div className={'show-advertisement'}>
                <div>
                        <Owner owner_name={owner.owner_name}></Owner>
                        <Advert title={resp.title} text={resp.text} image_url={resp.image_url}></Advert>
                <div className={"like-and-comment"}>
                        <Like props={props}></Like>
                </div>
                    <div className={"like-and-comment"}>
                        <CreateComment></CreateComment>
                </div>
                        <Comment comments={comments}></Comment>
                </div>
            </div>
        )
    };

export default ShowAdvertisement;
