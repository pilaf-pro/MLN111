import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function WorksSection() {
  const works = [
    {
      title: "Kinh Thi (詩經)",
      description:
        "Sưu tầm các bài thơ dân gian, san định thành 300 thiên nhằm giáo dục tình cảm trong sáng lành mạnh và cách thức diễn đạt rõ ràng.",
      quote: "Không học Kinh Thi thì không biết nói năng ra sao",
      category: "Văn học",
    },
    {
      title: "Kinh Thư (書經)",
      description:
        "Lưu lại các truyền thuyết, biến cố về các đời vua cổ. San định lại để các ông vua đời sau nên theo gương các minh quân như Nghiêu, Thuấn.",
      quote: "Học từ lịch sử để trị nước",
      category: "Lịch sử",
    },
    {
      title: "Kinh Lễ (禮記)",
      description:
        "Chép các lễ nghi thời trước, hiệu đính lại mong dùng làm phương tiện để duy trì và ổn định trật tự xã hội.",
      quote: "Không học Kinh Lễ thì không biết đi đứng ở đời",
      category: "Lễ nghi",
    },
    {
      title: "Kinh Dịch (易經)",
      description:
        "Nói về các tư tưởng triết học Trung Hoa dựa trên các khái niệm âm dương, bát quái. Khổng Tử giảng giải thêm Thoán truyện và Hào truyện.",
      quote: "Hiểu biết về vũ trụ và con người",
      category: "Triết học",
    },
    {
      title: "Kinh Xuân Thu (春秋)",
      description:
        "Chép các biến cố xảy ra ở nước Lỗ. Không chỉ ghi chép như sử gia mà chọn lọc sự kiện, ghi kèm lời bình để giáo dục vua chúa.",
      quote: "Lịch sử là gương soi cho hiện tại",
      category: "Sử học",
    },
    {
      title: "Kinh Nhạc (樂經)",
      description:
        "Bàn về nhạc thuật và nhạc khí, nhưng nguyên bản đã bị thiêu hủy trong Chiến tranh Hán-Sở, chỉ còn đôi chút trong Kinh Lễ.",
      quote: "Âm nhạc thanh lọc tâm hồn",
      category: "Nghệ thuật",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Ngũ Kinh - Tác Phẩm Bất Hủ</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Khổng Tử san định lại các kinh sách của Thánh hiền đời trước, tạo thành bộ Ngũ Kinh - bách khoa toàn thư đầu
            tiên trong lịch sử Trung Quốc
          </p>
          <div className="mt-6 p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
            <p className="text-cyan-800 font-medium italic">
              "Ta chỉ thuật lại mà không sáng tác. Ta tin tưởng và hâm mộ văn hóa cổ. Ta trộm ví mình như Lão Bành." -
              Khổng Tử
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, index) => (
            <Card
              key={index}
              className="border-2 hover:border-cyan-300 transition-all duration-300 hover:shadow-lg group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                    {work.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-cyan-700 group-hover:text-cyan-600 transition-colors">
                  {work.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{work.description}</p>
                <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-md border-l-3 border-amber-400">
                  <p className="text-amber-800 font-medium text-sm italic">"{work.quote}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-red-700 mb-4">Ý Nghĩa Lịch Sử</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Bộ Ngũ Kinh không chỉ là tài liệu học thuật mà còn là nền tảng văn hóa, giáo dục và đạo đức của nền văn
                minh Á Đông. Những tác phẩm này đã định hình tư duy và lối sống của hàng tỷ người qua hơn 2500 năm lịch
                sử.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
