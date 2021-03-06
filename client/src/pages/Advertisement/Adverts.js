import React, {useEffect, useState} from 'react';
import PostCard from "../../components/Post/Post";
import axios from "axios";
import {baseAdvertUrl} from "../../consts";
import { StyledEngineProvider } from '@mui/material/styles';
import { Grid } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@mui/material/CircularProgress';
import "../../i18n";
import Cookies from "universal-cookie";

const cookies = new Cookies();
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
    const language = cookies.get('i18next');
    const token = cookies.get('user-info');
    const config = {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-lang': language
        }
    };


    useEffect( ()=> {
        if (fetching && hasMore) {
             axios.get(`${baseAdvertUrl}` + `?page=${page}&per_page=${4}`, config).then(function (response) {
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