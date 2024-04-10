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
        if (payload) {
            let payloadData = JSON.parse(payload.body)
            if (payloadData.title != null) {
                setPosts([...payloadData])
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
        connect();
    }, []);

    return (
        <>{(connected === true) ? (
            
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
            <>awaiting connection with websocket</>
        )
        }
        </>
    );
};

export default Lobby;
