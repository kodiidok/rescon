import { Fira_Code as FontMono, Inter as FontSans, Readex_Pro as ReadexPro } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontRaedex = ReadexPro({
  subsets: ["latin"],
  variable: "--font-raedex",
})