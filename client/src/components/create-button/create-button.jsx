import React from "react";
import '../create-button/create-button.scss';
import {useNavigate} from "react-router-dom";

const CreateButton = (props) => {
    let navigate = useNavigate();
    return(
    <button className='create-button' onClick={() => {navigate(props.link, {replace: true})}}>
        <span> Create an advert </span>
    </button>
)
}
export default  CreateButton;