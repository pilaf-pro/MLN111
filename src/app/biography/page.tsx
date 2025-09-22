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

const personalityTraits = [
  { trait: "Hiếu Học", icon: "📖", description: "Ham học hỏi suốt đời", percentage: 95 },
  { trait: "Khiêm Tốn", icon: "🙏", description: "Luôn nhận mình chưa biết", percentage: 90 },
  { trait: "Nhân Ái", icon: "❤️", description: "Yêu thương mọi người", percentage: 98 },
  { trait: "Cần Cù", icon: "💪", description: "Chăm chỉ không biết mệt", percentage: 92 },
  { trait: "Chính Trực", icon: "⚖️", description: "Ngay thẳng, công bằng", percentage: 96 },
  { trait: "Trí Tuệ", icon: "🧠", description: "Thông thái sâu sắc", percentage: 94 }
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

function PersonalityRadar() {
  const [selectedTrait, setSelectedTrait] = useState(0)

  return (
    <div className="bg-card rounded-3xl p-8 border shadow-xl">
      <h3 className="text-3xl font-bold text-center mb-8 text-foreground">
        Nhân Cách Khổng Tử
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {personalityTraits.map((trait, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${selectedTrait === index ? "bg-primary/10 border-2 border-primary" : "bg-background border border-border hover:bg-muted/20"
                }`}
              onClick={() => setSelectedTrait(index)}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{trait.icon}</span>
                  <div>
                    <h4 className="font-bold text-foreground">{trait.trait}</h4>
                    <p className="text-sm text-muted-foreground">{trait.description}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">{trait.percentage}%</div>
              </div>

              <div className="mt-3 bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: selectedTrait === index ? `${trait.percentage}%` : "0%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          key={selectedTrait}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">{personalityTraits[selectedTrait].icon}</div>
            <h4 className="text-3xl font-bold text-primary mb-4">
              {personalityTraits[selectedTrait].trait}
            </h4>
            <p className="text-xl text-muted-foreground mb-6">
              {personalityTraits[selectedTrait].description}
            </p>

            <div className="relative w-32 h-32 mx-auto">
              <motion.svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-primary"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: personalityTraits[selectedTrait].percentage / 100 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{
                    strokeDasharray: "251.2px",
                    strokeDashoffset: "251.2px"
                  }}
                />
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {personalityTraits[selectedTrait].percentage}%
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
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-50"
        style={{ width: progressWidth }}
      />

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

        <section className="py-32 px-4 bg-gradient-to-r from-muted/20 to-background">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-center mb-16 text-foreground"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Phân Tích Nhân Cách
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <PersonalityRadar />
            </motion.div>
          </div>
        </section>

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
