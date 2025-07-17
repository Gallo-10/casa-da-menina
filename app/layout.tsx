import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Casa da Menina São Francisco de Assis",
  keywords: [
    "Casa da Menina",
    "Acolhimento",
    "Proteção",
    "Entidade sem fins lucrativos",
    "Assis",
    "São Francisco de Assis",
    "Floriano de Oliveira Garcez",
    "Monsenhor Floriano",
    "Rua Dr. Luiz Pizza",
    "Centro",
    "Assis/SP"
  ],
  authors: [{ name: "Casa da Menina São Francisco de Assis" }],
  creator: "Casa da Menina São Francisco de Assis",
  publisher: "Casa da Menina São Francisco de Assis",
  robots: "index, follow",
  alternates: {
    canonical: "https://casadamenina.com"
  },
  openGraph: {
    title: "Casa da Menina São Francisco de Assis",
    description: "A Casa da Menina São Francisco de Assis é uma entidade sem fins lucrativos, fundada em 10 de abril de 1962 por Floriano de Oliveira Garcez (Monsenhor Floriano).Está localizada à Rua Dr. Luiz Pizza, 165 – Centro – Assis/SP.",
    url: "https://casadamenina.com",
    siteName: "Casa da Menina",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Casa da Menina São Francisco de Assis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa da Menina São Francisco de Assis",
    description: "A Casa da Menina São Francisco de Assis é uma entidade sem fins lucrativos, fundada em 10 de abril de 1962 por Floriano de Oliveira Garcez (Monsenhor Floriano).Está localizada à Rua Dr. Luiz Pizza, 165 – Centro – Assis/SP.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/images/logo.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [
      { url: "/images/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
