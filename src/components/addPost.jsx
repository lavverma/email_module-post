import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import jwt from "jwt-decode"
import "../style/addPost.css"
const url = import.meta.env.VITE_SERVER_URL

const AddPost = () => {
    const navigate = useNavigate();
    const [logo, setLogo] = useState()

    const [post, setPost] = useState({
        caption :'',
        post : ''
    })

    const addLogo = (e)=>{
        console.log(e.target.files[0]);
        setLogo( e.target.files[0])
    }

    const createPost = (e)=>{
        const {name , value} = e.target
        setPost({
            ...post,
            [name] : value
        })
    }

    const token = localStorage.getItem("token")
    const userId = jwt(token).userId
    const postData  = async(e)=>{
        e.preventDefault()
       try{
        const formData = new FormData()
        formData.append("logo" , logo)
        formData.append('userId' , userId)
        formData.append('caption' , post.caption)
        formData.append('post' , post.post)

     const res =await axios.post(`${url}/createPost` ,formData, { headers: { authorization: `Bearer ${token}`, 'content-type' : 'multipart/form-data' }})
          alert("Post Successfully added")
          navigate('/allPost')
       }
       catch (err) {
        let error = err.response.data.message
         alert(error)
    }
    }

  return (
    <div>
        <form className='addPost'>
         <div className='text'>
            <h4> post logo</h4>
        <input type="file" name="logo" onChange={(e)=>addLogo(e)} />
         </div>
       <div className='text'>
        <h4>Write your Caption</h4>
       <input type="text" name="caption" value={post.caption} onChange={(e)=>createPost(e)} />
       </div>
        <div className='text'>
        <h4>Write your post</h4>
        <textarea type="text" name="post" value={post.post} onChange={(e)=>createPost(e)} />
        </div>
        <button onClick={(e)=>postData(e)}>Post</button>
        </form>
    </div>
  )
}

export default AddPost