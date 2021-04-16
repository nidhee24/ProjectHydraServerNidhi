const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    details: {                              //Details of About Page
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('about', AboutSchema);