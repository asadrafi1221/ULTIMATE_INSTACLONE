import Message from "../models/message.js"
import User from "../models/user_model.js";
import conversation from "../models/conversation.js"
import { io } from "../Socket/socket.io.js";


export const sendMessage = async (req, res) => {
    try {
      const { senderId, receiverId } = req.params;
      const { message } = req.body;
  
      if (!senderId || !receiverId) {
        return res.status(400).json('Please fill in the required fields');
      }
  
      const receiverFinded = await User.findOne({ _id: receiverId });
      if (!receiverFinded) {
        return res.status(400).json('Receiver not found');
      }
  
      let newConversation = await conversation.findOne({
        participants: { $all: [senderId, receiverId] }
      });
  
      if (!newConversation) {
        newConversation = await conversation.create({
          participants: [senderId, receiverId]
        });
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        message
      });
  
      newConversation.messagesId.push(newMessage._id);
  
      await newMessage.save();
      await newConversation.save();
  
      // Emit message event here
      io.emit('newMessage', { senderId, receiverId, message });
  
      res.status(200).json('Message has been sent successfully');
    } catch (err) {
      res.status(404).json(err.message);
    }
  };
  


export const getMessage = async (req, res) => {
    try {

        const { senderId, receiverId } = req.params;



        const receiverFounded = await User.findById(receiverId)

        if (!receiverFounded) return res.status(404).json('sorry user not founded')

        const messageFounded = await conversation
            .findOne({ participants: { $all: [senderId, receiverId] } })
            .populate('messagesId')

        if (!messageFounded) return res.status(404).json({ message: "sorry no messages founded" })


        return res.status(200).json(messageFounded.messagesId)


    }
    catch (err) {
        res.status(404).json(err.message)
    }
}