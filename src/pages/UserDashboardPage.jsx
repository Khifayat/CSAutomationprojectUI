import React, { Suspense, useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import postFunctions from '../services/dbservices/postservices/PostFunctions';
import Dashboard from '../components/Dashboard';
import PostForm from '../components/PostForm';
import EventForm from '../components/EventForm';
import AppNavbar from '../components/AppNavbar';
import '../css/Dashboard.css';

export default function UserDashboardPage() {
  const [posts, setPosts] = useState([]);
  let approvedPosts = [];
  let deniedPosts = [];
  let pendingPosts = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].status === "APPROVED") {
      approvedPosts.push(posts[i]);
    } else if (posts[i].status === "PENDING") {
      pendingPosts.push(posts[i]);
    } else {
      deniedPosts.push(posts[i]);
    }
  }
  const pendingPostCount = pendingPosts.length;
  const loggedInUser = JSON.parse(sessionStorage.getItem("user"));

 
  const getPosts = async () => {
    if (loggedInUser && loggedInUser.role === "FACULTY") {
      const response = await postFunctions.getPostsBy(loggedInUser.userId);
      if (response && response.data) {
        setPosts(response.data);
      }
    } else if (loggedInUser && loggedInUser.role === "ADMIN") {
      const response = await postFunctions.getPendingPosts();
      if (response && response.data) {
        setPosts(response.data);
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, []); 

  return (
    <>
      <AppNavbar isLobbyTv={false} />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="dashboardContainer">
          {!loggedInUser ? (
            <h1 className='loginError'>You must be logged in to view this dashboard</h1>
          ) : loggedInUser.role === "FACULTY" ? (
            <FacultyView approvedPosts={approvedPosts} deniedPosts={deniedPosts} pendingPosts={pendingPosts} />
          ) : (
            <AdminView pendingPostCount={pendingPostCount} posts={pendingPosts} />
          )}
        </div>
      </Suspense>
    </>
  );
}

function FacultyView({ approvedPosts, deniedPosts, pendingPosts }) {
  return (
    <div>
      <div style={{ float: "left" }}>
        <PostForm />
      </div>
      <div style={{ float: "right" }}>
        <EventForm />
      </div>
      <Tabs defaultActiveKey="posts-approved" id="justify-tab-example" className="mb-3" justify style={{ background: "#154734", color: "#D29F13", display: "flex", maxWidth: "80%", justifyContent: "center", margin: "0 auto" }}>
        <Tab eventKey="posts-pending" title={`Pending Posts (${pendingPosts.length})`}>
          {pendingPosts.length > 0 ? pendingPosts.map(post => <Dashboard key={post.id} post={post} />) : <h1 className='noPostsMessage'>No pending posts to display.</h1>}
        </Tab>
        <Tab eventKey="posts-approved" title={`Approved Posts (${approvedPosts.length})`}>
          {approvedPosts.length > 0 ? approvedPosts.map(post => <Dashboard key={post.id} post={post} />) : <h1 className='noPostsMessage'>No approved posts to display.</h1>}
        </Tab>
        <Tab eventKey="posts-denied" title={`Denied Posts (${deniedPosts.length})`}>
          {deniedPosts.length > 0 ? deniedPosts.map(post => <Dashboard key={post.id} post={post} />) : <h1 className='noPostsMessage'>No denied posts to display.</h1>}
        </Tab>
      </Tabs>
    </div>
  );
}

function AdminView({ pendingPostCount, posts }) {
  return (
    <>
      <h1>Pending Posts ({pendingPostCount})</h1>
      {posts.length > 0 ? posts.map(post => <Dashboard key={post.id} post={post} role="ADMIN" />) : <h1>No pending posts to display.</h1>}
    </>
  );
}