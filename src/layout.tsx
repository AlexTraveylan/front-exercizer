import { ReactNode } from "react"
import { Footer } from "./components/footer"
import { Header } from "./components/header"

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">{children}</main>
      <Footer />
    </div>
  )
}
