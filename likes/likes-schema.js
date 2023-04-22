import mongoose from "mongoose";
const likesSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    rxsMongooseKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rxsModel",
    },
    albumId: String,
  },
  { collection: "likes" }
); 

export default likesSchema;
