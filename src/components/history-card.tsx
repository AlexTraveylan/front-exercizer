import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

import { HistoryQuestion } from "@/lib/schema-zod"

type HistoryCardProps = {
  exercice: HistoryQuestion
  index: number
}

export const HistoryCard = (props: HistoryCardProps) => {
  const { exercice, index: exo_index } = props

  const [isCorrectionVisible, setIsCorrectionVisible] = useState<boolean>(false)

  if (!isCorrectionVisible) {
    return (
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
        <CardFooter>
          <div className="text-sm cursor-pointer text-slate-500 hover:text-slate-400" onClick={() => setIsCorrectionVisible(true)}>
            Voir la correction
          </div>
        </CardFooter>
      </Card>
    )
  } else {
    return (
      <Card key={`exo_${exo_index}`} className="max-w-3xl w-screen min-w-[350px]">
        <CardHeader>
          <CardTitle>Correction de l'exercice n°{exo_index + 1}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 flex-col">
          {exercice.reponses.map((response, index) => (
            <div key={`response_${index}`}>
              <h2 className="font-semibold">Réponse n°{index + 1} :</h2>
              <h2>{response}</h2>
            </div>
          ))}
          {exercice.explications.map((explanation, index) => (
            <div key={`explanation_${index}`}>
              <h2 className="font-semibold">Explication n°{index + 1} :</h2>
              <h2>{explanation}</h2>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <div className="text-sm cursor-pointer text-slate-500 hover:text-slate-400" onClick={() => setIsCorrectionVisible(false)}>
            Cacher la correction
          </div>
        </CardFooter>
      </Card>
    )
  }
}
