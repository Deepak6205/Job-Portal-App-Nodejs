import userModel from "../models/userModel.js";

export const registerController = async (req,res,next) => {
    
        const {name,email,password} = req.body;
        //validate
        if(!name){
           next('Please provide name');
        }
        if(!email){
            next('Please provide email');
        }
        if(!password){
            next('Please provide password greater than 6 length');
        }
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            next('This email already exist ooops provide the new one');
        }
        const user = await userModel.create({name,email,password});
        res.status(201).send({
            success:true,
            message: 'user created successfully',
            user,
        });
};