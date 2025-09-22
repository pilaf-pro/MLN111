import { Card, CardContent } from "@/components/ui/card"

export function BiographySection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Tiểu Sử Khổng Tử</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Khổng Khâu (孔丘), tự Trọng Ni (仲尼), sinh ngày 28 tháng 9 năm 551 TCN tại ấp Trâu, thôn Xương Bình, nước
            Lỗ (nay là huyện Khúc Phụ, tỉnh Sơn Đông)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-cyan-200 hover:border-cyan-300 transition-colors">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-cyan-700 mb-4">Xuất Thân & Gia Đình</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Dòng dõi quý tộc:</strong> Khổng Tử thuộc dòng dõi quý tộc nước
                  Tống, là hậu duệ của các quân chủ nhà Thương. Tổ tiên 6 đời là Khổng Phụ Gia, từng làm Đại tư mã dưới
                  triều Tống Thương công.
                </p>
                <p>
                  <strong className="text-foreground">Cha mẹ:</strong> Cha là Thúc Lương Hột (Khổng Hột), mẹ là Nhan
                  thị. Cuộc hôn nhân này được gọi là "dã hợp" vì chênh lệch tuổi tác lớn (cha 70 tuổi, mẹ 18 tuổi).
                </p>
                <p>
                  <strong className="text-foreground">Thời thơ ấu:</strong> Mồ côi cha lúc 2 tuổi, sống trong cảnh nghèo
                  khó, phải làm nhiều nghề như gạt thóc, chăn gia súc để mưu sinh.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 hover:border-red-300 transition-colors">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-red-700 mb-4">Sự Nghiệp & Cuộc Đời</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Giáo dục:</strong> Bắt đầu dạy học từ 22 tuổi, tổng số môn đệ lên
                  tới 3.000 người, trong đó có 72 người được liệt vào hạng tài giỏi (Thất thập nhị hiền).
                </p>
                <p>
                  <strong className="text-foreground">Chính trị:</strong> 50 tuổi được vua Lỗ Định công mời làm Trung đô
                  tế, sau đó thăng chức Tư không rồi Đại tư khấu. Khuyên vua thu hồi binh quyền của ba dòng họ quý tộc.
                </p>
                <p>
                  <strong className="text-foreground">Chu du:</strong> 55 tuổi xin từ chức, chu du các nước chư hầu để
                  truyền bá tư tưởng. 69 tuổi về Lỗ chuyên tâm viết sách, mất năm 71 tuổi khi tâm nguyện chưa thành.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-amber-700 mb-6 text-center">Tên Gọi & Thụy Hiệu</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Tên thật & Tự:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <strong>Tên thật:</strong> Khổng Khâu (孔丘)
                  </li>
                  <li>
                    <strong>Tự:</strong> Trọng Ni (仲尼)
                  </li>
                  <li>
                    <strong>Tôn xưng:</strong> Khổng Tử, Khổng Phu Tử
                  </li>
                  <li>
                    <strong>Phiên âm Tây phương:</strong> Confucius
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Thụy hiệu qua các triều đại:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Bao thành tuyên Ni công (Hán Bình Đế)</li>
                  <li>• Văn Tuyên vương (Đường Huyền Tông)</li>
                  <li>• Đại thánh Văn Tuyên vương (Tống Chân Tông)</li>
                  <li>• Chí thánh tiên sư (Minh Thế Tông)</li>
                  <li>• Đại thành chí thánh Văn Tuyên vương Thánh sư (Thanh)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
