import { Twitter } from "lucide-react"
import { TwitterShareButton } from "react-share"
import { Button } from "./ui/button"

export const ShareTwitter = () => {
  return (
    <TwitterShareButton url={"https://www.google.com/"} title={"math quotidien"}>
      <Button className="bg-blue-600 px-8 py-6">
        <Twitter size={32} />
        <span className="ml-2">Partager sur Twitter</span>
      </Button>
    </TwitterShareButton>
  )
}
