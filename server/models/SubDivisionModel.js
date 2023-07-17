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
});

export default mongoose.model("SubDivision", subDivisionSchema);
