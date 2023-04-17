const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "legendary.waffle@outlook.com",
    pass: "VUCS4278!",
  },
});

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    defaultValue: false
  },
  lastName: String,
  firstName: String,
  phoneNumber: String,
  year: String,
  languages: [String],
  roles: [String],
  rooms: [String],
  socialInfo: String,
  project_room_map: [{project_id: String, room_num: String}],
})

// static signup method
userSchema.statics.signup = async function(email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!email.endsWith('@vanderbilt.edu')) {
    throw Error('Email must be a valid Vanderbilt email address')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough. Password must contain a combination of uppercase letters, lowercase letters, numbers, and symbols.')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ email, password: hash })


  try {
        const emailToken = jwt.sign(
          {
            user: user._id,
          },
          process.env.SECRET,
          {
            expiresIn: '1d',
          },
        );

        const url = `http://localhost:3000/confirmation/${email}/${emailToken}`;

        await transporter.sendMail({
          to: email,
          subject: 'Confirm Email',
          html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
        });
      } catch (e) {
        console.log(e);
      }

  return user
}
 
// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  if (!user.confirmed) {
    throw Error('Please confirm your email to login')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

// static delete method
userSchema.statics.delete = async function(_id) {

  const user = await this.findByIdAndDelete({ _id });
  if (!user) {
    throw Error('User not found');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema)
