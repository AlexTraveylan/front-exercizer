import { ModeToggle } from "./mode-toggle"

export const Header = () => (
  <div className="sticky top-0 p-5 w-full flex items-center justify-between">
    <h1>Header</h1>
    <ModeToggle />
  </div>
)
