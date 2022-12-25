const express = require("express")
const router = express.Router()
const {authentication, authorization}  = require("../middleware/auth")
const {createUser , loginUser , getUser , updateUserData} = require("../controllers/userController")
const {createPost , getAllPost , getPostById} = require("../controllers/postController")


//=============================== User Apis =======================================================
router.post("/signUp", createUser )
router.post("/login", loginUser )
router.get("/getUser/:userId", authentication, authorization, getUser)
router.put("/updateUserData/:userId", authentication, authorization, updateUserData)

//=============================== Post Apis =======================================================
router.post("/createPost" ,authentication, createPost )
router.get("/getAllPost" ,authentication, getAllPost )
router.get("/getPost/:postId" ,authentication, getPostById )




module.exports = router