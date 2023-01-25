const mongoose = require('mongoose')


const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


// Regex

const regexName = /^[a-zA-Z ]{2,30}$/

const regexEmail = /^\s*[a-zA-Z0-9]+([\.\-\_\+][a-zA-Z0-9]+)*@[a-zA-Z]+([\.\-\_][a-zA-Z]+)*(\.[a-zA-Z]{2,3})+\s*$/

const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/


module.exports = { isValidObjectId, regexName, regexEmail, regexPassword }
