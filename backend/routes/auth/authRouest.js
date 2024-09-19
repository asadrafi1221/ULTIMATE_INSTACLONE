import { Router } from "express";
import { signnin,login,logout,get_AuthenticatedUser } from "../../controllers/auth/auhtcontroller.js";
import { protectedRoute } from "../../middlewear/Protectedrote.js";
const authRoute  = Router()

authRoute.post('/auth/signin',signnin)
authRoute.post('/auth/login',login)
authRoute.post('/auth/logout',logout)
authRoute.get('/auth/getAuthUser',protectedRoute , get_AuthenticatedUser)
export default authRoute