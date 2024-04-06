import httpClient from "../../httpclientmain/httpmain"

const getAllPosts = () => {
    return httpClient.get(`/post/all`)
}

const getApprovedPosts = () =>{
    return httpClient.get(`/post/approved`)
}

const getPostById = postId =>{
    return httpClient.get(`/post/${postId}`)
}

export const getLatestPosts = () => {
    return httpClient.get(`/post/latest`)
}

const addPost = (post, authorId) => {
    return httpClient.post("/post/add", post, {URLSearchParams: authorId} )
}

const updateStatus = (postId, statusString) => {
    return httpClient.put(`/post/update`, postId, statusString)
}

const deletePost = postId => {
    return httpClient.delete(`/post/delete`, postId)
}

const postFunctions = {
    addPost, deletePost, updateStatus, getLatestPosts, getPostById, getAllPosts, getApprovedPosts
}


export default postFunctions