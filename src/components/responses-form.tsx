import { submitUrl } from "@/lib/constants"
import { responsesSchema } from "@/lib/schema-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

export const ResponsesForm = ({ nbQuestions }: { nbQuestions: number }) => {
  const form = useForm<z.infer<typeof responsesSchema>>({
    resolver: zodResolver(responsesSchema),
  })

  const onSubmit = async (responses: z.infer<typeof responsesSchema>) => {
    const responsesToArray: number[] = []
    for (let i = 1; i <= nbQuestions; i++) {
      responsesToArray.push(parseFloat(responses[`response${i}`]))
    }

    const apiResponse = await fetch(submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers: responsesToArray }),
    })

    if (apiResponse.ok) {
      console.log("ok")
    }
  }

  return (
    <Card className="max-w-3xl w-screen min-w-[350px]">
      <CardHeader>
        <CardTitle>Réponses</CardTitle>
        <CardDescription>Réponses aux questions</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {Array.from({ length: nbQuestions }, (_, index) => (
              <FormField
                control={form.control}
                name={`response${index + 1}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Réponse ${index + 1}`}</FormLabel>
                    <FormControl>
                      <Input placeholder={`Réponse à la question ${index + 1}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit">Envoyer les réponses</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
