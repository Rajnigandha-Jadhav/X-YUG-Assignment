const adminModel = require('../models/adminModel')
const userModel = require('../models/userModel')
const leaveModel = require("../models/leaveModel")
const jwt = require("jsonwebtoken")
const { regexName,  regexEmail, regexPassword, isValidObjectId } = require('../validators/validator')

const createAdmin= async function (req, res) {
    try {
        let data = req.body
        const { firstName, lastName, email, password } = data
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "please provide something to create user" })
        }

        if (!firstName) {
            return res.status(400).send({ status: false, message: "please provide fname" })
        }
        if (!regexName.test(firstName)) {
            return res.status(400).send({ status: false, message: "please provide valid name " })
        }

        if (!lastName) {
            return res.status(400).send({ status: false, message: "please provide fname" })
        }
        if (!regexName.test(lastName)) {
            return res.status(400).send({ status: false, message: "please provide valid name " })
        }

        
        if (!email) {
            return res.status(400).send({ status: false, message: "please provide email" })
        }
        if (!regexEmail.test(email)) {
            return res.status(400).send({ status: false, message: "please provide valid email" })
        }
        
        if (!password) {
            return res.status(400).send({ status: false, message: "please provide password" })
        }
        if (!regexPassword.test(password)) {
            return res.status(400).send({ status: false, message: "please provide valid password" })
        }
        
        
        let adminData = await adminModel.create(data)
        return res.status(201).send({ status: true, message: "admin created successfully", data: adminData })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}



const adminLogin = async function (req, res) {
    try {
        const data = req.body
        const { email, password } = data

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "body should not be empty" })
        }

        if (!email) {
            return res.status(400).send({ status: false, message: 'please provide email' })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: 'please provide password' })
        }

        let admin = await adminModel.findOne({ email:email, password:password })
        if (!admin) {
            return res.status(400).send({ status: false, message: 'email or password does not exist' })
        }
        let token = jwt.sign({
            adminId: admin._id,

        }, 'Node.js_Task',
            { expiresIn: "5hr" })


        let obj = { adminId: admin._id, token: token }
        
        res.status(201).send({ status: true, message: 'log in successfully', data:obj})


    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}




const leavePost = async function (req,res){
    try{
        let userId = req.params.userId
        if (!userId) {
            return res.status(400).send({ status: false, message: "please provide userId" })
        }
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "userId is invalid" })

        let user = await userModel.findById(userId)
        if(!user){
            return res.status(404).send({ status: false, message: 'user does not exist' })
        }

        let userLeaveApplication = await leaveModel.findOne({userId:userId})
        if(!userLeaveApplication){
            return res.status(404).send({ status: false, message: 'user has not applied for any Leave' })
        }

        if(!req.adminId == req.params.adminId){
            return res.status(400).send({ status: false, message: 'Unauthorized person' })
        }

        let statusUpdate = await leaveModel.findOneAndUpdate({userId:userId}, {$set:{status:"Approved"}}, {new:true})
        return res.status(200).send({status:true, message:"Leave Application Approved", data:statusUpdate})

    }catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }

}


module.exports = {createAdmin,adminLogin,leavePost}