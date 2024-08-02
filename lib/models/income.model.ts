import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: String, //mongoose.Types.Decimal128,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// First checks if the model of the user exist on the Database,
//  if not, it creates one using the incomeSchema
const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);

export default Income;