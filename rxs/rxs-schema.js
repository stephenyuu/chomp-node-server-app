import mongoose from "mongoose";

const rxsSchema = new mongoose.Schema(
  {
    name: String,
    rxId: String,
  },
  { collection: "rxs" }
);

export default rxsSchema;