"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const scrollToPhilosophy = () => {
    const element = document.getElementById("philosophy")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-muted to-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/tranquil-chinese-landscape-with-mountains-and-trad.jpg"
          alt="Phong cảnh Trung Quốc cổ điển"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
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
          <div className="text-2xl md:text-3xl text-cyan-700 font-semibold mb-2">孔夫子 (Confucius)</div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-pretty">
            Chí Thánh Tiên Sư - Nhà Hiền Triết Trung Quốc Mẫu Mực Nhất
          </p>
          <div className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <p className="mb-2">
              <strong className="text-foreground">Tên thật:</strong> Khổng Khâu (孔丘) •
              <strong className="text-foreground"> Tự:</strong> Trọng Ni (仲尼)
            </p>
            <p>Triết gia, chính trị gia và nhà giáo dục vĩ đại, người sáng lập ra hệ thống tư tưởng Nho giáo</p>
          </div>
        </div>

        {/* Multiple Famous Quotes */}
        <div className="space-y-6 mb-8">
          <div className="bg-primary/10 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-3 text-balance">
              "Học mà không tư thì mờ mịt, tư mà không học thì nguy hiểm"
            </blockquote>
            <cite className="text-base text-muted-foreground">學而不思則罔，思而不學則殆</cite>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
              <blockquote className="text-lg font-medium text-cyan-800 mb-2 text-balance">
                "Đừng làm điều gì mà bạn không muốn người khác làm cho mình"
              </blockquote>
              <cite className="text-sm text-cyan-600">Nguyên tắc vàng của Khổng Tử</cite>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <blockquote className="text-lg font-medium text-red-800 mb-2 text-balance">
                "Ta chỉ thuật lại mà không sáng tác, ta tin tưởng và hâm mộ văn hóa cổ"
              </blockquote>
              <cite className="text-sm text-red-600">Về việc biên soạn Ngũ Kinh</cite>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={scrollToPhilosophy}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
          >
            Khám Phá Triết Học
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById("biography")?.scrollIntoView({ behavior: "smooth" })}
            className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 px-8 py-3 text-lg"
          >
            Tìm Hiểu Tiểu Sử
          </Button>
        </div>
        {/* </CHANGE> */}
      </div>
    </section>
  )
}
