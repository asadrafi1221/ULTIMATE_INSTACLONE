import mongoose from "mongoose";


const message = new mongoose.Schema({
senderId : {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
},
receiverId : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
},
message : {
    type : String,
},
})

const Message = mongoose.model('message',message)
export default Message;