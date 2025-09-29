import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { PageTransition } from "@/components/page-transition"
import { ConfuciusChatbot } from "@/components/confucius-chatbot"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Khổng Tử - Triết Gia Vĩ Đại",
  description: "Tìm hiểu về cuộc đời, triết học và giáo lý của Khổng Tử - nhà tư tưởng vĩ đại của Trung Quốc",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} font-sans`} suppressHydrationWarning={true}>
        <PageTransition>
          <Suspense fallback={null}>{children}</Suspense>
        </PageTransition>
        <ConfuciusChatbot />
        <Analytics />
      </body>
    </html>
  )
}
