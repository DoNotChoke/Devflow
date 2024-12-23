import { models, model, Types, Schema, Document } from "mongoose";
export interface IAnswer {
  question: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  upvotes: number;
  downvotes: number;
}
export interface IAnswerDoc extends IAnswer, Document {}
const AnswerSchema = new Schema<IAnswer>(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Answer = models?.Answer || model<IAnswer>("Answer", AnswerSchema);
export default Answer;
