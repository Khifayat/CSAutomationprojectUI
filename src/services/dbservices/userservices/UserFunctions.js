import httpmain from "../../httpclientmain/httpmain";
const registerUser = (user) =>{
    return httpmain.post("/user/add",user, {
    })
}
const loginUser = (user) =>{
    return httpmain.post("/user/login",user, {
    })
}

const UserFunctions={
    registerUser, loginUser
}

export default UserFunctions