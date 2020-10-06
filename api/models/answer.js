const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnswerSchema = mongoose.Schema({
   
    answer:[
        {
            user:{
                type:Schema.Types.ObjectId,
                // require:true,
                ref:'User' 
            },
            description:{
                type:String
    
            },
            question:{
                type:Schema.Types.ObjectId,
                // require:true,
                ref:'question' 
            },           
        }
    ],
    });


module.exports = mongoose.model('Answer', AnswerSchema);