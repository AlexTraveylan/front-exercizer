import { z } from "zod"

export const enonceSchema = z.object({
  enonce: z.string(),
  questions: z.array(z.string()),
})

export type Enonce = z.infer<typeof enonceSchema>
