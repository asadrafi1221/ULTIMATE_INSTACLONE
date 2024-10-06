import mongoose from "mongoose";

// Define the Conversation Schema
const ConversationSchema = new mongoose.Schema({
    
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    messagesId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message',
            default: []
        }
    ]
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;

