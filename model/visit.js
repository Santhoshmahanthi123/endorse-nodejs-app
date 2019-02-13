const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
   blog : { type :mongoose.Schema.Types.ObjectId, ref :'Blog', required : true},
   user :{ type :mongoose.Schema.Types.ObjectId,ref :'User',required : true}, 

//  count : {type :Number, default : 0}

});
module.exports = mongoose.model('Visit',visitSchema); 
