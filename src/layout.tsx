import { ReactNode } from "react"
import { Footer } from "./components/footer"
import { Header } from "./components/header"

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="flex flex-col gap-3">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
