
import mongoose from "mongoose";
import rxsSchema from "./rxs-schema.js";

const rxModel = mongoose.model("rxsModel", rxsSchema);

export default rxModel;