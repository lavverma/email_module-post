require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const route = require("./routes/route")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const fileUpload = require("express-fileupload");
const app = express()

const { DATA_BASE_CLUSTER_LINK, PORT } = process.env

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())


app.use("/logo", express.static(path.join(__dirname, 'upload', 'images')))


app.use(fileUpload({
  // useTempFiles: true,
  // tempFileDir: path.join(__dirname, 'tmp'),
  createParentPath: true,
  limits: { fileSize: 2 * 1024 * 1024 }
}));

// MongoDB connection
mongoose.set('strictQuery', true)
mongoose.connect(DATA_BASE_CLUSTER_LINK, {
  useNewUrlParser: true
})
  .then(() => console.log(`MongoDB is connected`))
  .catch(err => console.log(err))

app.use("/", route)

// Server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})