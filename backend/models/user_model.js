import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            Default: [],
        }
    ],
    folllowing: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            Default: [],
        }
    ],
    profileImg: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    }
}, { timestamps: true })

export const User = mongoose.model('User',userSchema);

export default User;
