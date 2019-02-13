const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    }, 
    date : {
        type : Date,
        default : Date.now
    },
},
    {
        collection: 'blogs'
    
     }

);

module.exports = mongoose.model("Blog", blogSchema);