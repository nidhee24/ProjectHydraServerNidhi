const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    deal: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }

});
module.exports = mongoose.model('deal', DealSchema);