import mongoose from "mongoose";
const reviewsSchema = new mongoose.Schema(
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
    review: { type: String, required: true },
  },
  { collection: "reviews" }
);

export default reviewsSchema;
