import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import PostsCard from '../components/PostsCard';
import {getAllPosts, getLatestPosts} from '../services/dbservices/postservices/PostFunctions';
import AppNavbar from "../components/AppNavbar";
import QR from "../components/Qr";

const Lobby = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const response = await getLatestPosts();
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <AppNavbar isLobbyTv={true}/>
            <Carousel autoPlay={true} interval={10000} animation={'slide'}>
                {posts && posts.length > 0 ? (
                    posts.map((item, i) => <PostsCard key={i} post={item} />)
                ) : (
                    <p>No posts available</p>
                )}
            </Carousel>
            <QR/>
        </>
    );
};

export default Lobby;
