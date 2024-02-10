import { historyUrl } from "@/lib/constants"
import { History, historySchema } from "@/lib/schema-zod"
import { useEffect, useState } from "react"
import { HistoryCard } from "./history-card"

export const Historique = () => {
  const [exercices, setData] = useState<History | null>(null)

  const getHistory = async () => {
    const response = await fetch(historyUrl)

    if (response.ok) {
      try {
        const data = await response.json()
        const parsedData = historySchema.parse(data)
        console.log(parsedData)
        setData(parsedData)
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
        <HistoryCard key={`exo_${exo_index}`} exercice={exercice} index={exo_index} />
      ))}
    </>
  )
}
