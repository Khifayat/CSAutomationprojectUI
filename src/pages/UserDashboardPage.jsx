import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AppNavbar from "../components/AppNavbar";
import {useEffect, useState} from "react";
import {getApprovedPosts, getLatestPosts} from "../services/dbservices/postservices/PostFunctions";
import PostsCard from "../components/PostsCard";

export default function UserDashboardPage(posts) {
  const [value, setValue] = useState('1');
  const [approvedPosts, setApprovedPosts] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [deniedPosts, setDeniedPosts] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getApproved = async()=>{
    let response = await getApprovedPosts()
        .then(function(response){
          return response.data
        })
        .catch(function(error){
          console.log(error)
        })
    setApprovedPosts(response)
  }

    // const getPending = async()=>{
    //     let response = await getApprovedPosts()
    //         .then(function(response){
    //             return response.data
    //         })
    //         .catch(function(error){
    //             console.log(error)
    //         })
    //     setApprovedPosts(response)
    // }
  useEffect(()=>{
    getApproved().then(r => {})
  }, [])
  return (
      <>
        <AppNavbar isLobbyTv={false}/>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Approved Posts" value="1" />
                <Tab label="Pending Posts" value="2" />
                <Tab label="Denied Posts" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {approvedPosts?.map((post)=>
                  <div>{post.title} </div>
                  // <PostsCard post = {post}/>
            )}
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </>

  );
}