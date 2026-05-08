

const users=require("../models/usersTable");

const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken");
require("dotenv").config()

const secretKey=process.env.DB_SECERT_KEY


// registation 

const registerUser= async(req,res)=>{
    try {
        const {name,email,password,role}=req.body
        const emailregx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //  1. Validate required fields
        if(!name || !email || !password || ! role){
            return res.status(400).json({
                message:"All Fields is Required"
            });
        }
        //  2. Validate email format

        if(!emailregx.test(email)){
            return res.status(400).json({
                message:"Invalid email format"
            })
        }

        const existingUser=await users.findOne({where:{email}});

        if(existingUser){
            return res.status(409).json({
                message:"Email Already Exits"
            });
        }
        
        // hash password
        const hashPassword=await bcrypt.hash(password,10);
        const userCreated=await users.create({
            name,
            email,
            password:hashPassword,
            role
        })

        if(!userCreated){
            return res.status(404).json({
                message:"User not Created"
            });
        }
        return res.status(201).json({
            message:"User Created Successfully",
            user:{
                id:userCreated.id,
                name:userCreated.name,
                email:userCreated.email,
                role:userCreated.role
            }
        })


    } catch (err) {
        return res.status(500).json({
            message:"Internal Server Error",
            err:err.message
        });
        
    }

}

// login

const userLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        // 1. Validate required fields
        if(!email || !password){
            return res.status(400).json({
                message:"All Fileds Reqiured"
            })
        }
        // 
        const exitsEmail=await users.findOne({where:{email}})
        if(!exitsEmail){
            return res.status(400).json({
                message:"Email not  Exits"
            })
        }
        // password compare
        const ismatch=await bcrypt.compare(password,exitsEmail.password)

        if(!ismatch){
            return res.status(401).json({
                message:"Invalid Credentials"
            });
        }

        const token=jwt.sign({
            id:exitsEmail.id,
            name:exitsEmail.name,
            role:exitsEmail.role
        },
        secretKey,
        {expiresIn:"1h"}
    )
    return res.status(200).json({
        message:"Login Successfully",
        token:token,
        users:{
            id:exitsEmail.id,
            name:exitsEmail.name,
            role:exitsEmail.role
        }
    });

    } catch (err) {
        return res.status(500).json({
            message:"Internal Server Error",
            err:err.message
        });
    }
}




module.exports={
    registerUser,
    userLogin,
}