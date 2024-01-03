import { checkUrl, questionsUrl } from "@/lib/constants"
import { fetchWithToken, stockToken } from "@/lib/jwt-token"
import { Enonce, enonceSchema } from "@/lib/schema-zod"
import { formatedDate } from "@/lib/utils"
import { useEffect, useState } from "react"
import { AfficherTimer } from "./afficher-timer"
import { ResponsesForm } from "./responses-form"
import { ReviensDemain } from "./reviens-demain"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const EnonceQuestions = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [data, setData] = useState<Enonce | null>(null)
  const [check, setCheck] = useState<boolean>(false)

  const getEnonce = async () => {
    const response = await fetchWithToken(questionsUrl)

    if (response.ok) {
      try {
        const data = await response.json()
        const parsedData = enonceSchema.parse(data)
        setData(parsedData)
        stockToken(parsedData.token)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const getCheck = async () => {
    const response = await fetchWithToken(checkUrl)

    if (response.ok) {
      setCheck(true)
    }
  }

  useEffect(() => {
    getCheck()
  }, [])

  useEffect(() => {
    if (check) {
      getEnonce()
    }
  }, [check])

  if (!check) {
    return <ReviensDemain />
  }

  if (data && data.questions.length > 0) {
    return (
      <div className="flex flex-col gap-3">
        {isRunning && <AfficherTimer />}
        <Card className="max-w-3xl w-screen min-w-[350px]">
          <CardHeader>
            <CardTitle>Problème du jour</CardTitle>
            <CardDescription>{formatedDate(new Date().toDateString())}</CardDescription>
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

        <ResponsesForm nbQuestions={data.questions.length} setIsRunning={setIsRunning} />
      </div>
    )
  }

  return <div>Loading ...</div>
}
