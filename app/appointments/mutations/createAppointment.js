import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateAppointment = z.object({
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(CreateAppointment),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const appointment = await db.appointment.create({
      data: input,
    })
    return appointment
  }
)
