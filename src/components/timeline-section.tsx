"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, GraduationCap, Crown, Scroll, Heart } from "lucide-react"

const timelineEvents = [
  {
    year: "551 TCN",
    age: "Sinh",
    title: "Ra đời tại ấp Trâu, thôn Xương Bình",
    description: "Khổng Khâu sinh ra tại nước Lỗ (nay là huyện Khúc Phụ, tỉnh Sơn Đông)",
    details:
      "Cha là Thúc Lương Hột (70 tuổi), mẹ là Nhan Trưng Tại (18 tuổi). Cuộc hôn nhân này được gọi là 'dã hợp' vì chênh lệch tuổi tác lớn. Tên Khâu được đặt theo Ni Khâu - nơi cha mẹ cầu con.",
    category: "Thời thơ ấu",
    icon: User,
    location: "Nước Lỗ",
  },
  {
    year: "549 TCN",
    age: "2 tuổi",
    title: "Mồ côi cha",
    description: "Thúc Lương Hột qua đời, Khổng Tử sống với mẹ trong cảnh nghèo khó",
    details:
      "Vì nhà nghèo nên khi còn trẻ phải làm nhiều nghề để mưu sinh như gạt thóc, chăn gia súc cho họ Quí - một dòng họ quý tộc lớn ở nước Lỗ. Dù vậy, ông vẫn ham học hỏi.",
    category: "Thời thơ ấu",
  },
  {
    year: "536 TCN",
    age: "15 tuổi",
    title: "Bắt đầu tập trung học đạo",
    description: "Nghiên cứu lễ giáo và các môn học khác, đặt nền móng cho tư tưởng sau này",
    details:
      "Khổng Tử nói: 'Mười lăm tuổi ta chí học'. Đây là thời điểm ông bắt đầu nghiêm túc với việc học tập và nghiên cứu các kinh điển cổ.",
    category: "Học tập",
  },
  {
    year: "532 TCN",
    age: "19 tuổi",
    title: "Lấy vợ và sinh con",
    description: "Kết hôn và năm sau sinh con đầu lòng đặt tên là Lí, tự là Bá Ngư",
    details:
      "Cuộc sống gia đình ổn định giúp Khổng Tử có điều kiện tập trung vào việc học tập và sau này là giảng dạy.",
    category: "Gia đình",
  },
  {
    year: "529 TCN",
    age: "22 tuổi",
    title: "Bắt đầu sự nghiệp giáo dục",
    description: "Mở trường dạy học tư nhân, đề xướng 'Có giáo không loại'",
    details:
      "Khổng Tử bắt đầu nhận học trò không phân biệt xuất thân, tạo ra cuộc cách mạng giáo dục. Phương pháp 'nhân tài mà giáo' của ông trở thành nền tảng sư phạm.",
    category: "Giáo dục",
  },
  {
    year: "521 TCN",
    age: "30 tuổi",
    title: "Đi Lạc Dương nghiên cứu",
    description: "Được Lỗ Chiêu Công cử đi Lạc Dương tham quan và khảo cứu luật lệ, thư tịch cổ",
    details:
      "Cùng với Nam Cung Quát, được ban cho một cỗ xe song mã và một người hầu. Chuyến đi này giúp ông mở rộng kiến thức về lễ nhạc và văn hóa cổ đại.",
    category: "Học tập",
  },
  {
    year: "516 TCN",
    age: "35 tuổi",
    title: "Tạm lánh sang nước Tề",
    description: "Theo Lỗ Chiêu Công lánh nạn khi Quý Bình Tử khởi loạn",
    details:
      "Tề Cảnh Công rất khâm phục, muốn phong đất Ni Khê cho ông nhưng bị Tướng quốc Án Anh ngăn cản. Ông ở Tề 6 năm trước khi về Lỗ.",
    category: "Chính trị",
  },
  {
    year: "501 TCN",
    age: "50 tuổi",
    title: "Làm quan tại nước Lỗ",
    description: "Được Lỗ Định công mời làm Trung đô tế, sau thăng Tư không rồi Đại tư khấu",
    details:
      "Trong thời gian làm quan, ông thực hiện nhiều cải cách tích cực. Khuyên vua thu hồi binh quyền của ba dòng họ quý tộc để tăng cường quyền lực trung ương.",
    category: "Chính trị",
  },
  {
    year: "496 TCN",
    age: "55 tuổi",
    title: "Bắt đầu cuộc chu du 14 năm",
    description: "Xin từ chức, rời nước Lỗ để truyền bá tư tưởng khắp các nước chư hầu",
    details:
      "Thất vọng vì vua Lỗ bỏ bê việc triều chính sau khi nhận 80 thiếu nữ đẹp từ nước Tề. Cùng đệ tử đi qua nhiều nước như Vệ, Trần, Thái, Tống nhưng không ai áp dụng đạo trị quốc của ông.",
    category: "Chu du",
  },
  {
    year: "482 TCN",
    age: "69 tuổi",
    title: "Trở về nước Lỗ",
    description: "Kết thúc cuộc chu du, về quê hương chuyên tâm viết sách và giảng dạy",
    details:
      "Tập trung biên soạn và san định các kinh điển cổ, tạo thành bộ Ngũ Kinh. Tổng số môn đệ có lúc lên tới 3.000 người, trong đó 72 người được liệt vào hạng tài giỏi (Thất thập nhị hiền).",
    category: "Giáo dục",
  },
  {
    year: "479 TCN",
    age: "71 tuổi",
    title: "Qua đời tại nước Lỗ",
    description: "Khổng Tử qua đời ngày 11 tháng 4, để lại di sản tư tưởng bất hủ",
    details:
      "Mất khi tâm nguyện chưa thành - không thể thực hiện được lý tưởng chính trị. Tuy nhiên, tư tưởng của ông được các đệ tử ghi chép lại trong Luận Ngữ và trở thành nền tảng văn hóa Á Đông.",
    category: "Cuối đời",
  },
]

