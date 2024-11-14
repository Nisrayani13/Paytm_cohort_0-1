require("dotenv").config();

const database_url=process.env.DATABASE_URL;

const mongoose = require("mongoose");
const schema = mongoose.Schema;

async function connect() {
  try {
    await mongoose.connect(
      database_url
    );
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(`In db.js with error : ${error.message}`);
  }
}
connect();

const userSchema = new schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const accountSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
