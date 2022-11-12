const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = process.env.port || 8080
const authRoute = require('./routes/auth-route')
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(
   "mongodb+srv://samyuktap03:sam03sam@cluster0.t1drxuq.mongodb.net/userData",
   (err) => {
    if(err) {
        console.log("DB not connected");
        console.log(err)
    }
    else {
        console.log("DB connected ");
    }
   }
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use('/auth',authRoute);
app.get('/' ,(req,res) =>{

    res.send("MY WORLD ")
})
app.listen(port, () => {
    console.log("Server connected to port :",port )
})
