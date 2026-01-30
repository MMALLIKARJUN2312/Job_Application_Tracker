import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    conpany : {
        type : String,
        required : true,
        trim : true
    }, 
    position : {
        type : String,
        required : true,
        trim : true 
    }, 
    status : {
        type : String,
        enum : ["applied", "interview", "offer", "rejected"],
        default : "applied",
    }, 
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},
    {timestamps : true}
);

const Job = mongoose.model('Job', jobSchema);

export default Job;