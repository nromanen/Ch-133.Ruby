import React, {useState, useEffect} from "react";
import axios from 'axios';
import Message from '../../../components/toster/message'
import CustomButton from '../../../components/custom-button/custom-button'
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import {baseShowAdvert} from "../../../consts";
import Owner from "../../../pages/Advertisement/ShowAdvertisement/Owner/Owner"
import Like from "../../../pages/Advertisement/ShowAdvertisement/Like/Like"
import Advert from "../../../pages/Advertisement/ShowAdvertisement/Advert/Advert"
import Comment from "../../../pages/Advertisement/ShowAdvertisement/Comment/Comment"
import CreateComment from "../../../pages/Advertisement/ShowAdvertisement/Comment/CreateComment"
import "../../../i18n";
import './ShowAdvertisement.scss'
const cookies = new Cookies();

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
        //     .catch(function (error) {
        //         //setMessageText(error.response.data.message);
        //         if (error.response.data.message === "Advert doesn't exist.") {
        //             window.location = '/HomePage';
        //         }
        //     })
    }, [params.advertId]);
        return (
            <div className={'show-advertisement'}>
                <div>
                        <Owner owner_name={owner.owner_name}></Owner>
                        <Advert title={resp.title} text={resp.text}></Advert>
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
