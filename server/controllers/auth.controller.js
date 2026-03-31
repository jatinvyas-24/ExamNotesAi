import userModel from "../models/user.model.js"
import { getToken } from "../utils/token.js"

const googleAuth = async (req , res) => {
    try {
        const {name , email} = req.body
        let user = await userModel.findOne({email})

        if(!user){
            user = await userModel.create({
                name , email
            })
        }
        const token = await getToken(user._id)
    } catch (error) {
        
    }
    
}