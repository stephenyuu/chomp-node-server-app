import mongoose from "mongoose";
import sessionsSchema from "./sessions-schema.js";
const sessionsModel = mongoose.model("sessions", sessionsSchema);
export default sessionsModel;