import post from "../models/postModel.js";
import User from "../models/user_model.js";
import Notification from "../models/Notification.js";



export const deletepost = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('this is id', id)

        const postfinded = await post.findById(id)
        if (!postfinded) return res.status(404).json({ message: 'Sorry post not founded' })

        if (postfinded.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'you cannot delete this particular post' })

        }
        await post.findByIdAndDelete(id)
        return res.status(200).json({ message: 'Post deleted Succesfully' })
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }

}


export const commentonPost = async (req, res) => {
    try {
        const { text, postId, userId } = req.body;
      console.log(text)

        if (!text) return res.status(400).json({ error: "text field is required" })

        const Userpost = await post.findById(postId)
        if (!Userpost) return res.status(400).json({ error: "post not founded" })
        else {
            const comment = { user: userId, text }
            Userpost.comments.push(comment)

            await Userpost.save()
            res.status(202).json({ message: 'commented succesfully on post ' })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const LikeUnlikePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;

        if (!postId || !userId) return res.status(400).json({ error: 'Please fill required fields' });

        const postFound = await post.findById(postId);
        const presentUser = await User.findById(userId);
        const PostOwner = await User.findById(postFound.user);

        if (!postFound) return res.status(404).json({ error: "Post not found" });
        if (!presentUser || !PostOwner) return res.status(400).json({ error: 'Invalid data given by Client Side' });

        const likedPost = postFound.likes.includes(userId);

        if (likedPost) {
            await post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            const newNotification = new Notification({
                from: presentUser._id,
                to: PostOwner._id,
                username: PostOwner.username,
                sendfrom: presentUser.username,
                type: 'UNLIKE',
            });
            await newNotification.save();
            return res.status(200).json({ message: 'Post unliked successfully' });
        } else {
            await post.updateOne({ _id: postId }, { $push: { likes: userId } });
            const newNotification = new Notification({
                from: presentUser._id,
                to: postFound.user,
                username: PostOwner.username,
                sendfrom: presentUser.username,
                type: 'LIKE',
            });
            await newNotification.save();
            return res.status(200).json({ message: 'Post liked successfully' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};




export const get_allpost = async (req, res) => {
    try {
        const data = await post.find({}).populate('user');
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

export const getSpecific_Posts = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await post.find({ user: id });
    
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

export const get_specificComments = async (req, res) => {
    try {
        const { postId } = req.params;
        console.log(postId)
        const comments = await post.findById(postId)
        const findpost = await post.findById(postId)

        const user2 = comments.comments
        const user3 = user2.map(ele => ele.user)
        console.log(user3)
        const user4 = user3.map(ele => ele.toString());
        console.log(user4);
        const users = await Promise.all(user4.map(async (ele) => {
            return await User.findById(ele);
        }));



        res.status(200).json({ comments, users })
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}




export const ReplyonComment = async (req, res) => {
    try {
        const { postId, commentId, userId, text } = req.body;

        const finduser = await User.findById(userId)


        if (!postId || !commentId || !userId || !text) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const postFinded = await post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = postFinded.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        comment.reply.push({
            text,
            user: userId,
            username : finduser.username,
            profileImg : finduser.profileImg,
        });

        await postFinded.save();

        res.status(202).json({postFinded});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export const get_replies = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        console.log(postId, commentId)
        const postFinded = await post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = postFinded.comments.id(commentId);
        res.status(200).json(comment.reply)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }

}
