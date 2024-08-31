import z from "zod"
import { MeasureType } from "~/domain/entities/measure.entity"

export const uploadDTO = z.object({
  image: z.string().refine((v) => v.match(/^data:(.+);base64,(.+)$/)),
  customer_code: z.string().min(0),
  measure_datetime: z.string().datetime(),
  measure_type: z.enum([MeasureType.GAS, MeasureType.WATER]),
})

export type IUploadDTO = z.infer<typeof uploadDTO>
