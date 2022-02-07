import { NextApiRequest, NextApiResponse } from "next"
import db from "db"
const getListOfAppsInADay = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const getList = await db.appointment.findUnique({
      where: {},
      // first_name: first_name, date_chosen: date_chosen
    })
    res.json(getList)
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default getListOfAppsInADay
