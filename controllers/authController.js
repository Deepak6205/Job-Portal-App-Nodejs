
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

        //token

        const token = user.createJWT();
        res.status(201).send({
            success:true,
            message: 'user created successfully',
            user:{
                name:user.name,
                lastName: user.lastName,
                email:user.email,
                location:user.location
            },
            token
        });
};

export const loginController = async (req,res,next) =>{
    const {email,password} = req.body;
    //validation
    if(!email || !password){
        next('please provide fields')
    }
    //find user by email
    const user = await userModel.findOne({email}).select("+password");
    if(!user){
        next('Invalid UserName or Password');
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        next('Invalid Username or password');
    }
    user.password=undefined;
    const token = user.createJWT();
    res.status(200).json({
        success:true,
        message: 'Login successfully',
        user,
        token,
    });
};