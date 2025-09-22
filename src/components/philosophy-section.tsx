import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, BookOpen, Scale } from "lucide-react"

const philosophies = [
  {
    icon: Heart,
    title: "Nhân (仁)",
    description: "Lòng nhân ái, tình yêu thương con người",
    content:
      "Nhân là đức tính cao nhất trong tư tưởng Khổng Tử, thể hiện tình yêu thương, lòng từ bi và sự quan tâm đến người khác.",
  },
  {
    icon: Users,
    title: "Lễ (礼)",
    description: "Phép tắc xã hội và đạo đức",
    content: "Lễ là hệ thống các quy tắc xã hội, giúp duy trì trật tự và hòa hợp trong cộng đồng.",
  },
  {
    icon: BookOpen,
    title: "Trí (智)",
    description: "Trí tuệ và ham học hỏi",
    content: "Trí tuệ không chỉ là kiến thức mà còn là khả năng phán đoán đúng đắn và hiểu biết sâu sắc về cuộc sống.",
  },
  {
    icon: Scale,
    title: "Nghĩa (义)",
    description: "Sự công bằng và chính trực",
    content: "Nghĩa là làm điều đúng đắn, công bằng, không vì lợi ích cá nhân mà làm tổn hại đến người khác.",
  },
]

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Triết Học Khổng Tử</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Khám phá những nguyên lý cốt lõi của Nho giáo - hệ tư tưởng đã ảnh hưởng sâu sắc đến văn hóa Á Đông
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {philosophies.map((philosophy, index) => {
            const IconComponent = philosophy.icon
            return (
              <Card key={index} className="bg-card hover:shadow-lg transition-shadow duration-300 border-border">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-card-foreground">{philosophy.title}</CardTitle>
                  <CardDescription className="text-accent font-medium">{philosophy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground text-center leading-relaxed">{philosophy.content}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
