import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Welcome to Weather App!",
  description: "Just some weird application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
