const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:{ type : String, required :true },
    email : { type : String,required : true},
   
});
module.exports = mongoose.model('User',userSchema); 