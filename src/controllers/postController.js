const { isValidRequest,
  isValidString,
  isValidId } = require("../validator/validation")

const postModel = require("../models/postModel")

const path = require("path")

//=========================== Add A new Post =============================================================
const createPost = async function (req, res) {
  try {
    const data = req.body
    if (!isValidRequest(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid input" });
    }
    const { caption, post, userId } = data

    //Validations
    if (!isValidString(caption)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter caption in valid format" });
    }
    if (!isValidString(post)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter post in valid format" });
    }
    if (!isValidId(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "Give correct UserId" })
    }

    // Logo file upload
    const logo = req.files.logo;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({ status: false, message: 'No files were uploaded.' });
    }
    let logoName = new Date().getTime().toString() + path.extname(logo.name)
    const newPath = path.join(__dirname, '../', 'upload', 'images', logoName)
    if (logo.truncated) {
      return res.status(400).send({ status: false, message: "file size is too large" })
    }
    if (logo.mimetype.split("/")[0] !== "image") {
      return res.status(400).send({ status: false, message: 'Accept only images' })
    }

    await logo.mv(newPath)
    const logoUrl = `${process.env.SERVER_URL}/logo/${logoName}`
    data.logoUrl = logoUrl


    // new Document create
    const postData = await postModel.create(data)
    return res.status(201).send({ status: true, data: postData })

  }
  catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, message: err.message })
  }
}

//========================= Fetch All the Posts ==============================================
const getAllPost = async function (req, res) {
  try {
    const allPost = await postModel.find({ isDeleted: false }).populate("userId")
    return res.status(200).send({ status: true, data: allPost })
  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}


//======================= Get Post By PostId ======================================

const getPostById = async function (req, res) {
  try {
    const postId = req.params.postId
    if (!isValidId(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid postId" });
    }
    const postData = await postModel.findOne({ _id: postId, isDeleted: false }).populate("userId")
    return res.status(200).send({ status: true, data: postData })
  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}


module.exports = { createPost, getAllPost, getPostById }