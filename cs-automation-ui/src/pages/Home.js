import { useState } from "react";
import AppNavbar from "../components/AppNavbar";
import PostsCard from "../components/PostsCard";

const Home = () => {
  const [posts, setPosts] = useState([1,2,3,4,5,6,7,8,9,10])

  return(
      <>
      <div style={{ width:"100%", height:"100%"}}>
      <AppNavbar/>
      {posts.map((post)=>
      <PostsCard/>)}
      </div>
      </>
  )
}

export default Home;