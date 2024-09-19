import mongoose from "mongoose";
import replySchema from "./RepliesSchema.js";
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
    },
    desc : {
        type : String,
    },
    Image: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        }
    ],
    comments: [
        {
            text: {
                type: String,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            reply : [replySchema],
        },
    ],
}
    , { timestamps: true }
);



const post = mongoose.model('UserPosts',postSchema)

export default post;