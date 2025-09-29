"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FallingLeaves } from "@/components/falling-leaves"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Enhanced Biography Data
const lifePhases = [
  {
    phase: "Thời Thơ Ấu",
    years: "551-534 TCN",
    age: "0-17 tuổi",
    icon: "👶",
    color: "from-blue-400 to-cyan-500",
    events: [
      {
        year: "551 TCN",
        title: "Ra đời tại Khúc Phụ",
        description: "Sinh ra trong gia đình quý tộc nghèo khó",
        details: "Tên Khổng Khâu, tự Trọng Ni. Cha Thúc Lương Hột 70 tuổi, mẹ Nhan thị 18 tuổi.",
        significance: "Khởi đầu của một cuộc đời phi thường"
      },
      {
        year: "549 TCN",
        title: "Mồ côi cha",
        description: "Sống với mẹ trong cảnh nghèo khó",
        details: "Phải làm nhiều nghề để mưu sinh: gạt thóc, chăn gia súc, giữ kho.",
        significance: "Trải nghiệm khó khăn tạo nên tính cách kiên cường"
      }
    ]
  },
  {
    phase: "Thời Thanh Niên",
    years: "534-501 TCN",
    age: "17-50 tuổi",
    icon: "🎓",
    color: "from-green-400 to-emerald-500",
    events: [
      {
        year: "536 TCN",
        title: "Chí học",
        description: "15 tuổi chí học - bắt đầu nghiêm túc với học tập",
        details: "Tự học các kinh điển cổ, nghiên cứu lễ nhạc và văn hóa.",
        significance: "Nền tảng tri thức cho sự nghiệp sau này"
      },
      {
        year: "529 TCN",
        title: "Mở trường dạy học",
        description: "22 tuổi bắt đầu nhận đệ tử",
        details: "Đề xướng 'Có giáo không loại' - giáo dục cho mọi tầng lớp.",
        significance: "Cách mạng giáo dục trong xã hội phong kiến"
      }
    ]
  },
  {
    phase: "Thời Trung Niên",
    years: "501-484 TCN",
    age: "50-67 tuổi",
    icon: "🏛️",
    color: "from-purple-400 to-violet-500",
    events: [
      {
        year: "501 TCN",
        title: "Bước vào chính trường",
        description: "Làm Trung đô tế, sau thăng Tư không và Đại tư khấu",
        details: "Thực hiện nhiều cải cách tích cực, củng cố quyền lực trung ương.",
        significance: "Thể hiện lý tưởng chính trị qua thực tiễn"
      },
      {
        year: "496 TCN",
        title: "Chu du các nước",
        description: "Bắt đầu cuộc hành trình 14 năm",
        details: "Đi qua Vệ, Trần, Thái, Tống... tìm kiếm cơ hội thực hiện lý tưởng.",
        significance: "Lan tỏa tư tưởng khắp các nước chư hầu"
      }
    ]
  },
  {
    phase: "Thời Tuổi Già",
    years: "484-479 TCN",
    age: "67-71 tuổi",
    icon: "📚",
    color: "from-amber-400 to-orange-500",
    events: [
      {
        year: "484 TCN",
        title: "Trở về cố hương",
        description: "Kết thúc chu du, về Lỗ viết sách và dạy học",
        details: "Biên soạn Ngũ Kinh, tổng kết tư tưởng và truyền đạt cho đệ tử.",
        significance: "Hoàn thiện hệ thống tư tưởng Nho giáo"
      },
      {
        year: "479 TCN",
        title: "Qua đời",
        description: "Về cõi vĩnh hằng, để lại di sản vô giá",
        details: "71 tuổi, tâm nguyện chưa thành nhưng để lại nền tảng văn hóa bất hủ.",
        significance: "Khởi đầu của ảnh hưởng vĩnh viễn đến nhân loại"
      }
    ]
  }
]

