import { Inter, Oswald, Monoton } from "next/font/google"

// export const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   variable: "--font-inter",
//   preload: false,
// })

export const monoton = Monoton({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: false,
  variable: "--font-monoton",
})

export const oswald = Oswald({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: false,
  variable: "--font-oswald",
})
