import mongoose from 'mongoose'

const subDivisionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  MUinjection: {
    type: Number,
  },
  unitBilled: {
    type: Number,
  },
  noOfConsumers: {
    type: Number,
  },
  noOfBillsServed: {
    type: Number,
  },
  totalCollectionIRCA: {
    type: Number,
  },
  currentDemandIRCA: {
    type: Number,
  },
  totalArrear: {
    type: Number,
  },
  date: {
    month: {
      type: String,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    year: {
      type: Number,
    },
  },
  division: {
    name: {
      type: String,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Division',
    },
  },
})

export default mongoose.model('SubDivision', subDivisionSchema)
