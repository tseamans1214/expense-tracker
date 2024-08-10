import mongoose from "mongoose";

const recurringPaymentSchema = new mongoose.Schema({
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
});

// First checks if the model of the user exist on the Database,
//  if not, it creates one using the recurringPaymentSchema
const RecurringPayment = mongoose.models.RecurringPayment || mongoose.model("RecurringPayment", recurringPaymentSchema);

export default RecurringPayment;