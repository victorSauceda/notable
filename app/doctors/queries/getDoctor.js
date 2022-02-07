import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetDoctor = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetDoctor), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const doctor = await db.doctor.findFirst({
    where: {
      id,
    },
  })
  if (!doctor) throw new NotFoundError()
  return doctor
})
