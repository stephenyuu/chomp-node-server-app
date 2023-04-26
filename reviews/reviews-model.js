import reviewsSchema from "./reviews-schema";
import mongoose from "mongoose";
const reviewsModel = mongoose.model("reviews", reviewsSchema);
export default reviewsModel;