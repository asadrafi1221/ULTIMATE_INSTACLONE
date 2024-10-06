

import User from "../models/user_model.js";
import Notification from "../models/Notification.js";



export const getUserProfile = async (req, res) => {

    const username = req.params.username.replace(":", '');
    console.log(username)
    try {
        const user = await User.findOne({ username }).select('-password')
        !user && res.status(400).json({ message: 'user not founded' })

        res.status(200).send(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const followUnfollowUser = async (req, res) => {
    try {
        const { userId, id } = req.body
        const usertoModify = await User.findById(id)
        const currentUser = await User.findById(userId);
        console.log(currentUser.username)
        console.log(usertoModify.username)
        if (id === currentUser._id) return res.status(404).json({ error: "you cannot follow your self" })

        const isfollowing = currentUser.folllowing.includes(id)
        if (isfollowing) {
            await User.findByIdAndUpdate(id, { $pull: { followers: userId } })
            await User.findByIdAndUpdate(userId, { $pull: { folllowing: id } })
            const newNotification = new Notification({
                type: 'Unfollow',
                from: userId,
                username: usertoModify.username,
                sendfrom: currentUser.username,
                to: usertoModify._id,
            })
            await newNotification.save()
            res.status(200).json({ message: 'user unfollowed Succesfully' })

        }
        else {
            await User.findByIdAndUpdate(id, { $push: { followers: userId } })
            await User.findByIdAndUpdate(userId, { $push: { folllowing: id } })
            const newNotification = new Notification({
                type: 'follow',
                from: userId,
                username: usertoModify.username,
                sendfrom: currentUser.username,
                to: usertoModify._id,
            })
            await newNotification.save()
            res.status(200).json({ message: 'User Followed Succesfully' })
        }


    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

export const getsuggestedusers = async (req, res) => {
    try {
        const userid = req.user._id;
        const userFolledbyMe = await User.findById(userid).select('following')
        console.log(userFolledbyMe)
        if (userFolledbyMe.length < 0) {
            return res.status(204).json({ message: 'user have not followed anyone yet' })
        }
        return res.status(200).json(userFolledbyMe);


    } catch (error) {
        res.status(500).json({ message: err.message })
    }

}

export const get_allusers = async (req, res) => {
    try {
        const data = await User.find({})
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json('wargya')
    }
}
export const get_authuser = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const data = await User.findOne({ _id: id });

        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const get_presentUser = async (req, res) => {
    const { postId } = req.params;
    console.log(postId);
    res.json('helo world')
}







export const updateBio = async (req, res) => {
    try {
        const { userId, bio } = req.params;
        console.log(req.body)



        const user = await User.findById(userId)
        if (!user) res.status(404).json({ message: 'user not founded' })
        user.bio = bio;
        user.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: 'Interval Servor error' })
    }

}


export const getFollowerFollowing = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate('followers').populate('folllowing');

        if (!user) {
            return res.status(404).json('User not found');
        }

        const data = {
            followers: user.followers,
            following: user.folllowing
        };

        console.log(data);

        res.status(200).json({ message: 'Successful', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
