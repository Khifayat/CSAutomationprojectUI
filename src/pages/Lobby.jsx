import React, { Suspense, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import PostsCard from '../components/PostsCard';
import { getLatestPosts } from '../services/dbservices/postservices/PostFunctions';
import AppNavbar from "../components/AppNavbar";
import QR from "../components/Qr";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';


let stompClient
const Lobby = () => {

    const [connected, setConnected] = useState(null);
    const [loaded, setLoaded] = useState(false)
    const [posts, setPosts] = useState([]);

    async function connect() {
        let Sock = new SockJS('http://localhost:8080/websocket')
        stompClient = over(Sock)
        await stompClient.connect({}, onConncted, onError)
    }

    const onConncted = () => {
        setConnected(true)
        stompClient.subscribe('/topic/public', onMessageReceived)
        console.log("Connection succesful")
    }

    const onMessageReceived = (payload) => {
        // console.log("new message")
        if (payload) {
            let payloadData = JSON.parse(payload.body)
            if (payloadData != null) {
                setPosts(post => [payloadData, ...post])
                console.log(posts.length)
                setPosts((previousArr) => (previousArr.slice(0, -1)))   
            }
        }
    }
    const onError = (error) => {
        try {
            console.log(error)
        } catch {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("connectioned? : " + connected)
    }, connected)

    const getPosts = async () => {
        try {
            const response = await getLatestPosts();
            setPosts(response.data);
            setLoaded(true)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        connect();
        getPosts();
    }, []);

    return (
        <>{(connected === true && loaded === true) ? (
            < Suspense fallback={<div>Loading...</div>}>
                <AppNavbar isLobbyTv={true} />
                <div>
                    <Carousel autoPlay={true} interval={10000} animation={'slide'}>
                        {posts && posts.length > 0 ? (
                            posts.map((item, i) => <PostsCard key={i} post={item} />)
                        ) : (
                            <p>No posts available</p>
                        )}
                    </Carousel>
                </div>
                <QR />
            </Suspense>
        ) : (
            <>loading ...</>
        )
        }
        </>
    );
};

export default Lobby;
