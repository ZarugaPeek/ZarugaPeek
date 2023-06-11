import "./globals.css"
import { Inter } from "next/font/google"

import { Footer } from "./footer"
import { Header } from "./header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <div className={"relative flex min-h-screen flex-col"}>
          <Header />
          <main className={"container mt-6 flex-1"}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
