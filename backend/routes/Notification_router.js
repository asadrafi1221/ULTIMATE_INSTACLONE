import {Router} from "express"
import {get_notification} from "../controllers/Notification_controller.js"

const notificationRouter = Router()
notificationRouter.get('/get_notification/:userId',get_notification)

export default notificationRouter;