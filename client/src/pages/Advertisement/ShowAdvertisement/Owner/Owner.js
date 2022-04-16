import React, {useState, useEffect} from "react";
import Message from '../../../../components/toster/message'
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import {baseShowAdvert} from "../../../../consts";
import Avatar from '@mui/material/Avatar';
import Typography from "@material-ui/core/Typography";
import { teal } from '@mui/material/colors';
//import { withTranslation } from 'react-i18next';
import "../../../../i18n";
import './Owner.scss'
const cookies = new Cookies();

const Owner = (owner) => {
    let params = useParams();
    const [ownerName, setOwnerName] = useState('');
    // const [ownerID, setOwnerId] = useState('');
    // const [text, setText] = useState('');
    // const [severity, setSeverity] = useState('');
    // const { t } = props;
    // useEffect(()=>{
    //     axios.get(`${baseShowAdvert}/${params.advertId}`)
    //         .then((response)=>{
    //             setOwnerName(response.data.advert.owner.owner_name)
    //             setOwnerId(response.data.advert.owner.owner_id)
    //         })
    //         .catch(function (error) {
    //             setText(error.response.data.message);
    //             if (error.response.data.message === "Advert doesn't exist.") {
    //                 window.location = '/HomePage';
    //             }
    //         })
    // }, [params.advertId]);

    return (
        <div className='owner'>
            <div className={"owner-show"}><Avatar  sx={{ bgcolor: teal[500] }} name={'owner avatar'} /></div>
            <div className={"owner-show"}>{owner.owner_name}</div>
        </div>
    )
};

export default Owner;
