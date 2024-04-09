import * as React from 'react';
import Button from 'react-bootstrap/Button';
import postFunctions from '../services/dbservices/postservices/PostFunctions';

function Dashboard({ post, role }) {

  async function handStatusChange(event) {
    let statusString = event.target.value
    // console.log(statusString)
    // console.log(post.id)
    await postFunctions.updateStatus(post.id, statusString)
      .catch(function(error){
        console.log(error)
      })
    window.location.reload()
  }

  return (
    <div style={{ backgroundColor: "#c8c9c7", border: "solid #D29F13", minHeight: "500px" }} class="card shadow p-3 ml-1">
      <div class="card-body">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <p align="right">{post.creationDateTime.substring(0, 10)}</p>
        <p>{(role === "ADMIN") ? (
          <h1 align="right">
            <Button variant="outline-danger" value={"DENIED"} onClick={handStatusChange}>Decline</Button>{' '}
            <Button variant="outline-success"value={"APPROVED"} onClick={handStatusChange}>Accept</Button>{' '}
          </h1>
        ) : (<h1></h1>)}</p>
        {/*<p>{post.creationDate}</p>*/}
      </div>
    </div>
  );
}

export default Dashboard;