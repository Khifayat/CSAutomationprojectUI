import httpClient from "../../httpclientmain/httpmain"

export const getAllPosts = () => {
    return httpClient.get(`/post/all`)
}

export const getApprovedPosts = () =>{
    return httpClient.get(`/post/approved`)
}

const getPostById = postId =>{
    return httpClient.get(`/post/${postId}`)
}

const getPendingPosts= () => {
    return httpClient.get("/post/pending")
}

export const getLatestPosts = () => {
    return httpClient.get(`/post/latest`)
}

const addPost = (post, authorId) => {
    return httpClient.post("/post/add", post, {params:{
        authorId
    }} )
}

const updateStatus = (postId, statusString) => {
    return httpClient.put(`/post/update`, postId, statusString)
}

const deletePost = postId => {
    return httpClient.delete(`/post/delete`, postId)
}

const getPostsBy = authorId =>{
    return httpClient.get(`/post/by/${authorId}`)
}

const postFunctions = {
    addPost, deletePost, updateStatus, getLatestPosts, getPostById, getAllPosts, getApprovedPosts, getPostsBy, getPendingPosts
}


export default postFunctions