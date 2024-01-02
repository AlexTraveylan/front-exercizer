import { firstVersionUrl } from "@/lib/constants"
import { Enonce, enonceSchema } from "@/lib/schema-zod"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const FirstVersion = () => {
  const [firstVersion, setFirstVersion] = useState<Enonce | null>(null)

  async function getFirstVersion() {
    const response = await fetch(firstVersionUrl)
    if (response.ok) {
      const data = await response.json()
      const parsedData = enonceSchema.parse(data)
      setFirstVersion(parsedData)
    }
  }

  useEffect(() => {
    getFirstVersion()
  }, [])

  if (!firstVersion) {
    return <div>Chargement de l'énoncé</div>
  }

  return (
    <Card className="max-w-3xl w-screen min-w-[350px]">
      <CardHeader>
        <CardTitle>{"Premiere version"}</CardTitle>
        <CardDescription>{"Une premiere version est générée avec mon prompt initial"}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-3 flex-col">
        <h1>{firstVersion.enonce}</h1>
        {firstVersion.questions.map((question, index) => (
          <div key={index}>
            <h2 className="font-semibold">Question n°{index + 1} :</h2>
            <h2>{question}</h2>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