const categoryColors = {
  "Thời thơ ấu": "bg-blue-100 text-blue-800 border-blue-200",
  "Học tập": "bg-green-100 text-green-800 border-green-200",
  "Gia đình": "bg-pink-100 text-pink-800 border-pink-200",
  "Giáo dục": "bg-purple-100 text-purple-800 border-purple-200",
  "Chính trị": "bg-red-100 text-red-800 border-red-200",
  "Chu du": "bg-orange-100 text-orange-800 border-orange-200",
  "Cuối đời": "bg-gray-100 text-gray-800 border-gray-200",
}

export function TimelineSection() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  return (
    <section id="timeline" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Cuộc Đời Khổng Tử</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Hành trình 71 năm của một nhà tư tưởng vĩ đại từ thời thơ ấu nghèo khó đến khi trở thành biểu tượng trí tuệ
            của nhân loại
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {Object.entries(categoryColors).map(([category, colorClass]) => (
              <Badge key={category} variant="outline" className={colorClass}>
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-red-400 to-amber-400 hidden md:block"></div>

            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block"></div>

                  <Card
                    className={`ml-0 md:ml-16 cursor-pointer transition-all duration-300 ${selectedEvent === index
                        ? "ring-2 ring-primary shadow-xl scale-[1.02]"
                        : "hover:shadow-lg hover:scale-[1.01]"
                      } border-border`}
                  >
                    <CardHeader
                      onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                      className="pb-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge
                              variant="outline"
                              className={categoryColors[event.category as keyof typeof categoryColors]}
                            >
                              {event.category}
                            </Badge>
                            <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                              {event.age}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-bold text-card-foreground mb-1">{event.title}</CardTitle>
                          <CardDescription className="text-primary font-bold text-lg mb-2">
                            {event.year}
                          </CardDescription>
                          <p className="text-card-foreground text-pretty leading-relaxed">{event.description}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-4 shrink-0">
                          {selectedEvent === index ? "Thu gọn" : "Chi tiết"}
                        </Button>
                      </div>
                    </CardHeader>

                    {selectedEvent === index && (
                      <CardContent className="pt-0 border-t border-border">
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-muted-foreground leading-relaxed text-pretty">{event.details}</p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
