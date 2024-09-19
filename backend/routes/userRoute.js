import { Router } from 'express';
import { protectedRoute } from '../middlewear/Protectedrote.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/user_model.js';
import post from '../models/postModel.js';


import {
    getUserProfile,
    followUnfollowUser,
    getsuggestedusers,
    get_allusers,
    get_authuser,
    get_presentUser,
    updateBio
} from '../controllers/userController.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const publicDir = path.join(__dirname, '../Public');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, publicDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });
const usersRouter = Router()

usersRouter.get('/profile/:username', protectedRoute, getUserProfile);
usersRouter.get('/suggestedusers', protectedRoute, getsuggestedusers);
usersRouter.post('/follow', followUnfollowUser);
usersRouter.get('/get_allusers', get_allusers);
usersRouter.get('/get_presentuser/:id', get_allusers);
usersRouter.post('/get_authuser', get_authuser);
usersRouter.get('/get_presentUser/:postId', get_presentUser);
usersRouter.get('/updateBio/:userId/:bio', updateBio);



usersRouter.post('/uploadImg/:userId', upload.single('profileImg'), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const { userId } = req.params
        await User.findById(userId).updateOne({ profileImg: req.file.filename })

        res.status(200).json({ message: 'Upload successful' });
    } catch (err) {
        console.error('Upload failed:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

usersRouter.post('/createpost/:userId', upload.single('image'), async (req, res) => {
    try {
      const { userId } = req.params;
      const { text } = req.body; 
  
      if (!text) return res.status(400).json({ message: 'Please fill in the text' });
  
      console.log('Text:', text);
      console.log('User ID:', userId);
      console.log('File:', req.file);
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const newPost = new post({
        user: userId,
        text: text,
        Image: req.file ? req.file.filename : undefined, 
      });
  
      await newPost.save();
      res.status(200).json(newPost); 
    } catch (err) {
      console.error('Error creating post:', err.message);
      res.status(400).json({ message: err.message });
    }
  });

usersRouter.get('/users_followers/:userId',async (req,res)=>{
    const {userId} = req.params
  
    const user = await User.findById(userId).populate('followers','username');
     console.log(user)
    
     res.status(200).json(user.followers)
  })
usersRouter.get('/users_following/:userId',async (req,res)=>{
    const {userId} = req.params
  
    const user = await User.findById(userId).populate('folllowing','username');
     console.log(user)
     const following = user.folllowing
    
     res.status(200).json(following)
  })
usersRouter.get('/home', (req, res) => {
    res.send('helo')
})
export default usersRouter;
