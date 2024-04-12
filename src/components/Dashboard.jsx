import * as React from 'react';
import Button from 'react-bootstrap/Button';
import postFunctions from '../services/dbservices/postservices/PostFunctions';

import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { useState, useEffect } from 'react';

let stompClient

function Dashboard({post, role }) {
  const [connected, setConnected] = useState(null);
  async function handStatusChange(event) {
    let statusString = event.target.value
    await postFunctions.updateStatus(post.id, statusString)
      .catch(function (error) {
        console.log(error)
      })
      if(statusString === 'APPROVED'){
        console.log("sending ... ")
        sendValue()
      }
    window.location.reload()
  }

  useEffect(()=>{
    connect()
  }, [])

  async function connect() {
    if (role === 'ADMIN') {
      let Sock = new SockJS('http://localhost:8080/websocket')
      stompClient = over(Sock)
      await stompClient.connect({}, onConncted, onError)
    }
  }

  const onError = (error) => {
    try {
      console.log(error)
    } catch {
      console.log(error)
    }
  }
  const onConncted = () => {
    setConnected(true)
    stompClient.subscribe('/topic/public', onMessageReceived)
    console.log("Connection succesful")
  }
  const onMessageReceived = (payload) => {
    console.log("message has been received" + payload.data)
    
  }
  const sendValue = () => {
    if (stompClient && connected){
      post.author = null
      post.status = 'APPROVED'
      console.log("sending " + JSON.stringify(post) +  "over websocket")
      stompClient.send("/app/post.send", {}, JSON.stringify(post))
    }
  }

  return (
    <div style={{ backgroundColor: "#c8c9c7", border: "solid #D29F13", minHeight: "500px" }} class="card shadow p-3 ml-1">
      <div class="card-body">
        <h3>{post.title}</h3>
        {post.imgURL && <img src={post.imgURL} alt="Post" />} {/* Render image if imageUrl exists */}
        <p>{post.description}</p>
        <p align="right">{post.creationDateTime.substring(0, 10)}</p>
        <p>{(role === "ADMIN") ? (
          <h1 align="right">
            <Button variant="outline-danger" value={"DENIED"} onClick={handStatusChange}>Decline</Button>{' '}
            <Button variant="outline-success" value={"APPROVED"} onClick={handStatusChange}>Accept</Button>{' '}
          </h1>
        ) : (<></>)}</p>
        {/*<p>{post.creationDate}</p>*/}
      </div>
    </div>
  );
}

export default Dashboard;