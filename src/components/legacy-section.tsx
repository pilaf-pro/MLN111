import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function LegacySection() {
  const legacyAspects = [
    {
      title: "Nho Giáo - Hệ Thống Tư Tưởng",
      description:
        "Nho giáo nhấn mạnh yếu tố đạo đức của mỗi cá nhân lẫn chính quyền, tính đúng đắn trong các mối quan hệ xã hội, sự công bằng, lòng nhân ái và tính chân thành.",
      impact: "Nền tảng văn hóa Á Đông",
      icon: "🏛️",
    },
    {
      title: "Giáo Dục & Sư Phạm",
      description:
        "Khổng Tử là nhà giáo dục vĩ đại đầu tiên, đề xướng 'Có giáo không loại', mở đường cho giáo dục đại chúng và phương pháp dạy học cá nhân hóa.",
      impact: "Cách mạng giáo dục cổ đại",
      icon: "📚",
    },
    {
      title: "Đạo Đức & Luân Lý",
      description:
        "Nguyên tắc vàng: 'Đừng làm điều gì mà bạn không muốn người khác làm cho mình' - một trong những biểu hiện sớm nhất của đạo đức nhân văn.",
      impact: "Chuẩn mực đạo đức phổ quát",
      icon: "⚖️",
    },
    {
      title: "Chính Trị & Xã Hội",
      description:
        "Tư tưởng 'Dân vi quý, xã tắc thứ chi, quân vi khinh' - đặt dân làm gốc, ảnh hưởng sâu sắc đến triết lý chính trị Á Đông.",
      impact: "Lý thuyết chính trị nhân văn",
      icon: "🏛️",
    },
  ]

  const modernInfluence = [
    {
      country: "Trung Quốc",
      description: "Nho giáo là nền tảng văn hóa, ảnh hưởng đến giáo dục, đạo đức xã hội và quản lý nhà nước",
      institutions: "Học viện Khổng Tử, Văn miếu",
    },
    {
      country: "Việt Nam",
      description: "Nho giáo du nhập từ thời Bắc thuộc, trở thành trụ cột văn hóa, giáo dục và thi cử",
      institutions: "Văn Miếu - Quốc Tử Giám, Khoa thi",
    },
    {
      country: "Hàn Quốc",
      description: "Nho giáo ảnh hưởng mạnh đến cấu trúc xã hội, giáo dục và văn hóa doanh nghiệp",
      institutions: "Seonggyungwan, Jongmyo",
    },
    {
      country: "Nhật Bản",
      description: "Nho giáo kết hợp với Thần đạo, ảnh hưởng đến bushido và văn hóa doanh nghiệp",
      institutions: "Yushima Seido, Ashikaga Gakko",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Di Sản & Ảnh Hưởng</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Sau hơn 2500 năm, tư tưởng Khổng Tử vẫn tiếp tục định hình văn hóa, giáo dục và xã hội của hàng tỷ người
            trên thế giới
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {legacyAspects.map((aspect, index) => (
            <Card
              key={index}
              className="border-2 border-cyan-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{aspect.icon}</span>
                  <Badge variant="outline" className="border-cyan-300 text-cyan-700">
                    {aspect.impact}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-cyan-700">{aspect.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{aspect.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-8">Ảnh Hưởng Toàn Cầu</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {modernInfluence.map((influence, index) => (
              <Card key={index} className="border-2 border-red-200 hover:border-red-300 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl text-red-700 flex items-center gap-2">
                    <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    {influence.country}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm leading-relaxed">{influence.description}</p>
                  <div className="p-3 bg-amber-50 rounded-md">
                    <p className="text-amber-800 font-medium text-sm">
                      <strong>Cơ sở:</strong> {influence.institutions}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-cyan-700 mb-4">Khổng Tử Trong Thời Đại Ngày Nay</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-foreground mb-2">Học viện Khổng Tử</h4>
                <p className="text-sm text-muted-foreground">
                  Hơn 500 học viện trên toàn thế giới, truyền bá văn hóa và ngôn ngữ Trung Hoa
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-foreground mb-2">Di sản UNESCO</h4>
                <p className="text-sm text-muted-foreground">
                  Khổng miếu, mộ Khổng Tử và khu nhà thờ họ Khổng được UNESCO công nhận
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-foreground mb-2">Dòng họ Khổng</h4>
                <p className="text-sm text-muted-foreground">
                  Gia phả lớn nhất thế giới với hơn 2 triệu hậu duệ được ghi nhận
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
