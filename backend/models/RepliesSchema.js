import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true, 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
    username : {
        type: String,
    },
    profileImg : {
        type:String
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default replySchema;