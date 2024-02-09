import { historyUrl } from "@/lib/constants"
import { History } from "@/lib/schema-zod"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const Historique = () => {
  const [exercices, setData] = useState<History | null>(null)

  const getHistory = async () => {
    const response = await fetch(historyUrl)

    if (response.ok) {
      try {
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    getHistory()
  }, [])

  if (!exercices || exercices.length === 0) {
    return <div>Loading ...</div>
  }

  return (
    <>
      {exercices.map((exercice, exo_index) => (
        <Card key={`exo_${exo_index}`} className="max-w-3xl w-screen min-w-[350px]">
          <CardHeader>
            <CardTitle>Exercice n°{exo_index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3 flex-col">
            <h1>{exercice.enonce}</h1>
            {exercice.questions.map((question, index) => (
              <div key={`question_${index}`}>
                <h2 className="font-semibold">Question n°{index + 1} :</h2>
                <h2>{question}</h2>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  )
}
