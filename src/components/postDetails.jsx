import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import "../style/postDetails.css"

const url = import.meta.env.VITE_SERVER_URL
const PostDetails = () => {
    const [postDetails, setPostDetails] = useState({})
    const [fetchedPost, setFetchedPost] = useState({})
    const postIdJson = useParams()
    const postIdObj = JSON.parse(JSON.stringify(postIdJson))
    const postId = postIdObj.postId
    console.log(postId);

    const token = localStorage.getItem("token")
    const postData = async (postId)=>{
    try{
    const res  = await axios.get(`${url}/getPost/${postId}` , { headers: { authorization: `Bearer ${token}`} })
    const post = JSON.parse(JSON.stringify(res.data.data))
   const arr = Object.entries(post.userId)
   setPostDetails({...post})
   setFetchedPost({
    fName : arr[1][1],
    lName : arr[2][1]
   })
   console.log(arr);
    }
    catch (err) {
      let error = err.response.data.message
      if (error == "jwt expired" ||  "token must be present") {
        navigate('/login')
    } else alert(error)
  }
    }

    useEffect(()=>{
      postData(postId)
    },[])

  return (
    <div >
        <h2>PostDetails</h2>
        <div className='postDetails'>
        <img src={`${postDetails.logoUrl}`} />
        <h3>Caption:- {postDetails.caption}</h3>
        <p>POST:- {postDetails.post}</p>
         <h4>Author:- {fetchedPost.fName} {fetchedPost.lName}</h4>
        </div>
    </div>
  )
}

export default PostDetails