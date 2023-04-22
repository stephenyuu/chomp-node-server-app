import likesSchema from "./likes-schema.js";
import mongoose from "mongoose";
const likesModel = mongoose.model("likes", likesSchema);
export default likesModel;