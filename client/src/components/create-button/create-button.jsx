import React from "react";
import '../create-button/create-button.scss';
import {useNavigate} from "react-router-dom";
import { withTranslation } from 'react-i18next';
import "../../i18n";

const CreateButton = (props) => {
    let navigate = useNavigate();
    const { t } = props;
    return(
    <button className='create-button' onClick={() => {navigate(props.link, {replace: true})}}>
        <span> {t("Advert.createButton")} </span>
    </button>
)
}
export default  withTranslation()(CreateButton);