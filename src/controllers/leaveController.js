const leaveModel = require("../models/leaveModel")
const moment = require("moment")
const { isValidObjectId } = require('../validators/validator')

const createLeaveDoc= async function (req, res) {
    try {
        let data = req.body
        const { from, to, userId } = data

        if(!from){
            return res.status(400).send({ status: false, message: 'please provide from date' })
        }
        isValidDate = moment(from, 'YYYY-MM-DD', true).isValid()
        if (!isValidDate) return res.status(400).send({ status: false, message: "please write correct Date, and format of date  - YYYY-MM-DD" })


        if(!to){
            return res.status(400).send({ status: false, message: 'please provide to date' })
        }
        isValidDate = moment(to, 'YYYY-MM-DD', true).isValid()
        if (!isValidDate) return res.status(400).send({ status: false, message: "please write correct Date, and format of date  - YYYY-MM-DD" })


        if (!userId) { return res.status(404).send({ status: false, message: "Not a valid user Id" }) }
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "userId is invalid" })
  
        let leaveApplication = await leaveModel.create(data)
        return res.status(201).send({ status: true, message: "Leave Application created successfully", data: leaveApplication })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}



const getLeaves = async function(req,res){
    try{
        let Leaves = await leaveModel.find().populate("userId")
        let dateWiseLeaves = Leaves.sort(function(a,b){
            return new Date(a.from) - new Date(b.from);
          });
        return res.status(200).send({status:true,message:"All Leave Applications", data:dateWiseLeaves})

    }catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}



module.exports = { createLeaveDoc,getLeaves }