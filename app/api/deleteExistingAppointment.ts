import { NextApiRequest, NextApiResponse } from "next"
import db from "db"
const deleteAppointment = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const body = JSON.parse(req.body)
  let { id } = body
  try {
    const deleteApp = await db.doctor.delete({
      where: { id: id },
    })
    res.json(deleteApp)
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default deleteAppointment
