import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateAppointment = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateAppointment),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const appointment = await db.appointment.update({
      where: {
        id,
      },
      data,
    })
    return appointment
  }
)
