import { z } from "zod"

export const commentSchema = z.object({
  comment: z.string(),
})

export const enonceSchema = z.object({
  enonce: z.string(),
  questions: z.array(z.string()),
  token: z.string(),
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
  token: z.string(),
  final_time: z.string(),
})

export type Responses = z.infer<typeof responsesSchema>

export const reflexionSchema = z.object({
  reflexion: z.string(),
})

export type Reflexion = z.infer<typeof reflexionSchema>

export const nbPropositionsSchema = z.object({
  nb_propositions: z.number(),
  nb_bonnes_reponses: z.number(),
  pourcentage: z.number(),
})

export type NbPropositions = z.infer<typeof nbPropositionsSchema>

export const comboSchema = z.object({
  combo: z.number(),
})

export type Combo = z.infer<typeof comboSchema>
