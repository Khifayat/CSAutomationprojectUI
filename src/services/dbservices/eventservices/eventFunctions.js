import httpClient from "../../httpclientmain/httpmain"
export const addEvent = (event, authorId) =>{
    return httpClient.post('/event/add', event, {params:{
        authorId
    }})
}