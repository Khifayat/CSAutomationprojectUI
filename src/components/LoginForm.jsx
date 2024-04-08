import React, { useState } from 'react'
import '../css/Registration.css'
import UserFunctions from '../services/dbservices/userservices/UserFunctions'

function LoginForm(props) {

    let user = {
        userName: '',
        password: "",
    }

    const [userUserName, setUserUsername] = useState()
    const [userPassword, setUserPassword] = useState()

    const handleUserName = (e) => setUserUsername(e.target.value)
    const handlePassword = (e) => setUserPassword(e.target.value)

    async function handleSubmit(event) {
        event.preventDefault()
        user.userName = userUserName
        user.password = userPassword
        await UserFunctions.loginUser(user)
            .then((res) => {
                if(res != null){
                    if(res.data != null){
                        localStorage.setItem('user', JSON.stringify(res.data))
                        window.location.replace("/dashboard")
                    }else{
                        console.log(res)
                        alert("UserName and password combination not found")
                    }
                }
            })
            .catch(function (error) {
                if (error) {
                    console.log(error)
                    event.preventDefault()
                } else {
                    console.log("no errors")
                }
            })
    }

    return (
        <div className='container '>
            <div className='center'>
                <form className="center" onSubmit={handleSubmit}>
                    <h1>LOG IN</h1>
                    <div className="txt_field">
                        <input type='text' id='username' onChange={handleUserName} minLength={5} value={userUserName} required></input>
                        <label>UserName</label>
                    </div>
                    <div className="txt_field">
                        <input type='password' id='password' onChange={handlePassword} minLength={5} value={userPassword} required ></input>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <button type='submit' id='submit'>SUBMIT</button><br></br>
                    <button type="reset" id='reset'>CANCEL</button><br></br>
                    <div class="login_link">
                        Don't have an account? <a href="/regist">Register Here</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm