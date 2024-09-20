import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

import authRoute from "./routes/auth/authRouest.js"
import connectToDatabase from "./db_connection/mongoose_connection.js"
import usersRoute from "./routes/userRoute.js"
import postRouter from "./routes/postRouter.js"
import notificationRouter from "./routes/Notification_router.js"
import User from "./models/user_model.js"

const app = express()
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors())
app.use(authRoute);
app.use('/api/users', usersRoute);
app.use('/notification',notificationRouter)
app.use('/post', postRouter);


app.use(express.static('Public'))


app.listen(3000, () => {
  console.log('Server running on port 3000');
});







app.listen(port, () => {
    console.log(`app is listening on port http://localhost:${port}`)
    connectToDatabase()
})