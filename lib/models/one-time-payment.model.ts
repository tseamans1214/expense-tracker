import mongoose from "mongoose";

const oneTimePaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

// First checks if the model of the payment exist on the Database,
//  if not, it creates one using the oneTimePaymentSchema
const OneTimePayment = mongoose.models.OneTimePayment || mongoose.model("OneTimePayment", oneTimePaymentSchema);

export default OneTimePayment;