import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  circle: {
    name: {
      type: String,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Circle",
    }
  },
});

export default mongoose.model("Division", divisionSchema);
