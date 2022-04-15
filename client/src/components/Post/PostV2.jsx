import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import './Post.scss'

export default function PostCard({ post: { title, body,
    imgUrl, author, id }, index }) {

    let slash = "/adverts/";
    let navigate = useNavigate();

    return (
        <div className={"Advertisement"}>
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
                    {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {body}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => {navigate(slash.concat(id))}}>Learn More</Button>
            </CardActions>
        </Card>
        </div>
    );
}