import React, { Suspense, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import postFunctions from '../services/dbservices/postservices/PostFunctions';
import Dashboard from '../components/Dashboard';
import PostForm from '../components/PostForm'
import EventForm from '../components/EventForm';
import AppNavbar from '../components/AppNavbar';

export default function UserDashboardPage() {
  useEffect(() => {
    getPosts()
  }, [])
  const [posts, setPosts] = useState([])
  let approvedPosts = []
  let deniedPosts = []
  let pendingPosts = []
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].status === "APPROVED") {
      approvedPosts.push(posts[i])
    } else if (posts[i].status === "PENDING") {
      pendingPosts.push(posts[i])
    } else {
      deniedPosts.push(posts[i])
    }
  }
  const loggedInUser = JSON.parse(sessionStorage.getItem("user"))
  const getPosts = async () => {
    if (loggedInUser && loggedInUser.role === "FACULTY") {
      console.log(loggedInUser.role)
      await postFunctions.getPostsBy(loggedInUser.userId)
        .then((res) => {
          if (res != null) {
            if (res.data != null) {
              console.log("got the data")
              setPosts(res.data)
            }
          }
        })
        .catch(function (error) {
          if (error) {
            console.log(error)
          }
        })
    } else if (loggedInUser && loggedInUser.role === "ADMIN") {
      await postFunctions.getPendingPosts()
        .then((res) => {
          if (res != null) {
            if (res.data != null) {
              console.log("got the admin data")
              setPosts(res.data)
            }
          }
        })
        .catch(function (error) {
          if (error) {
            console.log(error)
          }
        })
    }
  }

  return (
    <>
      <AppNavbar isLobbyTv={false} />
      < Suspense fallback={<div>Loading...</div>}>
        <div
          style={{
            background: "#154734",
            color: "#D29F13",
            textEmphasisColor: "#D29F13",
            maxWidth: "60%",
            margin: "0 auto",
            align: "left",
            alignSelf: "right",
            justifyContent: "right"
          }}>
          {(loggedInUser === null) ? (
            <h1 className='loginError' >  You must be logged in to view faculty dashboard</h1>
          ) : ((loggedInUser.role === "FACULTY") ? (
            <div
            >
              <div>
                <div style={{
                  float: "left"
                }}>
                  <PostForm />
                </div>
                <div style={{
                  float: "right"
                }}>
                  <EventForm />
                </div>
              </div>
              <div>
                <Tabs
                  defaultActiveKey="posts-approved"
                  id="justify-tab-example"
                  className="mb-3"
                  justify
                  style={{
                    background: "#154734",
                    color: "#D29F13",
                    textEmphasisColor: "#D29F13",
                    display: "flex",
                    maxWidth: "80%",
                    justifyContent: "center",
                    margin: "0 auto"
                  }}
                >
                  <Tab eventKey="posts-pending"
                    title="Pending Posts"
                  >
                    {pendingPosts?.map((post) =>
                      <Dashboard post={post} />)}

                  </Tab>
                  <Tab eventKey="posts-approved" title="Approved Posts">
                    {approvedPosts?.map((post) =>
                      <Dashboard post={post} />)}
                  </Tab>
                  <Tab eventKey="posts-denied" title="Denied Posts">
                    {deniedPosts?.map((post) =>
                      <Dashboard post={post} />)}
                  </Tab>
                </Tabs>
              </div>
            </div>
          ) : (
            <>{posts?.map((post) =>
              <Dashboard post={post} role={loggedInUser.role}
              />)}
            </>
          )
          )}
        </div>
      </Suspense>
    </>
  );
}