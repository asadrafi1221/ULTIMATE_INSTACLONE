import Notification from "../models/Notification.js";


export const get_notification = async(req,res)=>{
    try{
    const {userId} = req.params;
    const notifaction = await Notification.find({to : userId})
    if(!notifaction) res.status(404).json({message  : 'User have no notification'})
    
       if(notifaction.length<=0){
        return res.status(200).json({message : 'User have no notifaction'})
       }
    return res.status(200).json(notifaction)

}catch(err){
    res.status(404).json({message : err.message })
}
}