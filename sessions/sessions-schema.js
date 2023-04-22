import mongoose from "mongoose";
const sessionsSchema = new mongoose.Schema(
  {
    groupSessionCode: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 6
      },
      totalUsers: {
        type: Number,
        required: true,
        min: 2
      },
      respondedUsers: {
        type: Number,
        required: true,
        default: 0,
      },
      searchURL: {
        type: String,
        required: true,
        min: 0
      },
      listRxs: [{
        name: {
          type: String,
          required: false
        },
        likes: {
          type: Number,
          required: true,
          default: 0,
          min: 0
        }
      }]
  },
  { collection: "sessions" }
);

export default sessionsSchema;