import { z } from "zod"

export const enonceSchema = z.object({
  enonce: z.string(),
  questions: z.array(z.string()),
})

export type Enonce = z.infer<typeof enonceSchema>

export const responsesSchema = z
  .object({
    response1: z.string().refine((str) => !isNaN(parseFloat(str)), { message: "Doit être un nombre" }),
    response2: z
      .string()
      .optional()
      .refine((str) => str === undefined || !isNaN(parseFloat(str)), { message: "Doit être un nombre" }),
    response3: z
      .string()
      .optional()
      .refine((str) => str === undefined || !isNaN(parseFloat(str)), { message: "Doit être un nombre" }),
    response4: z
      .string()
      .optional()
      .refine((str) => str === undefined || !isNaN(parseFloat(str)), { message: "Doit être un nombre" }),
    response5: z
      .string()
      .optional()
      .refine((str) => str === undefined || !isNaN(parseFloat(str)), { message: "Doit être un nombre" }),
    response6: z
      .string()
      .optional()
      .refine((str) => str === undefined || !isNaN(parseFloat(str)), { message: "Doit être un nombre" }),
  })
  .strict()

export const responseApiSchema = z.object({
  answers: z.array(z.number()),
  explications: z.array(z.string()),
  results: z.array(z.boolean()),
})

export type Responses = z.infer<typeof responsesSchema>
