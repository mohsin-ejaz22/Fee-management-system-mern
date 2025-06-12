import User from "../models/UserModel.js";
import secretTokens from "../utils/secretTokens.js";


export default {
    async Signup (req,res){
        try{
            const {email,password , username, createdAt }= req.body;
            const existingUser = await User.findOne({username});
            if(existingUser){
                return res.status(404).json ({messege: "user is already exist please login "});

            }
            const user = await new User ({email , username, createdAt});
            await User.register(user, password);
            const token = secretTokens(user._id);
            return res.status(201).json({messege: "user signup successfully", success: true, user});

        }catch(error){
            console.log(error)
            return res.status(400).json({errors:error});
        }
    },

//Login

async Login (req, res){
    res.json({messege:"Login successful", user: req.user});
},


    // logout
    async Logout(req,res){
        req.logout((err)=>{
            if(err) return res.status(400),json({error: err.messege});
            res.json({messege: "Logout successfully"});

        })

    }
}