import React, {useEffect, useState} from "react";
import { List, Divider, Box } from "@material-ui/core";
import './Comment.scss'
import Pagination from "@material-ui/lab/Pagination";
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {teal} from "@mui/material/colors";

const Comment = (comments) => {
    let text = new Array();
    const commentObj = comments.comments
    const commentLength = commentObj.length
    const itemsPerPage = 3;
    const [page, setPage] = useState(1);
    const noOfPages = Math.ceil(commentLength/itemsPerPage);

    Object.keys(commentObj).forEach(key => {
        text.push(commentObj[key])
    });

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className={'comment'}>
            <List className={"comment-area"}>
                {text
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map(function (comment) {
                            return (
                                <ListItem alignItems="center">
                                    <ListItemAvatar>
                                        <Avatar alt={comment.author.author_name} src={comment.author.author_img} sx={{ bgcolor: teal[500] }}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={comment.author.author_name}
                                        secondary={comment.text}/>
                                </ListItem>
                            )
                        }
                    )}
            </List>
            <Divider />
            <Box component="span" margin='auto'>
                <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={handleChange}
                    defaultPage={1}
                    size="large"
                    showFirstButton
                    showLastButton
                />
            </Box>
        </div>
    )
};

export default Comment;