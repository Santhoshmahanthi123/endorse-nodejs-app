const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
   blog : { type :String, ref :'Blog', required : true},
   user :{ type :String,  ref :'User', required : true}, 
   date : {type : Date,default : Date.now,required : true}

//  count : {type :Number, default : 0}

});
module.exports = mongoose.model('Visit',visitSchema); 
