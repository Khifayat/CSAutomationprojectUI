import httpmain from "../services/httpclientmain/httpmain"


//this is just a temporary file
const currentUser = () => {
    return httpmain.get(`/user/user/6610d2425c06327963ad0a8e`)
}

const user = {
    currentUser
}

export default user