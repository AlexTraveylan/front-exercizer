import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { emailUrl } from "@/lib/constants"
import { commentSchema } from "@/lib/schema-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"

export const CommentForm = () => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false)

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    const response = await fetch(emailUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (response.ok) {
      setIsEmailSent(true)
    } else {
      console.error("Error while sending email")
    }
  }

  if (isEmailSent) {
    return <h2>Message envoyé avec succes</h2>
  }

  return (
    <Card className="max-w-3xl w-screen min-w-[350px]">
      <CardHeader>
        <CardTitle>Me contacter</CardTitle>
        <CardDescription>Un commentaire, une suggestion ?</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} cols={100} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Envoyer</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
