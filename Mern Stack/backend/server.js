require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const projectRoutes = require('./routes/projects')
const userRoutes = require('./routes/user')
const cors = require("cors")

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/confirmation/:token', async (req, res) => {
    try {
      const { user: { id } } = jwt.verify(req.params.token, process.env.SECRET); // ask
      await models.User.update({ confirmed: true }, { where: { id } });
    } catch (e) {
      res.send('error');
    }
  
    return res.redirect('http://localhost:3000/login');
  });

// routes
app.use('/api/projects', projectRoutes)
app.use('/api/user', userRoutes)

mongoose.set('strictQuery', false);

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })