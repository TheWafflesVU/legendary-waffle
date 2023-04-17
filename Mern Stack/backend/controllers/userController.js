const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const axios = require("axios")

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    console.log("error cathed");
    res.status(400).json({error: error.message})
  }
}

// delete a user
const deleteUser = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.delete(_id)
    res.status(200).json({ message: 'User deleted', user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// update a user
const updateUser = async (req, res) => {
  const { lastName, firstName, phoneNumber, year, languages, roles, socialInfo } = req.body;

  // Verify user is authenticated
  const { _id } = req.user;

  try {
    // Find user by ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only the provided fields
    if (lastName) user.lastName = lastName;
    if (firstName) user.firstName = firstName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (year) user.year = year;
    if (languages) user.languages = languages;
    if (roles) user.roles = roles;
    if (socialInfo) user.socialInfo = socialInfo;

    await user.save();

    const token = createToken(user._id)
    res.status(200).json({ email: user.email, token })

  } catch (err) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


// get a user
const getUser = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// update user's room info
const joinRoom = async (req, res) => {

  const { room_number } = req.body

  // Verify user is authenticated
  const { _id } = req.user

  try {
    // Find user by ID
    const user = await User.findById(_id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    } 

    // Update only the provided fields
    if (room_number && !user.rooms.includes(room_number)){
        user.rooms = [...user.rooms, room_number]
        await user.save()
        res.json({ message: 'User room stored on backend successfully' });
    
    } else {
      res.json({ message: 'You may have entered duplicate/invalid room number' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }

}

const getRoomNumber = async (req, res) => {
  // Verify user is authenticated

  const { _id } = req.user

  try {
    // Find user by ID
    const user = await User.findById(_id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    } 

    res.json(user.rooms)

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

const joinRoomByProject = async (req, res) => {
  // Verify user is authenticated

  const { _id } = req.user

  const { proj_id, author_email, proj_name } = req.body

  try {
    // Find user by ID
    const user = await User.findById(_id)

    // Find author by email
    const author = await User.findOne({email: author_email})

    console.log(author);

    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    } 

    if (!author) {
      return res.status(404).json({ message: 'author not found' })
    } 

    let curRoom = "N.A."
    for (let i = 0; i < user.project_room_map.length; ++i){
      if (user.project_room_map[i].project_id === proj_id){
        curRoom = user.project_room_map[i].room_num
        break
      }
    }
    console.log("\n" + curRoom + "\n")

    if (curRoom === "N.A."){

      const new_room = String(user.email) + '|' + String(proj_name) + '|' + String(author_email)
      user.rooms = [...user.rooms, new_room]
      user.project_room_map = [...user.project_room_map, {"project_id": proj_id, "room_num": new_room}]
      await user.save()

      author.rooms = [...author.rooms, new_room]
      author.project_room_map = [...author.project_room_map, {"project_id": proj_id, "room_num": new_room}]
      await author.save()
      
      res.json(new_room)

    } else {

      res.json(curRoom)

    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

const leaveRoom = async (req, res) => {
// Verify user is authenticated

const { _id } = req.user

try {
  // Find user by ID
  const user = await User.findById(_id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  } 

  const { room_num } = req.body

  console.log(user.email + " leaving room: " + room_num);

  user.rooms = user.rooms.filter((room) => room !== room_num)
  user.project_room_map = user.project_room_map.filter((project_room) => project_room.room_num !== room_num)
  await user.save()
  res.json({ message: 'Left room' + room_num })

} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
}
}

module.exports = { signupUser, loginUser, deleteUser, updateUser, joinRoom, getRoomNumber, getUser, joinRoomByProject, leaveRoom}

