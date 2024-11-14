const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");
const accountRouter=express.Router();

accountRouter.get("/balance",authMiddleware,async (req,res)=>{
    let account=await Account.findOne({userId:req.userId});
    return res.status(200).json({
        balance: account.balance
    })
})

// <--------------------  BAD CODE (without using session, txn of mongodb)  --------------------->

// accountRouter.post("/transfer", authMiddleware,async (req,res)=>{
//     try{
//         let account=await Account.findOne({userId:req.userId});
//         if(account.balance<req.body.amount)return res.status(400).json({
//             message: "Insufficient balance"
//         })
//         await Account.updateOne({userId:req.userId},{
//             $inc:{
//                 balance:-req.body.amount,
//             }
//         })
//         await Account.updateOne({userId:req.body.to},{
//             $inc:{
//                 balance:req.body.amount
//             }
//         })
//         res.status(200).json({
//             message: "Transfer successful"
//         })
//     }catch(error){
//         console.log(`Transaction Failed: ${error.message}`);
//         return res.status(400).json({
//             message: "Invalid account"
//         })
//     }
// })

accountRouter.post("/transfer",authMiddleware,async (req,res)=>{
    console.log(`Inside /tranfer in backend`);
    const session=await mongoose.startSession();
    session.startTransaction();
    let fromAccount=await Account.findOne({userId:req.userId}).session(session);
    let toAccount=await Account.findOne({userId:req.body.to}).session(session);

    if(!fromAccount || fromAccount.balance<req.body.amount){
        await session.abortTransaction();
        return req.status(400).json({
            message: "Insufficient balance"
        })
    }
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({userId:req.userId},{
        $inc:{
            balance: - req.body.amount
        }
    }).session(session);
    await Account.updateOne({userId:req.body.to},{
        $inc:{
            balance: req.body.amount
        }
    }).session(session);

    await session.commitTransaction();
    
    return res.status(200).json({
        message: "Transfer successful"
    })
})

module.exports={
    accountRouter
}