import { comboUrl } from "@/lib/constants"
import { fetchWithToken } from "@/lib/jwt-token"
import { comboSchema } from "@/lib/schema-zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useEffect, useState } from "react"

export const ReviensDemain = () => {
  const [combo, setCombo] = useState<number | null>(null)

  const formattedDate = format(new Date(), "EEEE d MMMM yyyy", { locale: fr })
  const formatedWithFirstLetterUppercase = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

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

  if (!combo) return <>{"Erreur dans la récupération du combo"}</>

  return (
    <div className="flex flex-col gap-3 items-center px-3">
      <h1 className="text-2xl">{formatedWithFirstLetterUppercase}</h1>
      <h1>{`Score de combo actuel : ${combo}`}</h1>
      <h1 className="text-center">{"Reviens chaque jour pour améliorer ton score de combo !"}</h1>
    </div>
  )
}
