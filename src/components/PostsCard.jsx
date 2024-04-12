import React from 'react';
import '../css/PostCard.css'; 

const PostsCard = ({ post }) => {
  return (
    <div className="card shadow p-3 ml-1">
      <div className="card-body">
        <h3>{post.title}</h3>
        {post.imgURL && <img src={post.imgURL} alt="Post" />} {/* Render image if imageUrl exists */}
        <p className="description">{post.description}</p>
        <p align="right">{post.creationDateTime.substring(0, 10)}</p>
      </div>
    </div>
  );
}

export default PostsCard;