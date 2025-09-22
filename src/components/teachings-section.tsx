import { Card, CardContent } from "@/components/ui/card"

const teachings = [
  {
    quote: "Tam nhân hành, tất hữu ngã sư",
    translation: "Ba người đi, nhất định có người thầy của ta",
    meaning: "Luôn có thể học hỏi từ người khác, dù họ là ai.",
  },
  {
    quote: "Tri chi vi tri chi, bất tri vi bất tri",
    translation: "Biết thì nói là biết, không biết thì nói là không biết",
    meaning: "Sự thành thật trong việc thừa nhận kiến thức của mình.",
  },
  {
    quote: "Kỷ sở bất dục, vật thi ư nhân",
    translation: "Điều mình không muốn, đừng làm cho người khác",
    meaning: "Nguyên tắc vàng của đạo đức và lòng nhân ái.",
  },
  {
    quote: "Học nhi thời tập chi, bất diệc duyệt hồ",
    translation: "Học rồi thường xuyên ôn tập, không phải vui sao?",
    meaning: "Niềm vui trong việc học hỏi và rèn luyện bản thân.",
  },
  {
    quote: "Quân tử ư kỳ ngôn, vô sở bất cẩn",
    translation: "Quân tử trong lời nói, không có gì không thận trọng",
    meaning: "Người quân tử luôn cẩn thận trong lời nói.",
  },
  {
    quote: "Nhân giả bất ưu, trí giả bất hoặc, dũng giả bất cụ",
    translation: "Người nhân không lo âu, người trí không hoang mang, người dũng không sợ hãi",
    meaning: "Ba đức tính quan trọng của con người hoàn thiện.",
  },
]

export function TeachingsSection() {
  return (
    <section id="teachings" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Giáo Lý Khổng Tử</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Những lời dạy bất hủ từ Luận Ngữ - kho tàng trí tuệ cho mọi thời đại
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachings.map((teaching, index) => (
            <Card
              key={index}
              className="bg-card hover:shadow-lg transition-all duration-300 hover:scale-105 border-border"
            >
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="mb-6">
                    <p className="text-2xl font-bold text-accent mb-2 text-balance">"{teaching.quote}"</p>
                    <p className="text-lg text-card-foreground italic mb-4 text-pretty">{teaching.translation}</p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-muted-foreground leading-relaxed text-pretty">{teaching.meaning}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
