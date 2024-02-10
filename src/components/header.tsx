import { ModeToggle } from "./mode-toggle"
import { NombreParticipants } from "./nombre-participants"

export const Header = () => (
  <div className="px-5 w-full flex items-center justify-between border-b border-gray-200">
    <a href="/">
      <img src="/logo.ico" alt="logo" className="w-24" />
    </a>
    <NombreParticipants />
    <ModeToggle />
  </div>
)
