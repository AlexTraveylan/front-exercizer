import { CheckCircle2, CircleDot, CircleEllipsis, XCircle } from "lucide-react"

export type Status = "success" | "fail" | "pending" | "None"

const logoCheck = <CheckCircle2 className="text-succes" />
const logofail = <XCircle className="text-destructive" />
const logoPending = <CircleEllipsis className="text-warning" />
const logoNone = <CircleDot />

export const StatusLogo = ({ status }: { status: Status }) => {
  return (
    <>
      {status === "success" && logoCheck}
      {status === "fail" && logofail}
      {status === "pending" && logoPending}
      {status === "None" && logoNone}
    </>
  )
}
