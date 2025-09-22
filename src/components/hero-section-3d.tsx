"use client"

import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Dynamic import Canvas component để tránh SSR
const Dynamic3DScene = dynamic(() => import("./3d-scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
      <div className="text-6xl text-cyan-600 animate-pulse">孔</div>
    </div>
  )
})

export function HeroSection3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-muted to-background">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0" suppressHydrationWarning={true}>
        <Dynamic3DScene />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50" suppressHydrationWarning={true}>
        <div className="mb-8" suppressHydrationWarning={true}>
          <div className="flex flex-wrap justify-center gap-2 mb-6" suppressHydrationWarning={true}>
            <Badge variant="outline" className="border-cyan-300 text-cyan-700 px-3 py-1">
              551 - 479 TCN
            </Badge>
            <Badge variant="outline" className="border-red-300 text-red-700 px-3 py-1">
              Thời Xuân Thu
            </Badge>
            <Badge variant="outline" className="border-amber-300 text-amber-700 px-3 py-1">
              Nước Lỗ
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance">Khổng Phu Tử</h1>
          <div className="text-2xl md:text-3xl text-cyan-700 font-semibold mb-2" suppressHydrationWarning={true}>孔夫子 (Confucius)</div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-pretty">
            Chí Thánh Tiên Sư - Nhà Hiền Triết Trung Quốc Mẫu Mực Nhất
          </p>
        </div>

        {/* Interactive Quote */}
        <div className="bg-primary/10 backdrop-blur-sm rounded-lg p-6 border border-primary/20 mb-8 hover:bg-primary/15 transition-colors" suppressHydrationWarning={true}>
          <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-3 text-balance">
            "Học mà không tư thì mờ mịt, tư mà không học thì nguy hiểm"
          </blockquote>
          <cite className="text-base text-muted-foreground">學而不思則罔，思而不學則殆</cite>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center" suppressHydrationWarning={true}>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg transform hover:scale-105 transition-transform"
          >
            <a href="/philosophy">Khám Phá Triết Học</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 px-8 py-3 text-lg transform hover:scale-105 transition-transform bg-transparent"
          >
            <a href="/biography">Tìm Hiểu Tiểu Sử</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
