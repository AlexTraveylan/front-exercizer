import { questionsUrl } from "@/lib/constants"
import { Enonce, enonceSchema } from "@/lib/schema-zod"
import { formatedDate } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const EnonceQuestions = () => {
  const [data, setData] = useState<Enonce | null>(null)

  const getEnonce = async () => {
    const response = await fetch(questionsUrl)

    if (response.ok) {
      try {
        const data = await response.json()
        const parsedData = enonceSchema.parse(data)
        setData(parsedData)
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    getEnonce()
  }, [])

  if (data) {
    return (
      <Card className="max-w-3xl w-screen min-w-[350px]">
        <CardHeader>
          <CardTitle>Problème du jour</CardTitle>
          <CardDescription>{formatedDate(new Date().toDateString())}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3 flex-col">
          <h1>{data.enonce}</h1>
          {data.questions.map((question, index) => (
            <div key={index}>
              <h2>{question}</h2>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return <div>Loading ...</div>
}
