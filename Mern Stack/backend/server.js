require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const projectRoutes = require('./routes/projects')
const userRoutes = require('./routes/user')
const messageRoutes = require('./routes/message')
const cors = require("cors")
const http = require('http')
const { Server } = require('socket.io')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'DELETE'],
    },
  })

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`)

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })


    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

    socket.on("send_message", (data) => {

        console.log(data)
        socket.to(data.room).emit("receive_message", data)

    })
});

// routes
app.use('/api/projects', projectRoutes)
app.use('/api/user', userRoutes)
app.use('/api/message', messageRoutes)

mongoose.set('strictQuery', false);

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        server.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })