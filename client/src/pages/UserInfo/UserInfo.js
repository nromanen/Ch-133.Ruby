import React, {useCallback, useState} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Cookies from 'universal-cookie';
import Message from '../../components/toster/message';
// import Message from "../../components/message/message";
import {baseUrlUsers} from "../../consts";
import '../../components/message/message.scss'
import './UserInfo.scss'
import jwt from 'jwt-decode';
import { withTranslation } from 'react-i18next';
import "../../i18n";
import ImageUploader from "react-images-upload";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const cookies = new Cookies();




const UserInfo = (props) => {
    let params = useParams();
    let token = cookies.get('user-info');
    const decoded = jwt(token);
    let token_id = decoded["id"];
    const { t } = props;

    const [image, setImage] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatarImg, setAvatarImg] = useState('');
    const [phone, setPhone] = useState('');
    const [showBtnSend, setShowBtnSend] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [text, setText] = useState(null);
    const [msgType, setMsgType] = useState('error');

    const [subscribed, setSubscribed] = useState(null)
    const [subscribedTitle, setTitleSubscribed] = useState("")
    const [oppositeSubscribed, setOppositeTitleSubscribed] = useState("")

    const handleSubmit = useCallback((event, value) => {
        event.preventDefault();

        const language = cookies.get('i18next');
        const config = {
            headers: { Authorization: `Bearer ${token}`, 'X-lang': language, 'Content-Type': 'application/json' }
        };

        const bodyParameters = {
            "first_name": firstName,
            "last_name": lastName,
            "phone": phone,
            "image": image
        };
        console.log('image1 ------', image);
        setDisabled(true);
        if (token_id === params.userId){
            axios.put(`${baseUrlUsers}/${params.userId}/user_infos`,
                bodyParameters,
                config
            )
                .then(function (response) {
                    console.log('--------- response', response);
                    setText('User info was updated.');
                    setFirstName(response.data.info.data.attributes.first_name);
                    setLastName(response.data.info.data.attributes.last_name);
                    setPhone(response.data.info.data.attributes.phone);
                    setAvatarImg(response.data.info.data.attributes.image_url)
                    setMsgType('success')
                })
                .catch(function (error) {
                    console.log('--------- error', error);
                    if (error.response.status === 422){
                        setText(error.response.data.join('<br>'));
                        setMsgType('error')
                    }
                }).finally(() => setDisabled(false));
        }

    }, [firstName, lastName, phone, params.userId, image, token, pictures, msgType]);

    const onImage = async (failedImages, successImages) => {
        try {
            const parts = successImages[0].split(';');
            const mime = parts[0].split(':')[1];
            const name = parts[1].split('=')[1];
            const data = parts[2].split(',')[1];
            setImage([mime, name, data]);
            console.log("image --------------", image)
        } catch (error) {
            console.log('error in upload', error);}
    };

    React.useEffect(()=>{
        axios.get(`${baseUrlUsers}/${params.userId}/user_infos`)
            .then((response)=>{
                setFirstName(response.data.info.data.attributes.first_name);
                setLastName(response.data.info.data.attributes.last_name);
                setPhone(response.data.info.data.attributes.phone);
                setAvatarImg(response.data.info.data.attributes.image_url)
                if (token_id === params.userId){
                    setShowBtnSend(true)
                } else {
                    setShowBtnSend(false)
                }
            })
            .catch(function (error) {
                setText(error.response.data.message);
                if (error.response.data.message === "User doesn't exist.") {
                    window.location = '/HomePage';
                }
            })

        const config = {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        };
        axios.get(`${window.baseUrl}subscribed`, config)
            .then((response)=> {
                if (response.data){
                    setTitleSubscribed('Subscribe')
                    setOppositeTitleSubscribed('Unsubscribe')
                    setSubscribed(response.data)
                }
                else{
                    setTitleSubscribed('Unsubscribed')
                    setOppositeTitleSubscribed('Subscribe')
                }
            })
    }, [params.userId]);

    const handleSubscribe = (e) => {
        confirmAlert({
            title: `${oppositeSubscribed}`,
            message: `You sure you want to ${oppositeSubscribed}?`,
            buttons: [ {label: "Yes", onClick: () => changeSubscribe()}, {label: "No"} ]
        });
    }

    const changeSubscribe = (e) => {
        axios.patch(`${window.baseUrl}subscribes`, {"subscribed": !subscribed},
            {headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }})
            .then((res) => {
                alert("Success");
                window.location.reload();
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    }

    return (
        <div className={'user-info-page'}>
            { !!text  ? <Message text={text} type={msgType}/> : null }

            <h2>{t("userInfo.head")}</h2>
            <div className={"avatar"}>
                { !!avatarImg  ? <img src={avatarImg} alt="avatar" /> : null }
            </div>
            <form onSubmit={handleSubmit}>
                <FormInput name='first_name' type='text' value={firstName}
                           handleChange={event => { setFirstName(event.target.value)}}
                           label={t("userInfo.firstName")} />
                <FormInput name='last_name' type='text' value={lastName}
                           handleChange={event => { setLastName(event.target.value)}}
                           label={t("userInfo.lastName")} />

                { !!showBtnSend  ? <FormInput name='phone' type='text' value={phone}
                                              handleChange={event => { setPhone(event.target.value)}}
                                              label={t("userInfo.phone")} /> : null }
                <ImageUploader
                    onChange={onImage}
                    withIcon={false}
                    withPreview={true}
                    buttonText="Choose images"
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                />
                { !!showBtnSend  ? <CustomButton disabled={disabled} type='submit'>Send</CustomButton> : null }
                <p></p>
                { !!showBtnSend  ? <CustomButton disabled={disabled} onClick={(e) => handleSubscribe(e)} type='submit'>{oppositeSubscribed}</CustomButton> : null }
                <p> </p>
                <p> </p>

            </form>
        </div>

    )
};


// export default UserInfo;
export default withTranslation()(UserInfo)