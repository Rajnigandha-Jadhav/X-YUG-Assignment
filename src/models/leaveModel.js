const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const leaveSchema = new mongoose.Schema({
    from : {
        type : Date,
        required : true
    },
    to : {
        type : Date,
        required : true
    },
    
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    }    
});

module.exports = mongoose.model('Leaves', leaveSchema)