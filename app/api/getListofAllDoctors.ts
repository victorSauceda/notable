import { NextApiRequest, NextApiResponse } from "next"
import db from "db"
const getListOfAllDoctors = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const getList = await db.doctor.findMany()
    res.json(getList)
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default getListOfAllDoctors
