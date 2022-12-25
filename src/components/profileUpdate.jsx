import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const url = import.meta.env.VITE_SERVER_URL
const ProfileUpdate = () => {
    
  const navigate = useNavigate();
    const [details, setDetails] = useState({
        fname: "",
        lname: "",
        phone: ""
    })

    const userIdJson = useParams()
    const userIdObj = JSON.parse(JSON.stringify(userIdJson))
    const userId = userIdObj.userId

    const token = localStorage.getItem("token")
    const fetchUserData = async(userId)=>{
       try{
        const res = await axios.get(`${url}/getUser/${userId}` , { headers: { authorization: `Bearer ${token}`} })
        const fetchedUserData = res.data.data
        setDetails({...fetchedUserData})
       }
       catch(err){
        alert(err.response.data.message)
        }
    }

    const handler = (e)=>{
    const {name , value} = e.target
    setDetails({
        ...details,
        [name] : value
    })
    }

    const updateData = async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.put(`${url}/updateUserData/${userId}` ,details , { headers: { authorization: `Bearer ${token}`} })
            alert("Profile successfully updated")
            navigate('/allPost')
           }
           catch (err) {
            let error = err.response.data.message
            if (error == "jwt expired" ||  "token must be present") {
              navigate('/login')
          } else alert(error)
        }
    }

    useEffect(()=>{
       fetchUserData(userId)
    },[])
    
    return (
        <div className="App">
        <form className='signUp'>
            <h2>Your Profile</h2>
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
                <div>
            <button onClick={(e) => updateData(e)}>Update</button>
                </div>
                <Link to={`/allPost`}>
                    <button>Back To post</button>
                </Link>
        </form>
    </div>
  )
}

export default ProfileUpdate