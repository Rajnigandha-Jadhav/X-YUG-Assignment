const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const leaveController = require('../controllers/leaveController')
const middleware = require('../middleware/auth')

//------------------------------------- User APIs----------------------------------

router.post('/users', userController.createUser)
router.post('/login', userController.userLogin)


//------------------------------------- Admin APIs----------------------------------

router.post('/admin', adminController.createAdmin)
router.post('/adminlogin', adminController.adminLogin)
router.post('/leavePost/:userId/:adminId', middleware.authentication , adminController.leavePost)


//------------------------------------- Leaves APIs----------------------------------
router.post('/leaves', leaveController.createLeaveDoc)
router.get('/leaveApplications', leaveController.getLeaves)



router.all("/*", function(req, res) {
    res.status(404).send({ msg: "No such Api found" })
})


module.exports = router