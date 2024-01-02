import { EnonceQuestionsSansForm } from "./enonce-sans-form"
import { FirstVersion } from "./first_version"
import { ReflexionR } from "./reflexion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export const Fonctionnement = () => {
  return (
    <div className="flex flex-col gap-5">
      <Card className="max-w-3xl w-screen min-w-[350px]">
        <CardHeader>
          <CardTitle>Fonctionnement</CardTitle>
          <CardDescription>{"Je décris ici le fonctionnement du site !"}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <h1>{"Comment ça marche ?"}</h1>
          <h2 className="indent-5">
            {"J'ai construit un prompt qui demande à chatGPT de créer un énoncé d'exercice de mathématiques pour un élève de 4eme."}
          </h2>
          <h2 className="indent-5">
            {
              "Ce prompt le force à le donner sous un format que je peux facilement utilisé pour récupérer enoncé, questions, réponses et explications"
            }
          </h2>
          <h2 className="indent-5">
            {"Je demande ensuite à chatGPT de prendre un rôle d'élève et de critiquer l'exercice initial. Je récupère ensuite sa reflexion."}
          </h2>
          <h2 className="indent-5">{"Je demande à chatGPT de prendre un rôle de professeur et se corriger et recupéré un exercice parfait !"}</h2>
        </CardContent>
        <CardFooter>{"Soutien moi en partageant chaque jour tes résultats sur les réseaux sociaux !"}</CardFooter>
      </Card>
      <FirstVersion />
      <ReflexionR />
      <EnonceQuestionsSansForm />
    </div>
  )
}
