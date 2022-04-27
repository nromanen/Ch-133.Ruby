import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import './Post.scss'
import Cookies from 'universal-cookie';
import jwt from "jwt-decode";
import Like from "../Like/Like"

const cookies = new Cookies();

export default function PostCard({ post: { title, body,
    imgUrl, author, author_id, id, liked, likes, category_name }, index }) {

    let slash = "/adverts/";
    let navigate = useNavigate();
    let token = cookies.get('user-info');
    let decoded = null;
    let token_id = 0;
    let text = "";
    try {
        decoded = jwt(token);
        token_id = decoded["id"];
    }catch (exc){
    }

    if (body.length > 40) {
        text = body.slice(0,42).concat("...")
    }
    else {
        text = body
    }

    return <div className={"Advertisement"}>
    <Card variant="outlined"
          sx={{
        maxWidth: 500,
        maxHeight: 600,
        margin: "auto",
        marginTop: 3
        }}>
        <div className={"advertImg"}>
            <CardMedia
                component="img"
                height="250"
                width="auto"
                image={imgUrl}
            />
        </div>

        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {title} <Like likes={likes} liked={liked} id={id}/>
            </Typography>
            <Typography sx={{ mb: 1.5, paddingBottom:"10px"}} color="text.secondary">
                {author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {text}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={() => {navigate(slash.concat(id))}}>Learn More</Button>
            <Button size="small" onClick={() => {navigate(slash.concat(id))}}>{category_name}</Button>
            { token_id === author_id &&
            <Button size="small" onClick={() => {navigate(slash.concat(id, "/edit"))}}>Edit</Button>
            }
        </CardActions>
    </Card>
    </div>;
}