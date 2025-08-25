import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: String,
  photo: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
});

const User = models.User || mongoose.model("User", userSchema);
export default User;
