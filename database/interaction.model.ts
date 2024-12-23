import { model, models, Schema, Types } from "mongoose";
export interface IInteraction {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: "question" | "answer";
}
const InteractionSchema = new Schema({
  user: { types: Schema.Types.ObjectId, ref: "User", required: true },
  actionId: { types: Schema.Types.ObjectId, required: true },
  action: {
    types: String,
    required: true,
  },
  actionType: {
    types: String,
    enum: ["question", "answer"],
    required: true,
  },
});

const Interaction =
  models?.interaction || model<IInteraction>("Interaction", InteractionSchema);
export default Interaction;
