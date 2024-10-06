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
import chatRouter from "./routes/ChatRouter.js"
import notificationRouter from "./routes/Notification_router.js"
import { app, server } from "./Socket/socket.io.js"

const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors())
app.use(authRoute);
app.use('/api/users', usersRoute);
app.use('/notification', notificationRouter)
app.use('/post', postRouter);
app.use('/messageApi', chatRouter)


app.use(express.static('Public'))
app.get('/', (req, res) => {
  res.send('helo')
})


server.listen(3500, () => {
  console.log('Server running on port 3500');
  connectToDatabase()
});







