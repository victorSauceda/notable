import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetAppointment = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetAppointment), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const appointment = await db.appointment.findFirst({
    where: {
      id,
    },
  })
  if (!appointment) throw new NotFoundError()
  return appointment
})
