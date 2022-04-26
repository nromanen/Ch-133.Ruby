import React from "react";
import "../../../../i18n";
import './Advert.scss'

const Advert = (resp) => {

    return (
        <div className={'post'}>
                <h2 className={'post'}>{resp.title}</h2>
            <div className={'post-text'}>
                <h4>{resp.text}</h4>
                <div className={'post-image'}>
                    <img src={resp.image_url} alt="im"></img>
                </div>
            </div>
        </div>
    )
};

export default Advert;