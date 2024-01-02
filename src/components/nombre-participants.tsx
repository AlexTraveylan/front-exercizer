import { nbPropositionsUrl } from "@/lib/constants"
import { NbPropositions, nbPropositionsSchema } from "@/lib/schema-zod"
import { useEffect, useState } from "react"

export const NombreParticipants = () => {
  const [nbParticipants, setNbParticipants] = useState<NbPropositions | null>(null)

  async function getNbParticipants() {
    const response = await fetch(nbPropositionsUrl)
    if (response.ok) {
      const data = await response.json()
      const parseddata = nbPropositionsSchema.parse(data)
      setNbParticipants(parseddata)
    }
  }

  useEffect(() => {
    getNbParticipants()
  }, [])

  if (!nbParticipants) return <></>

  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-2xl">{nbParticipants.nb_propositions}</h2>
        <h2>participant{nbParticipants.nb_propositions > 1 && "s"}</h2>
      </div>
      <div className="flex items-center gap-2">
        <h2 className="text-2xl">{`${nbParticipants.pourcentage} %`}</h2>
        <h2>{"de réussite"}</h2>
      </div>
    </div>
  )
}
