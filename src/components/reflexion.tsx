import { reflexionUrl } from "@/lib/constants"
import { Reflexion, reflexionSchema } from "@/lib/schema-zod"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const ReflexionR = () => {
  const [reflexion, setReflexion] = useState<Reflexion | null>(null)

  async function getReflexion() {
    const response = await fetch(reflexionUrl)
    if (response.ok) {
      const data = await response.json()
      const parsedData = reflexionSchema.parse(data)
      setReflexion(parsedData)
    }
  }

  useEffect(() => {
    getReflexion()
  }, [])

  if (!reflexion) {
    return <div>Chargement de la reflexion</div>
  }

  return (
    <Card className="max-w-3xl w-screen min-w-[350px]">
      <CardHeader>
        <CardTitle>{"Reflexion"}</CardTitle>
        <CardDescription>{"Je demande ensuite à chatGPT de prendre un rôle d'élève et de critiquer l'exercice initial."}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {reflexion.reflexion.split("\n").map((reflexion, index) => {
          return <h1 key={index + 1000}>{reflexion}</h1>
        })}
      </CardContent>
    </Card>
  )
}
