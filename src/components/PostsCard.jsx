import * as React from 'react';

const PostsCard = ({post}) =>{  
  console.log(post.title)
    return (
      
        <div style={{backgroundColor:"#c8c9c7", border:"solid #D29F13", minHeight:"600px", height:"600px"}} class="card shadow p-3 ml-1">
        <div class="card-body">
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p align = "right">{post.creationDateTime.substring(0, 10)}</p>
          {/*<p>{post.creationDate}</p>*/}
        </div>
      </div>
  );
}

export default PostsCard;