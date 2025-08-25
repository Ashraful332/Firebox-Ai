import mongoose, { Schema, model, models } from "mongoose";

const ChatSchema = new Schema(
  {
    message: { type: String, required: true },
    reply: { type: String },
  },
  { timestamps: true }
);

const Chat = models.Chat || model("Chat", ChatSchema);
export default Chat;
