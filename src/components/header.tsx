import { ModeToggle } from "./mode-toggle"

export const Header = () => (
  <div className="sticky top-0 px-5 w-full flex items-center justify-between border-b border-gray-200">
    <img src="/logo.png" alt="logo" className="w-24" />
    <ModeToggle />
  </div>
)
