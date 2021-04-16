const mongoose = require('mongoose');

const hotelroomSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    name:{
        type:String,
        required: true,
    },
    price:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    }

});
module.exports = mongoose.model('hotelroom', hotelroomSchema);