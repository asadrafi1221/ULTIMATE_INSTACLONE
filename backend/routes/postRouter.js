import {Router} from "express"
import { protectedRoute } from "../middlewear/Protectedrote.js"
import { commentonPost ,deletepost,LikeUnlikePost ,get_allpost ,getSpecific_Posts,get_specificComments, ReplyonComment, get_replies} from "../controllers/auth/Posts_controller.js";

const postRouter  = Router()

postRouter.get('/delete/:id',protectedRoute ,deletepost);
postRouter.post('/comment',commentonPost);
postRouter.post('/like' ,LikeUnlikePost);
postRouter.get('/getallpost',protectedRoute ,get_allpost);
postRouter.get('/get_allpost',get_allpost)
postRouter.post('/auth_userPosts',getSpecific_Posts);
postRouter.get('/get_specificComments/:postId',get_specificComments)
postRouter.post('/replyoncomment',ReplyonComment);
postRouter.get('/getreplies/:postId/:commentId',get_replies)

export default postRouter;