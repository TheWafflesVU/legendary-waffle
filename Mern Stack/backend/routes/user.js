const express = require('express')
const auth = require('../middleware/requireAuth')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

// controller functions
const { loginUser, signupUser, updateUser, deleteUser, joinRoom, getRoomNumber, getUser, joinRoomByProject, leaveRoom } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// update route
router.put('/:id', auth, updateUser)


router.post('/verifyEmailToken', async(req, res) => {
  User.findOne(
    {email: req.body.email}, function(err, result) {

      try {
        const decode = jwt.verify(req.body.emailToken, process.env.SECRET)
        console.log(decode)
        let f = User.updateOne({email: req.body.email}, {
          $set: {
            confirmed: true,
          }
        }).then(console.log('User Found and Modified Email Token'))
        return res.json({status: 'okay'})
      } catch (err){
        return res.json({status: 'error'})
      }
    })
})


const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "legendary.waffle@outlook.com",
    pass: "VUCS4278!",
  },
});

// send email Link For reset Password
router.post("/sendpasswordlink",async(req,res)=>{
  console.log(req.body)

  const {email} = req.body;

  if(!email){
      res.status(401).json({status:401,message:"Enter Your Email"})
  }

  try {
      const userfind = await User.findOne({email:email});

      // token generate for reset password
      const token = jwt.sign({_id: userfind._id},process.env.SECRET,{
          expiresIn:"1d"
      });


      if(userfind){
          const mailOptions = {
              to:email,
              subject:"Sending Email For password Reset",
              html:`This Link Valid For 1 day http://localhost:3000/forgotpassword/${userfind.email}/${token}`
          }
console.log('you are here ahahaha')
          transporter.sendMail(mailOptions,(error,info)=>{
              if(error){
                  console.log("error",error);
                  res.status(401).json({status:401,message:"email not sent"})
              }else{
                  console.log("Email sent",info.response);
                  res.status(201).json({status:201,message:"Email sent Successfully"})
              }
          })


      }

  } catch (error) {
      res.status(401).json({status:401,message:"invalid user"})
  }

});


// verify user for forgot password time
router.get("/forgotpassword/:email/:token",async(req,res)=>{
  const {email,token} = req.params;

  try {
      const validuser = await User.findOne({email:email});
      
      const verifyToken = jwt.verify(token,process.env.SECRET);

      if(validuser && verifyToken._id){

          res.status(201).json({status:201,validuser})
      }else{

          res.status(401).json({status:401,message:"user not exist"})
      }

  } catch (error) {

      res.status(401).json({status:401,error})
  }
});


// change password

router.post("/:email/:token",async(req,res)=>{
  const {email,token} = req.params;

  const {password} = req.body;

  try {
      const validuser = await User.findOne({email:email});
      
      const verifyToken = jwt.verify(token,process.env.SECRET);

      if(validuser && verifyToken._id){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        let f = User.updateOne({email: email}, {
          $set: {
            password: hash,
            confirmed: true
          }
        }).then(console.log('User Found and Modified password'))

        res.status(201).json({status:201,f})

      }else{
          res.status(401).json({status:401,message:"user does not exist"})
      }
  } catch (error) {

      res.status(401).json({status:401,error})
  }
})
// delete route
router.delete('/:email', auth, deleteUser)

// join room route
router.patch('/join_room', auth, joinRoom)

// Get all room number routes for a user
router.get('/room_num', auth, getRoomNumber)

// GET a user profile
router.get('/:id', auth, getUser)

// join room by project id
router.patch('/by_id', auth, joinRoomByProject)

// Leave room
router.patch('/leave', auth, leaveRoom)

module.exports = router