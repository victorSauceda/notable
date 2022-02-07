import { NextApiRequest, NextApiResponse } from "next"
import db from "db"
const postNewAppointment = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const body = JSON.parse(req.body)
    let { patientFirstName, patientLastName, dateChosen, timeChosen } = body
    if (
      Number(timeChosen.split(2, 4)) == 15 ||
      Number(timeChosen.split(2, 4)) == 30 ||
      Number(timeChosen.split(2, 4)) == 45 ||
      Number(timeChosen.split(2, 4)) == 0
    ) {
      const createNewAppointment = await db.appointment.create({
        data: {
          patient_first_name: patientFirstName,
          patient_last_name: patientLastName,
          date_chosen: dateChosen,
          time_chosen: timeChosen,
        },
      })
      res.json(createNewAppointment)
    } else {
      throw new Error("You can only schedule in 15 min increments")
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default postNewAppointment
