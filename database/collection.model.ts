import { model, models, Schema, Types } from "mongoose";
export interface ICollection {
  author: Types.ObjectId;
  question: Types.ObjectId;
}
const CollectionSchema = new Schema<ICollection>({
  author: { types: Schema.Types.ObjectId, ref: "User", required: true },
  question: { types: Schema.Types.ObjectId, ref: "Question", required: true },
});

const Collection =
  models?.collection || model<ICollection>("Collection", CollectionSchema);
export default Collection;
