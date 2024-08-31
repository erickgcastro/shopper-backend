import z from "zod"

export const confirmMeasureValueDTO = z.object({
  measure_uuid: z.string().min(0),
  confirmed_value: z.number(),
})

export type IConfirmMeasureValueDTO = z.infer<typeof confirmMeasureValueDTO>
