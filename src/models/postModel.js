const mongoose = require("mongoose")
const objectId  = mongoose.Schema.Types.ObjectId

const postSchema = new mongoose.Schema({
    logoUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    userId : {
        type : objectId,
        ref : "User" ,
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, { timestamps: true })



module.exports = mongoose.model("Post", postSchema)