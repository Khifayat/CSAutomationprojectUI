import httpmain from "../../httpclientmain/httpmain";
const registerUser = (user) =>{
    return httpmain.post("/user/add",user, {

    })
}

const UserFunctions={
    registerUser
}

export default UserFunctions