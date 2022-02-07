import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateDoctor = z.object({
  name: z.string(),
})
export default resolver.pipe(resolver.zod(CreateDoctor), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const doctor = await db.doctor.create({
    data: input,
  })
  return doctor
})
