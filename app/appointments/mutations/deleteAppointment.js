import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteAppointment = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeleteAppointment),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const appointment = await db.appointment.deleteMany({
      where: {
        id,
      },
    })
    return appointment
  }
)
