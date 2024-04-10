import React, { useState } from 'react'
import '../css/Registration.css'
import UserFunctions from '../services/dbservices/userservices/UserFunctions'

function RegistrationForm() {

    const user = {
        firstName: "",
        lastName: "",
        userName: '',
        password: "",
        email: ""
    }

    const [userFirstName, setUserFirstName] = useState()
    const [userLastName, setUserLastName] = useState()
    const [userUserName, setUserUsername] = useState()
    const [userPassword, setUserPassword] = useState()
    const [userEmail, setUserEmail] = useState()

    const handleUserName = (e) => setUserUsername(e.target.value)
    const handlefirstName = (e) => setUserFirstName(e.target.value)
    const handleLastName = (e) => setUserLastName(e.target.value)
    const handleEmail = (e) => setUserEmail(e.target.value)
    const handlePassword = (e) => setUserPassword(e.target.value)

    async function handleSubmit(event) {
        event.preventDefault()
        user.userName = userUserName
        user.email = userEmail
        user.firstName = userFirstName
        user.password = userPassword
        user.lastName = userLastName

        await UserFunctions.registerUser(user)
            .then((res) => {
                if (res != null) {
                    if (res.data != null) {
                        sessionStorage.setItem('user', JSON.stringify(res.data))
                        window.location.href ="/dashboard"
                    }else{
                        alert("username already exist")
                    }
                }
            })
            .catch(function (error) {
                if (error) {
                    alert(error.response.data.fieldErrors[0].defaultMessage)
                    event.preventDefault()
                } else {
                    console.log("no errors")
                }
            })
    }

    return (
        <div className='container '>
            <div className='center'>
                {/* <form className="center" onSubmit={(e) => dispatch(register(e))} onReset={(e) => dispatch(cancelregister(e))}> */}
                <form className="center" onSubmit={handleSubmit}>
                    <h1>REGISTER</h1>
                    <div className="txt_field">
                        <input type='text' id='username' onChange={handleUserName} minLength={5} value={userUserName} required></input>
                        <label>UserName</label>
                    </div>
                    <div className="txt_field">
                        <input type='text' id='firstName' onChange={handlefirstName} minLength={2} value={userFirstName} required ></input>
                        <label>First Name</label>
                    </div>
                    <div className="txt_field">
                        <input type='text' id='lastName' onChange={handleLastName} minLength={2} value={userLastName} required></input>
                        <span></span>
                        <label>Last Name</label>
                    </div>
                    <div className="txt_field">
                        <input required type='email' onChange={handleEmail} value={userEmail} />
                        <label>Email</label>
                    </div>
                    <div>

                    </div>
                    <div className="txt_field">
                        <input type='password' id='password' onChange={handlePassword} minLength={5} value={userPassword} required ></input>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <button type='submit' id='submit'>SUBMIT</button><br></br>
                    <button type="reset" id='reset'>CANCEL</button><br></br>
                    <div class="login_link">
                        Have an Account? <a href="/login">Login Here</a>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default RegistrationForm