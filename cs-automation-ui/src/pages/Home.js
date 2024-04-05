import { useState, useEffect } from "react";
import AppNavbar from "../components/AppNavbar";
import PostsCard from "../components/PostsCard";
import httpmain from "../services/httpclientmain/httpmain"

function Home(){

  const [posts, setPosts] = useState([])

  const getPosts = async()=>{
      const response = await httpmain.get('/approved')
      setPosts(response.data)
  }
  useEffect(()=>{
      getPosts()
  }, [])
  return(
      <>
      <div style={{ width:"100%", height:"100%"}}>
      <AppNavbar/>
      {posts?.map((post)=>
      <PostsCard post = {post}/>)}
      </div>
      </>
  )
}

export default Home;