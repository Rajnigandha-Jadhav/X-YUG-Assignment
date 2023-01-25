const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const leaveController = require('../controllers/leaveController')

//------------------------------------- User APIs----------------------------------

router.post('/users', userController.createUser)
router.post('/login', userController.userLogin)


//------------------------------------- Admin APIs----------------------------------

router.post('/admin', adminController.createAdmin)
router.post('/adminlogin', adminController.adminLogin)


//------------------------------------- Leaves APIs----------------------------------
router.post('/leaves', leaveController.createLeaveDoc)



router.all("/*", function(req, res) {
    res.status(404).send({ msg: "No such Api found" })
})


module.exports = router