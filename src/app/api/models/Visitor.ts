import mongoose, { Schema, Document, models } from "mongoose";

export interface IVisitor extends Document {
  ip: string;
  message: string;
  timestamp: Date;
}

const VisitorSchema: Schema = new Schema(
  {
    ip: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Visitor = models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);
export default Visitor;
