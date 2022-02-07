import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateDoctor = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateDoctor),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const doctor = await db.doctor.update({
      where: {
        id,
      },
      data,
    })
    return doctor
  }
)
