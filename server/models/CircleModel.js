import mongoose from "mongoose";

const circleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Circle", circleSchema);
