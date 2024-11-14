require("dotenv").config();

const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();
const jwtPassword=process.env.JWT_PASSWORD;
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

const userZodSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

const userZodUpdateSchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

userRouter.post("/signup", async (req, res) => {
  if (userZodSchema.safeParse(req.body).success) {
    let userExist = await User.findOne({ username: req.body.username });
    if (!userExist) {
      let user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      });
      await Account.create({
        userId: user._id,
        balance: 1 + Math.random() * 10000,
      });
      let token = jwt.sign({ userId: user._id }, jwtPassword);
      return res.status(200).json({
        message: "User created successfully",
        token: token,
      });
    }
  } else {
    console.log(req.body);
    console.log(userZodSchema.safeParse(req.body).success);
  }
  return res.status(411).json({
    message: "Email already taken / Incorrect inputs",
  });
});

userRouter.post("/signin", async (req, res) => {
  let userExist = await User.findOne({ username: req.body.username });
  if (userExist) {
    let token = jwt.sign({ userId: userExist._id }, jwtPassword);
    return res.status(200).json({
      token: token,
    });
  } else {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
});

userRouter.put("/", authMiddleware, async (req, res) => {
  if (userZodUpdateSchema.safeParse(req.body).success) {
    await User.updateOne({ _id: req.userId }, req.body);
    return res.status(200).json({
      message: "Updated successfully",
    });
  } else {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }
});

userRouter.get("/find",async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, jwtPassword);
    const user = await User.find({_id: payload.userId});

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});


// userRouter.get("/bulk",async (req,res)=>{
//     let name=req.query.filter;
//     let users=await User.find({
//         $or:[
//             {firstName:name},
//             {lastName:name}
//         ]
//     })
//     return res.status(200).json(users);
// })

// <------------when no filter is passed to /bulk it should return all the users -------------->
// <------------ updated code -------------->
userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: { $regex: filter, $options: "i" },
      },
      {
        lastName: { $regex: filter, $options: "i" },
      },
    ],
  });
  return res.status(200).json(users);
});

userRouter.get("/delete",async (req,res)=>{
  await User.deleteMany({});
  res.json({
    message:"Deleted all existing users!!"
  })
})

module.exports = {
  userRouter,
};
