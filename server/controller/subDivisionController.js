import Division from '../models/DivisionModel.js'
import SubDivision from '../models/SubDivisionModel.js'

export const insertSubDivision = async (req, res) => {
  try {
    const {
      name,
      MUinjection,
      unitBilled,
      noOfConsumers,
      noOfBillsServed,
      totalCollectionIRCA,
      currentDemandIRCA,
      totalArrear,
      date,
      divisionName,
    } = req.body

    const { month, year } = date

    let subDivision = await SubDivision.findOne({ name })

    if (subDivision) {
      return res.status(409).json({
        success: false,
        message: 'Sub-Division already exists.',
      })
    }

    const findDivision = await Division.findOne({ name: divisionName })

    if (!findDivision) {
      return res.status(404).json({
        success: false,
        message: 'No division found. Check the division name again.',
      })
    }

    subDivision = await SubDivision.create({
      name,
      MUinjection,
      unitBilled,
      noOfConsumers,
      noOfBillsServed,
      totalCollectionIRCA,
      currentDemandIRCA,
      totalArrear,
      date: {
        month,
        year,
      },
      division: {
        name: divisionName,
        id: findDivision._id,
      },
    })

    res.status(201).json({
      success: true,
      subDivision,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
