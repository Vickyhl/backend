import mongoose from "mongoose";
import moment from "moment-timezone";

const passwordResetTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: moment().tz("Asia/Jerusalem").format(),
    required: true,
  },
});

// Create a new model for the password reset token
const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetTokenSchema
);

export default PasswordResetToken;