const majorWorks = [
  {
    title: "Kinh Thi (詩經)",
    subtitle: "Tập thơ cổ",
    description: "Sưu tầm và biên tập 300 bài thơ dân gian",
    content: "Khổng Tử đã chọn lọc từ hàng nghìn bài thơ cổ để tạo thành bộ sưu tập 300 bài thơ nhằm giáo dục tình cảm trong sáng và cách diễn đạt rõ ràng.",
    icon: "📜",
    color: "from-pink-400 to-rose-500",
    significance: "Nền tảng văn học và giáo dục cảm xúc",
    quote: "Không học Kinh Thi thì không biết nói năng ra sao"
  },
  {
    title: "Kinh Thư (書經)",
    subtitle: "Sử sách cổ",
    description: "Ghi chép các truyền thuyết và biến cố lịch sử",
    content: "Lưu giữ các câu chuyện về các vị vua cổ, từ những minh quân như Nghiêu, Thuấn đến những bạo chủ như Kiệt, Trụ.",
    icon: "📚",
    color: "from-blue-400 to-indigo-500",
    significance: "Bài học lịch sử cho các thế hệ lãnh đạo",
    quote: "Học sử để biết hưng thịnh và suy vong"
  },
  {
    title: "Kinh Lễ (禮記)",
    subtitle: "Quy tắc xã hội",
    description: "Hệ thống các nghi lễ và quy tắc ứng xử",
    content: "Khổng Tử biên soạn các quy tắc lễ nghi để duy trì trật tự xã hội và hòa hợp trong cộng đồng.",
    icon: "🏛️",
    color: "from-purple-400 to-violet-500",
    significance: "Nền tảng trật tự xã hội và đạo đức",
    quote: "Không học Kinh Lễ thì không biết đi đứng ở đời"
  },
  {
    title: "Kinh Dịch (易經)",
    subtitle: "Triết học vũ trụ",
    description: "Tư tưởng triết học về âm dương và bát quái",
    content: "Khổng Tử đã giảng giải và bình luận về Chu Dịch, tạo nên các bài Thoán truyện và Hào truyện.",
    icon: "☯️",
    color: "from-green-400 to-emerald-500",
    significance: "Hiểu biết về quy luật vũ trụ và đời sống",
    quote: "Cả đời nghiên cứu Kinh Dịch để hiểu đạo trời đất"
  },
  {
    title: "Kinh Xuân Thu (春秋)",
    subtitle: "Biên niên sử",
    description: "Lịch sử nước Lỗ với góc nhìn đạo đức",
    content: "Không chỉ ghi chép sự kiện mà còn đưa ra các lời bình luận có tính giáo dục đạo đức cho các nhà lãnh đạo.",
    icon: "📖",
    color: "from-amber-400 to-orange-500",
    significance: "Kết hợp sử học với giáo dục đạo đức",
    quote: "Xuân Thu là để dạy cho hậu thế biết phải trái"
  }
]

const educationalPrinciples = [
  {
    principle: "Có giáo không loại",
    description: "Giáo dục cho mọi người, không phân biệt xuất thân",
    percentage: 100,
    icon: "🎓"
  },
  {
    principle: "Nhân tài giáo dục",
    description: "Dạy học theo năng lực và đặc điểm từng người",
    percentage: 95,
    icon: "👥"
  },
  {
    principle: "Học mà thời tập chi",
    description: "Học xong phải thường xuyên ôn tập",
    percentage: 90,
    icon: "🔄"
  },
  {
    principle: "Tứ tuyệt",
    description: "Không độc đoán, không chắc chắn tuyệt đối, không cố chấp, không tự cao",
    percentage: 88,
    icon: "🧘"
  }
]

