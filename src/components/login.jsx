import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const url = import.meta.env.VITE_SERVER_URL

const Login = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        email: "",
        password: ""
    })

    const loginCredentials = (e) => {
        const { name, value } = e.target
        setDetails({
            ...details,
            [name]: value
        })
    }

    const logged = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`${url}/login`, details)
            alert('You are successfully login')
            const token = res.data.data.token
            localStorage.setItem('token', token)
            navigate('/AllPost')

        } catch (err) {
            let error = err.response.data.message
            if (error == "User Not Found") {
                alert('Your are not Registered yet..Please SignUp')
                navigate('/')
            }
            else alert(error)
        }
    }

    return (
        <div className="App">
          <div className="signUp">
          <h3>Login</h3>
            <div>
                <h4>Email</h4>
                <input
                    type={"email"}
                    name='email'
                    placeholder='abc@gmail.com'
                    value={details.email}
                    onChange={(e) => loginCredentials(e)} />
            </div>
            <div>
                <h4>Password</h4>
                <input
                    type={"password"}
                    name='password'
                    value={details.password}
                    onChange={(e) => loginCredentials(e)} />
            </div>
            <button onClick={(e) => logged(e)}>Login</button>
            <h4>New User? Please..
                <Link to={'/'}>Register</Link>
            </h4>
          </div>
        </div>
    )
}

export default Login