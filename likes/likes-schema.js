import mongoose from "mongoose";
const likesSchema = new mongoose.Schema(
  {
    userMongooseKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    rxMongooseKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rxsModel",
      required: true,
    },
    rxId: { type: String, required: true },
  },
  { collection: "likes" }
);

export default likesSchema;
