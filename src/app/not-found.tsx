import Link from "next/link"
import { tv } from "tailwind-variants"

const notFoundStyle = tv({
  slots: {
    base: "flex flex-col justify-center items-center min-h-screen",
    title: "text-8xl font-bold",
    subtitle: " ",
    anchor: [
      "bg-black text-white hover:bg-gray-900 shadow",
      "ease-in duration-150 transition-all",
      "px-3 py-1.5 mt-3 rounded-sm shadow-lg",
    ],
  }
})

export default function NotFound() {
  return <div className={notFoundStyle().base()}>
    <h1 className={notFoundStyle().title()}>404</h1>
    <p className={notFoundStyle().subtitle()}>Oops - Page not found...</p>
    <Link href={"/"} className={notFoundStyle().anchor()}>Go Home</Link>
  </div>
}