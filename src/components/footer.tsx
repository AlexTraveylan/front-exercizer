import { NavBar } from "./nav-bar"

export const Footer = () => {
  return (
    <div className="p-5 w-full flex flex-wrap items-baseline justify-between gap-5 border-t border-gray-200">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold">{"Visiter"}</h1>
        <NavBar />
      </div>

      <div className="flex flex-col gap-3">
        <a href="https://github.com/AlexTraveylan" className="font-semibold" target="_blank">
          {"Créer par Alex Traveylan"}
        </a>
        <h1>Version 1.0.0</h1>
      </div>
    </div>
  )
}
