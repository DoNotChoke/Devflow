import { model, models, Schema, Types } from "mongoose";
export interface IVote {
  author: Types.ObjectId;
  contentId: Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}
const VoteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    contentId: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ["question", "answer"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  { timestamps: true },
);

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);
export default Vote;
