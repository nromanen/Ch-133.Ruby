import React from "react";
import Avatar from '@mui/material/Avatar';
import { teal } from '@mui/material/colors';
import "../../../../i18n";
import './Owner.scss'

const Owner = (owner) => {

    return (
        <div className='owner-show'>
            <Avatar alt={owner.owner_name} src="/static/images/avatar/2.jpg" sx={{ bgcolor: teal[500] }} />
            <div className='owner-show'>{owner.owner_name}</div>
        </div>
    )
};

export default Owner;
