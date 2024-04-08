import { useState, useEffect } from "react";
import AppNavbar from "../components/AppNavbar";
import PostsCard from "../components/PostsCard";
import {getLatestPosts} from "../services/dbservices/postservices/PostFunctions";

function Mobile() {

    const [posts, setPosts] = useState([])

  const getPosts = async()=>{
      let response = await getLatestPosts()
                        .then(function(response){
                            return response.data
                        })
                        .catch(function(error){
                            console.log(error)
                        })
      setPosts(response)
  }
  useEffect(()=>{
      getPosts().then(r => {})
  }, [])
  return(
      <>
      <div style={{ width:"100%", height:"100%"}}>
      <AppNavbar isLobbyTv={false}/>
      {posts?.map((post)=>
      <PostsCard post = {post}/>)}
      </div>
      </>
  )
}

export default Mobile;