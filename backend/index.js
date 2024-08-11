const { adminRouter } = require("./routes/admin")
const { userRouter } =require("./routes/user")

const express = require("express");
const cors = require("cors");
const { accountRouter } = require("./routes/account");

const app=express();
const port=3000;

app.use(express.json());
app.use(cors());

app.use("/",adminRouter);
app.use("/user",userRouter);
app.use("/account",accountRouter);

app.listen(port,()=>{
    console.log(`Listening to port: ${port}`);
})