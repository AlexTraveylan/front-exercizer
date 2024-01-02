import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const AfficherTimer = () => {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const formatTimer = (timer: number) => {
    const hours = Math.floor(timer / 3600)
    const minutes = Math.floor((timer % 3600) / 60)
    const seconds = timer % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="max-w-3xl w-screen min-w-[350px]">
      <CardHeader>
        <CardTitle>{"Chronomètre"}</CardTitle>
        <CardDescription>{"Seras-tu assez rapide ?"}</CardDescription>
      </CardHeader>
      <CardContent>{formatTimer(timer)}</CardContent>
    </Card>
  )
}
