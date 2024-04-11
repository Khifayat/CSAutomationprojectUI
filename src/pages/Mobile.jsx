import React, { useState, useEffect, Suspense } from "react";
import AppNavbar from "../components/AppNavbar";
import PostsCard from "../components/PostsCard";
import { getLatestPosts } from "../services/dbservices/postservices/PostFunctions";

function Mobile() {

    const [posts, setPosts] = useState(null)

    const getPosts = async () => {
        let response = await getLatestPosts()
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                console.log(error)
            })
        setPosts(response)
    }
    useEffect(() => {
        getPosts().then(r => { })
    }, [])
    return (
        <>
            <div style={{ width: "100%", height: "100%" }}>
                < Suspense fallback={<div>Loading...</div>}>
                    <AppNavbar isLobbyTv={false} />
                    {(posts == null) ?
                        (<>loading ...</>) :
                        (<>
                            {(posts.length > 0) ?
                                (<>
                                    {posts?.map((post) =>
                                        <PostsCard post={post} />)}
                                </>) :
                                (<>
                                    <h4>There are no available posts at this time, please come back later</h4>
                                </>)}

                        </>)
                    }
                </Suspense>
            </div>
        </>
    )
}

export default Mobile;