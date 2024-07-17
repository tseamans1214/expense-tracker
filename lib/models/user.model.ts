import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  income: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "income",
    },
  ],
  onboarded: {
    type: Boolean,
    default : false,
  }
});

// First checks if the model of the user exist on the Database,
//  if not, it creates one using the userSchema
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;