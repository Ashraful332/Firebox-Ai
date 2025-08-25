import mongoose, { Schema, Document, models } from "mongoose";

export interface IVisitor extends Document {
  Ip: string;
  location: string;
  Org: string;
  message: string;
  timestamp: string; // বাংলায় formatted string, তাই Date নয়
}

const VisitorSchema: Schema = new Schema({
  Ip: { type: String, required: true },
  location: { type: String, required: true },
  Org: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const Visitor = models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);
export default Visitor;
