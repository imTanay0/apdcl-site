import mongoose from "mongoose";

const subDivisionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  injection: {
    type: Number,
  },
  unitBilled: {
    type: Number,
  },
  totalCollectionIRCA: {
    type: Number,
  },
  noOfConsumers: {
    type: Number,
  },
  noOfBillsServed: {
    type: Number,
  },
  totalArea: {
    type: Number,
  },
  division: {
    name: {
      type: String,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Division",
    },
  },
});

export default mongoose.model("SubDivision", subDivisionSchema);
