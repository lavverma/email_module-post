import React, { useEffect, useState } from 'react'
import axios from "axios"
import jwt  from"jwt-decode"
import { Link } from 'react-router-dom'
import "../style/allPost.css"

const url = import.meta.env.VITE_SERVER_URL

const AllPost = () => {
    const [allPosts, setAllPosts] = useState([])

    const token = localStorage.getItem("token")
    const userId = jwt(token).userId
    const fetchAllPost = async ()=>{
    try{
      const res =await axios.get(`${url}/getAllPost`, { headers: { authorization: `Bearer ${token}`} })
      const allPosts = res.data.data;
      setAllPosts([...allPosts])
    }
    catch (err) {
      let error = err.response.data.message
      if (error == "jwt expired" ||  "token must be present") {
        navigate('/login')
    } else alert(error)
  }
    }

    useEffect(()=>{
       fetchAllPost()
    },[])
    
  return (
    <div>
        <Link to={`/addPost`} className="btn">
        <button>Add A Post</button>
        </Link>
        <Link to={`/profileUpdate/${userId}`} className="btn">
        <button>Your Profile</button>
        </Link>
        <h1>All Post</h1>
      {
        allPosts.map(({_id ,logoUrl, caption, userId})=>(
            <Link to={`/postDetails/${_id}`} key={_id} className="allPost">
             <img src={`${logoUrl}`} />
              <div className='cap'>
                 {caption}<br/>Author:- {`${userId.fname} ${userId.lname}`}
                </div>
            </Link>
        ))
      }
    </div>
  )
}

export default AllPost