const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = mongoose.Schema({
   
    user:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'user'  
    },
    title:{
        
            type:String,
            require:true
    },
    description:{
        
            type:String,
            require:true
    },
    tag:[{
        type:String
    }],
    statut:{type:String
    },
});
module.exports = mongoose.model('Question', QuestionSchema);