import { comboUrl } from "@/lib/constants"
import { fetchWithToken } from "@/lib/jwt-token"
import { comboSchema } from "@/lib/schema-zod"
import { Twitter } from "lucide-react"
import { useEffect, useState } from "react"
import { TwitterShareButton } from "react-share"
import { Status } from "./status-logo"
import { Button } from "./ui/button"

type TwitterShareProps = {
  status: Status[]
  finalTime: string
}

export const ShareTwitter = (props: TwitterShareProps) => {
  const [combo, setCombo] = useState<number | null>(null)

  const getCombo = async () => {
    const response = await fetchWithToken(comboUrl)

    if (response.ok) {
      const data = await response.json()
      const parsedData = comboSchema.parse(data)
      setCombo(parsedData.combo)
    }
  }

  useEffect(() => {
    getCombo()
  }, [])

  if (!combo) return <>{"Chargement ..."}</>

  const generateSquare = (success: boolean) => {
    return success ? "🟩" : "🟥"
  }

  const generateString = (status: Status[]) => {
    let result = ""
    for (const statu of status) {
      result += generateSquare(statu === "success")
    }
    return result
  }

  const statusFormated = generateString(props.status)

  return (
    <TwitterShareButton url={"https://www.google.com/"} title={`${props.finalTime} | ${statusFormated} | x${combo}`}>
      <Button className="bg-blue-600 px-8 py-6 dark:bg-blue-900 hover:bg-blue-700 hover:dark:bg-blue-800">
        <Twitter size={32} className="dark:text-slate-200" />
        <span className="ml-2 dark:text-slate-200">Partager sur Twitter</span>
      </Button>
    </TwitterShareButton>
  )
}
