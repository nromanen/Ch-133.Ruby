import React from "react";
import { withTranslation } from 'react-i18next';
import "../../../../i18n";
import './Comment.scss'

const Comment = (comments) => {

    return (
        <div className={'comment'}>
            {comments.comments}
        </div>
    )
};

export default withTranslation()(Comment);