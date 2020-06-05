const express = require('express');
const path = require('path');
const bodyParser =require('body-parser');
const cors =require('cors');
const passport =require('passport');
const mongoose =require('mongoose');

const config = require('./config/database')
mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log("Connected"+config.database);
})

mongoose.connection.on('error',(err)=>{
    console.log("errrrr"+err);
})
const app =express();
const users= require('./routes/users');
const port = 3000;
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/users',users);
 

app.get('/', (req,res) => {
    res.send("Invalid endpoint");

});

app.listen(port, () => {
    console.log("App listen");

});