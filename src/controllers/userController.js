const { isValidRequest,
    isValidString,
    isValidName,
    isValidMail,
    isValidPhone,
    isValidPassword} = require("../validator/validation")

const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



//============================== New User Create ==================================================
const createUser = async function(req, res) {
    try {
        const data = req.body

        if (!isValidRequest(data)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter valid Input" });
        }

        let { fname, lname, email, phone, password } = data;

        fname = fname.trim()
        if (!isValidString(fname) || !isValidName(fname)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter first name in proper format" });
        }

        lname = lname.trim()
        if (!isValidString(lname) || !isValidName(lname)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter Last name in proper format" });
        }

        email = email.trim();
        if (!isValidString(email) || !isValidMail(email)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter email in proper format" });
        }

        const isDuplicateEmail = await userModel.findOne({ email : email });
        if (isDuplicateEmail) {
            return res
                .status(409)
                .send({ status: false, message: `emailId already in use` });
        }

        if (!isValidString(phone) || !isValidPhone(phone)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter phone in valid format" });
        }

        let PhoneNo = await userModel.findOne({phone : phone });

        if (PhoneNo) {
            return res
                .status(409)
                .send({ status: false, message: `Phone number already in use` });
        }

        if (!isValidString(password) || !isValidPassword(password)) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "Password should contain min 8 and max 15 character with a number and a special character",
                });
        }

        //Create Encrypting password
        const encryptPassword = await bcrypt.hash(password, 10);
        data.password = encryptPassword

        const newUser = await userModel.create(data)
        return res
            .status(201)
            .send({ status: true, message: "User created successfully", data: newUser });

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



//============================== User Login =================================================
const loginUser = async function (req, res) {
    try {
      if (!isValidRequest(req.body)) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide login details" });
      }
      let { email, password } = req.body;
  
      // validating the email
      email = email.trim();
        if (!isValidString(email) || !isValidMail(email)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter email in proper format" });
        }
  
      // validating the password
      if (!isValidString(password) || !isValidPassword(password)) {
        return res
            .status(400)
            .send({
                status: false,
                message: "Password should contain min 8 and max 15 character with a number and a special character",
            });
    }
  
      let user = await userModel.findOne({email});
  
      if (!user)
        return res.status(404).send({
          status: false,
          message: "User Not Found",
        });

        //password verification
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return res
          .status(400)
          .send({ status: false, message: "Entered Password is incorrect" });
      }
  
      // JWT creation
      let token = jwt.sign(
        {
          userId: user._id.toString(),
        },
        process.env.JWT_SECRET_KEY,
        // { expiresIn: "4" }
      );
      return res
        .status(200)
        .send({
          status: true,
          message: "User login successful",
          data: { userId: user._id, token: token },
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, message: error.message });
    }
  };


//======================== GET USER PROFILE ==================================================
const getUser = async function (req, res) {
    try {
      const userFound = await userModel.findOne({ _id: req.user._id });
      if (!userFound) {
        return res.status(404).send({ status: false, message: "No userFound" });
      }
      return res
        .status(200)
        .send({ status: true, message: "User profile details", data: userFound });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, message: error.message });
    }
  };


  //========================== Update User Data =================================================
  const updateUserData = async function(req, res){
   try {

    const data = req.body

    let { fname, lname, phone} =  data;

   //Validation of first name if present
    if (fname) {
      if (!isValidString(fname) || !isValidName(fname)) {
        return res
          .status(400)
          .send({
            status: false,
            message: "Enter first name in proper format",
          });
      }
    }

    //Validation of last name if present
    if (lname) {
      if (!isValidString(lname) || !isValidName(lname)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter Last name in proper format" });
      }
    }

    if(phone){
        if (!isValidString(phone) || !isValidPhone(phone)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter phone in valid format" });
        }
    }

    const updatedUser = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        data,
        { new: true }
      );
      return res
        .status(200)
        .send({ status: true, message: "User profile updated", data: updatedUser });
    
   }
   catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message });
  }
  }


  module.exports = {createUser , loginUser , getUser , updateUserData}