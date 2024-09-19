import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
from:{
    type : mongoose.Schema.Types.ObjectId,
    default : []
},
to:{
    type : mongoose.Schema.Types.ObjectId,
    default : []
},
username  : {
    type : String,
    default : [],
},
sendfrom : {
    type : String,
    default : [],
},
type:{
    type : String,
    default : []
},
read :{
    type:Boolean,
    default : false

},
},{timestamps : true})


const Notification = mongoose.model('Notification',notificationSchema);
export default Notification;