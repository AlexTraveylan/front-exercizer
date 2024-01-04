import { submitUrl } from "@/lib/constants"
import { fetchWithToken, stockToken } from "@/lib/jwt-token"
import { responseApiSchema, responsesSchema } from "@/lib/schema-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ShareTwitter } from "./shareTwitter"
import { Status, StatusLogo } from "./status-logo"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

export const ResponsesForm = ({
  nbQuestions,
  setIsRunning,
}: {
  nbQuestions: number
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [status, setStatus] = useState<Status[]>(Array(nbQuestions).fill("None"))
  const [explications, setExplications] = useState<string[]>(Array(nbQuestions).fill(""))
  const [finalTime, setFinalTime] = useState<string>("")
  const isStatusCompleted = status.every((status) => status !== "None")

  const form = useForm<z.infer<typeof responsesSchema>>({
    resolver: zodResolver(responsesSchema),
  })

  const onSubmit = async (responses: z.infer<typeof responsesSchema>) => {
    const responsesToArray: number[] = []
    for (let i = 1; i <= nbQuestions; i++) {
      // @ts-ignore
      const reponse = String(responses[`response${i}`]).replace(",", ".")
      responsesToArray.push(parseFloat(reponse))
    }

    const apiResponse = await fetchWithToken(submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers: responsesToArray }),
    })

    if (apiResponse.ok) {
      const apiResponseJson = await apiResponse.json()
      const parsedApiResponse = responseApiSchema.parse(apiResponseJson)

      const apiStatus = parsedApiResponse.results.map((result) => {
        if (result === true) {
          return "success"
        } else {
          return "fail"
        }
      })

      setStatus([...apiStatus])
      setExplications([...parsedApiResponse.explications])
      stockToken(parsedApiResponse.token)
      setFinalTime(parsedApiResponse.final_time)
      setIsRunning(false)
    }
  }

  return (
    <Card className="max-w-3xl w-screen min-w-[350px]">
      <CardHeader>
        <CardTitle>Réponses</CardTitle>
        <CardDescription>{"La réponse est forcement un entier ou un nombre décimal unique sans explication"}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {Array.from({ length: nbQuestions }, (_, index) => (
              <>
                <FormField
                  control={form.control}
                  // @ts-ignore
                  name={`response${index + 1}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Réponse ${index + 1}`}</FormLabel>
                      <div className="flex items-center gap-5">
                        <FormControl>
                          <Input placeholder={`Réponse à la question ${index + 1}`} {...field} />
                        </FormControl>
                        <StatusLogo status={status[index]} />
                      </div>
                      <FormMessage />
                      {explications[index] !== "" && <div>{explications[index]}</div>}
                    </FormItem>
                  )}
                />
              </>
            ))}
            {isStatusCompleted ? <ShareTwitter status={status} finalTime={finalTime} /> : <Button type="submit">Envoyer les réponses</Button>}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
