import { Route, Routes } from "react-router-dom"
import { CommentForm } from "./components/comment-form"
import { EnonceQuestions } from "./components/enonce-questions"
import { Fonctionnement } from "./components/fonctionnement"
import { Historique } from "./components/historique"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EnonceQuestions />} />
      <Route path="/commentaire" element={<CommentForm />} />
      <Route path="/fonctionnement" element={<Fonctionnement />} />
      <Route path="/historique" element={<Historique />} />
    </Routes>
  )
}
