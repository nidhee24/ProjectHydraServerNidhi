const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    checkin: {
        type: Date,
        default: Date.now,
    },
    checkout:{
        type:Date
    }


});
module.exports = mongoose.model('room', RoomSchema);