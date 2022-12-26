import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../style/signUp.css"

const url = import.meta.env.VITE_SERVER_URL 

function SignUp() {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: ""
    })

    const handler = (e) => {
        const { name, value } = e.target
        setDetails({
            ...details,
            [name]: value
        })
    }

    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${url}/signUp`, details)

            alert("you are successfully registered")

            navigate('/login')

        } catch (error) {
            alert(error.response.data.message)
        }
    }



    return (
        <div className="App">
            <div className='signUp'>
                <h2>SignUp</h2>
                <h4>First Name</h4>
                <input
                    type="text"
                    name='fname'
                    value={details.fname}
                    onChange={(e) => handler(e)} />
                <h4>Last Name</h4>
                <input
                    type="text"
                    name='lname'
                    value={details.lname}
                    onChange={(e) => handler(e)} />
                <h4>Phone</h4>
                <input
                    type="text"
                    name='phone'
                    value={details.phone}
                    placeholder='8X7XXXX2X4'
                    onChange={(e) => handler(e)} />
                <h4>Email</h4>
                <input
                    type="email"
                    name='email'
                    value={details.email}
                    placeholder='abc@gmail.com'
                    onChange={(e) => handler(e)} />
                <h4>Password</h4>
                <input
                    type="password"
                    name='password'
                    value={details.password}
                    onChange={(e) => handler(e)} />
                <button onClick={(e) => register(e)}>Register</button>
            <h4>Already Registered ?..
                <Link to={'/login'}>Login</Link>
            </h4>
            </div>
        </div>
    )
}

export default SignUp
