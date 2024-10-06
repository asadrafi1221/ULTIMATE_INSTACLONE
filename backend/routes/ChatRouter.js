import {Router} from "express"
import {getMessage, sendMessage} from '../controllers/Messages.controller.js'


const chatRouter =  Router()
chatRouter.post('/sendMessage/:senderId/:receiverId',sendMessage)
chatRouter.get('/getMessage/:senderId/:receiverId',getMessage)

export default chatRouter;