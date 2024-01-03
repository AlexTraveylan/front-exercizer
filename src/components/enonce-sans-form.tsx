import { questionsUrl } from "@/lib/constants"
import { Enonce, enonceSchema } from "@/lib/schema-zod"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const EnonceQuestionsSansForm = () => {
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

  if (data && data.questions.length > 0) {
    return (
      <div className="flex flex-col gap-3">
        <Card className="max-w-3xl w-screen min-w-[350px]">
          <CardHeader>
            <CardTitle>{"Résultat final !"}</CardTitle>
            <CardDescription>{"Et voila enfin le résultat obtenu de la réflexion"}</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3 flex-col">
            <h1>{data.enonce}</h1>
            {data.questions.map((question, index) => (
              <div key={index}>
                <h2 className="font-semibold">Question n°{index + 1} :</h2>
                <h2>{question}</h2>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return <div>Loading ...</div>
}
