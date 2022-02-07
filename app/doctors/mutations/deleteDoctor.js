import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteDoctor = z.object({
  id: z.number(),
})
export default resolver.pipe(resolver.zod(DeleteDoctor), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const doctor = await db.doctor.deleteMany({
    where: {
      id,
    },
  })
  return doctor
})
