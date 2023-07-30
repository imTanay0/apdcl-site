import mongoose from "mongoose";

const yearlyPerformanceSchema = new mongoose.Schema({
  subDivision: {
    name: {
      type: String,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubDivision",
    },
  },
  year: {
    type: String,
  },
  MUInjection: {
    type: Number,
  },
  totalConsumer: {
    type: Number,
  },
  MUBilled: {
    type: Number,
  },
  BE: {
    type: Number,
  },
  currentDemand: {
    type: Number,
  },
  totalCollection: {
    type: Number,
  },
  CE: {
    type: Number,
  },
  ARR: {
    type: Number,
  },
  AT_CLosses: {
    type: Number,
  },
  ABR: {
    type: Number,
  },
  totalArrear: {
    type: Number,
  },
  consumerPercentageOfBilling: {
    type: Number,
  },
});

export default mongoose.model("YearlyPerformance", yearlyPerformanceSchema);
