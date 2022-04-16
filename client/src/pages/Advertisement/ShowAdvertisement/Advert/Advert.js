import React, {useState, useEffect} from "react";
import Message from '../../../../components/toster/message'
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import {baseShowAdvert} from "../../../../consts";
//import ImageUploader from "react-images-upload";
//import { withTranslation } from 'react-i18next';
import "../../../../i18n";
import './Advert.scss'
const cookies = new Cookies();

const Advert = (resp) => {
    let params = useParams();
    const [image, serImage] = useState('https://image.shutterstock.com/image-vector/question-bubbles-line-icon-ask-260nw-2004744938.jpg')
    const [messageText, setMessageText] = useState('');
    const [severity, setSeverity] = useState('');
    //console.log(resp.title);

    return (
        <div className={'post'}>
            {!!messageText ? <Message text={messageText} type={severity}/> : null}
                <h2 className={'post'}>{resp.title}</h2>
            <div className={'post-text'}>
                <h4>{resp.text}</h4>
                <div className={'post-image'}>
                    <img src={image} alt="im"></img>
                </div>
            </div>
        </div>
    )
};

export default Advert;