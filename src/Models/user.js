const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 25
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        maxLength: 100,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }

    },
    password: {
        type: String
    }

}, {timestamps: true})

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({id: user._id}, 'saad@123')
    return token;
}

const userModel = mongoose.model('User', userSchema)
module.exports = userModel;