function InteractiveLifePhase({ phase, index }: { phase: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 300)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
    >
      <motion.div
        className="relative mb-20"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className={`relative overflow-hidden border-2 border-transparent bg-gradient-to-r ${phase.color} p-1 rounded-3xl shadow-xl`}>
          <div className="bg-card rounded-3xl p-8 h-full">
            <div className="text-center mb-8">
              <motion.div
                className="text-8xl mb-4 inline-block"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {phase.icon}
              </motion.div>
              <h3 className="text-4xl font-bold mb-2 text-foreground">{phase.phase}</h3>
              <Badge className="text-lg px-4 py-2 mb-4">{phase.years}</Badge>
              <p className="text-xl text-muted-foreground">{phase.age}</p>
            </div>

            <div className="space-y-6">
              {phase.events.map((event: any, eventIndex: number) => (
                <motion.div
                  key={eventIndex}
                  className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border"
                  initial={{ opacity: 0, x: eventIndex % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: eventIndex * 0.2 }}
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {event.year}
                    </Badge>
                  </div>

                  <h4 className="text-2xl font-bold text-primary mb-3">{event.title}</h4>
                  <p className="text-foreground mb-4 leading-relaxed">{event.description}</p>

                  <motion.div
                    className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="border-t pt-4 space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>Chi tiết:</strong> {event.details}
                      </p>
                      <p className="text-primary font-medium">
                        <strong>Ý nghĩa:</strong> {event.significance}
                      </p>
                    </div>
                  </motion.div>

                  <motion.button
                    className="mt-4 text-primary hover:text-secondary font-medium transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                    whileHover={{ x: 5 }}
                  >
                    {isExpanded ? "Thu gọn" : "Xem chi tiết"} →
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function InteractiveMajorWork({ work, index }: { work: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
    >
      <motion.div
        className="relative mb-8"
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className={`relative overflow-hidden border-2 bg-gradient-to-r ${work.color} p-1 rounded-3xl shadow-xl`}>
          <div className="bg-card rounded-3xl p-6 h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="text-4xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                >
                  {work.icon}
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{work.title}</h3>
                  <p className="text-lg text-muted-foreground">{work.subtitle}</p>
                </div>
              </div>
            </div>

            <p className="text-foreground mb-4 text-lg">{work.description}</p>

            <motion.div
              className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="border-t pt-4 space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Nội dung:</strong> {work.content}
                </p>
                <p className="text-primary font-medium">
                  <strong>Ý nghĩa:</strong> {work.significance}
                </p>
                <blockquote className="text-primary italic border-l-4 border-primary pl-4">
                  "{work.quote}"
                </blockquote>
              </div>
            </motion.div>

            <motion.button
              className="mt-4 text-primary hover:text-secondary font-medium transition-colors flex items-center space-x-2"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ x: 5 }}
            >
              <span>{isExpanded ? "Thu gọn" : "Xem chi tiết"}</span>
              <motion.span
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function EducationalPhilosophy() {
  const [selectedPrinciple, setSelectedPrinciple] = useState(0)

  return (
    <div className="bg-card rounded-3xl p-8 border shadow-xl">
      <h3 className="text-3xl font-bold text-center mb-8 text-foreground">
        Nguyên Tắc Giáo Dục
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {educationalPrinciples.map((item, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${selectedPrinciple === index ? "bg-primary/10 border-2 border-primary" : "bg-background border border-border hover:bg-muted/20"}`}
              onClick={() => setSelectedPrinciple(index)}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-foreground">{item.principle}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="text-xl font-bold text-primary">{item.percentage}%</div>
              </div>

              <div className="mt-3 bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: selectedPrinciple === index ? `${item.percentage}%` : "0%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          key={selectedPrinciple}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border flex flex-col justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">{educationalPrinciples[selectedPrinciple].icon}</div>
            <h4 className="text-2xl font-bold text-primary mb-4">
              {educationalPrinciples[selectedPrinciple].principle}
            </h4>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {educationalPrinciples[selectedPrinciple].description}
            </p>

            <div className="relative w-24 h-24 mx-auto">
              <motion.svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-primary"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: educationalPrinciples[selectedPrinciple].percentage / 100 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{
                    strokeDasharray: "219.8px",
                    strokeDashoffset: "219.8px"
                  }}
                />
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">
                  {educationalPrinciples[selectedPrinciple].percentage}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function BiographyPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
      {/* <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-50"
        style={{ width: progressWidth }}
      /> */}

      <FallingLeaves />
      <Header />

      <main className="pt-20">
        <section className="py-32 px-4 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
            style={{ y: backgroundY }}
          />

          <div className="absolute inset-0 bg-[url('/images/tranquil-chinese-landscape-with-mountains-and-trad.jpg')] bg-cover bg-center opacity-10"></div>

          <div className="absolute inset-0 overflow-hidden">
            {['儒', '聖', '師', '學', '德'].map((char, i) => (
              <motion.div
                key={char}
                className="absolute text-6xl text-primary/20 font-bold"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  rotate: [-10, 10, -10],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut"
                }}
              >
                {char}
              </motion.div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Badge className="mb-6 text-xl px-6 py-3 bg-primary/10 text-primary border-primary/30">
                551 - 479 TCN • 71 năm cuộc đời
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 text-balance">
                Hành Trình Của
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary block">
                  Chí Thánh Tiên Sư
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground text-pretty max-w-4xl mx-auto leading-relaxed">
                Từ một đứa trẻ mồ côi cha đến vị triết gia vĩ đại nhất trong lịch sử Trung Hoa
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-center mb-20 text-foreground"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Bốn Giai Đoạn Cuộc Đời
            </motion.h2>

            <div className="space-y-32">
              {lifePhases.map((phase, index) => (
                <InteractiveLifePhase key={index} phase={phase} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-center mb-20 text-foreground"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ngũ Kinh - Tác Phẩm Vĩ Đại
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {majorWorks.map((work, index) => (
                <InteractiveMajorWork key={index} work={work} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* <section className="py-32 px-4 bg-gradient-to-r from-muted/20 to-background">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-center mb-16 text-foreground"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Triết Lý Giáo Dục
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <EducationalPhilosophy />
            </motion.div>
          </div>
        </section> */}

        <section className="py-32 px-4 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
          />

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <blockquote className="text-4xl md:text-6xl font-bold text-white mb-8 text-balance leading-tight">
                "Học mà không tư thì mờ mịt,<br />
                tư mà không học thì nguy hiểm"
              </blockquote>
              <cite className="text-2xl md:text-3xl text-primary-foreground/80 block mb-8">
                學而不思則罔，思而不學則殆
              </cite>
              <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
                Lời dạy bất hủ về tầm quan trọng của việc kết hợp học tập và tư duy -
                bài học vẫn còn nguyên giá trị sau hơn 2500 năm
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
