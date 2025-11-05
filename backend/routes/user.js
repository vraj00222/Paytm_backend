const express = require('express');
const zod = require('zod');
const { User, Account } = require('../db');
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');
const userRouter = express.Router();

const signupSchema = zod.object({
  userName: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string().optional()
});

userRouter.post("/signup", async (req,res)=> {
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success) {
        return res.status(411).json({
            message:"email already taken / incorrect input"
        })
    }

    const existingUser = await User.findOne({
        userName: body.userName
    })
    if (existingUser) {
        return res.status(411).json({
            message:"email already taken / incorrect inputs"
        })
    }
    const dbUSer = await User.create(body);
    
    // Create account with random balance between 1 and 10000
    const randomBalance = Math.floor(Math.random() * 10000) + 1;
    await Account.create({
        userId: dbUSer._id,
        balance: randomBalance
    });
    
    const token = jwt.sign({
        userId: dbUSer._id
    }, JWT_SECRET)
    res.json({
        message: "User created successfully",
        token: token,
        balance: randomBalance
    })

    
});
userRouter.post("/signin", async (req,res)=> {
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success) {
        return res.status(411).json({
            message:"incorrect input"
        })
    }

    const existingUser = await User.findOne({
        userName: body.userName,
        password: body.password
    })
    if (!existingUser) {
        return res.status(411).json({
            message:"Invalid credentials"
        })
    }
    const token = jwt.sign({
        userId: existingUser._id
    }, JWT_SECRET)
    res.json({
        message: "User signed in successfully",
        token: token
    })
});
userRouter.put("/update", authMiddleware, async (req,res)=> {
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success) {
        return res.status(411).json({
            message:"Error while updating information"
        })
    }
    await User.updateOne({_id:req.userId}, body);
    res.json({
        message: "User information updated successfully"
    });
});
userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = userRouter;
