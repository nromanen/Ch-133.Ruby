import React, {useEffect, useState} from 'react';
import PostCard from "../../components/Post/PostV2";
import axios from "axios";
import {getAllAdverts} from "../../consts";
import { StyledEngineProvider } from '@mui/material/styles';
import { Grid } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px"
    }
});

const Adverts = (props) => {
    const [advertisements, setAdv] = useState([]);
    const [page, setPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [hasMore, setHasMore] = useState(true);


    useEffect( ()=> {
        if (fetching && hasMore) {
            console.log("fetching")
             axios.get(`${getAllAdverts}` + `?page=${page}&per_page=${4}`).then(function (response) {
                setAdv([...advertisements, ...response.data]);
                setPage(prevState => prevState + 1);
                setHasMore(response.data.length > 0);
            }).finally(() => setFetching(false));
        }
    },[fetching, page]);


    useEffect(()  => {
        document.addEventListener('scroll', scrollHandler)
        return async function () {
            document.removeEventListener('scroll', scrollHandler)
        };
        }, [])

    const scrollHandler = async (e) => {
        if (e.target.documentElement.scrollHeight - ( e.target.documentElement.scrollTop + window.innerHeight) <100)
        {
            await setFetching(true);
        }
    }

    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={2} className={classes.gridContainer} justifyContent="center">
            {advertisements.map((post, index) => (
                <Grid item xs={12} sm={6} md={4}>
                <StyledEngineProvider injectFirst>
                <PostCard key={index} index={index} post={post}/>
                </StyledEngineProvider>
                </Grid>
            ))}
            </Grid>
            { fetching !== false && hasMore !== false &&
                <Grid  sx={{margin:"5px"}} container justifyContent="center">
                <CircularProgress disableShrink color="success" sx = {{margin: "auto",
                    marginTop: 3}}/>
                </Grid>}
        </div>
    );
}

export default Adverts;