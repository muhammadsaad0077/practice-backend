require('dotenv').config();
const express = require('express')
const app = express();
const User = require('./Models/user')
const connectDB = require('./config/database');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const PORT = 3000;

connectDB();
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.post('/signup', async(req, res)=>{
    try{
       
        
    const {firstName, lastName, email, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        firstName, lastName, email, password: passwordHash
    })

    await user.save();
    res.send('User added sucessfully')
}
    catch(err){
        res.status(400).send(`Error: ${err.message}`)
    }
})

app.post('/login', async(req, res)=>{

    try{
    const {email, password} = req.body;

    const user = await User.findOne({email: email});
    if(!user){
        throw new Error('Email not valid')
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if(!isPassword){
        throw new Error('Password not valid')
    }

    else{
        const token = await user.getJWT();
        res.cookie('token', token)
        res.send('Sucessfully LoggedIn')

    }

    
}
catch(err){
    res.status(400).send(`Error: ${err.message}`)
}
})

app.get('/profile', async(req, res)=>{
    try{
    const {token} = req.cookies;
    if(!token){
        throw new Error('Invalid token')
    }

    const data = await jwt.verify(token, 'saad@123')
    const { id } = data;

    const user = await User.findById({_id: id});

    res.send(user);
    
}

    catch(err){
        res.status(400).send(`Error: ${err.message}`)
    }

})

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
})