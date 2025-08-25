import mongoose, { Schema, Document, models } from "mongoose";

export interface IVisitor extends Document {
  Ip: string;
  location: string;
  country: string;
  message: string;
  timestamp: string;
}

const VisitorSchema: Schema = new Schema(
  {
    Ip: { type: String, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: String, required: true },
  },
  { timestamps: true } // createdAt, updatedAt
);

const Visitor = models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);
export default Visitor;
