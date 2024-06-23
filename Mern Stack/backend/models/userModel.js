const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

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
  last_name: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  year: {
    type: String,
    enum: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Unknown'],
    required: true,
    default: 'Unknown'
  },
  programming_languages: [String],
  chat_room_map: [{project_id: String, room_num: String}],
}, { timestamps: true })

userSchema.pre('save', function(next) {
  // Sanitize strings
  this.first_name = this.first_name.replace(/<(?:.|\n)*?>/gm, '');
  this.last_name = this.last_name.replace(/<(?:.|\n)*?>/gm, '');
  next();
});


// static signup method
userSchema.statics.signup = async function(email, password, first_name, last_name, year) {

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
  const user = await this.create({ email, password: hash, first_name, last_name, year })


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
