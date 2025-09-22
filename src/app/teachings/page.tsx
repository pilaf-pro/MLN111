"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FallingLeaves } from "@/components/falling-leaves"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Quote, BookOpen, Heart, Users, Lightbulb, Star, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

const teachings = [
  {
    category: "Học Tập",
    icon: BookOpen,
    color: "green",
    symbolColor: "#10b981",
    gradient: "from-green-400 to-emerald-600",
    quotes: [
      {
        vietnamese: "Học mà không tư thì mờ mịt, tư mà không học thì nguy hiểm",
        chinese: "學而不思則罔，思而不學則殆",
        meaning: "Chỉ học mà không suy nghĩ thì sẽ mơ hồ, chỉ suy nghĩ mà không học thì sẽ nguy hiểm.",
        context: "Nhấn mạnh tầm quan trọng của việc kết hợp học tập và tư duy.",
        wisdom: "Cân bằng lý thuyết và thực hành",
      },
      {
        vietnamese: "Học rồi lại thường xuyên ôn tập, chẳng phải vui sao?",
        chinese: "學而時習之，不亦說乎？",
        meaning: "Học được kiến thức rồi thường xuyên ôn lại, đó không phải là điều vui sao?",
        context: "Câu mở đầu của Luận Ngữ, thể hiện niềm vui trong học tập.",
        wisdom: "Học tập là niềm vui, không phải gánh nặng",
      },
      {
        vietnamese: "Biết thì nói là biết, không biết thì nói là không biết, đó mới là biết",
        chinese: "知之為知之，不知為不知，是知也",
        meaning: "Biết thì thừa nhận là biết, không biết thì thừa nhận là không biết, đó mới thật sự là hiểu biết.",
        context: "Thái độ khiêm tốn và trung thực trong học tập.",
        wisdom: "Sự khiêm tốn là nền tảng của trí tuệ",
      },
    ],
  },
  {
    category: "Đạo Đức",
    icon: Heart,
    color: "red",
    symbolColor: "#ef4444",
    gradient: "from-red-400 to-rose-600",
    quotes: [
      {
        vietnamese: "Người có nhân thì yêu người, người có trí thì biết người",
        chinese: "仁者愛人，知者知人",
        meaning: "Người có lòng nhân ái thì yêu thương mọi người, người có trí tuệ thì hiểu biết về con người.",
        context: "Định nghĩa về hai đức tính quan trọng: nhân và trí.",
        wisdom: "Yêu thương và hiểu biết đi đôi với nhau",
      },
      {
        vietnamese: "Đừng làm điều gì mà bạn không muốn người khác làm cho mình",
        chinese: "己所不欲，勿施於人",
        meaning: "Điều gì mình không muốn thì đừng áp đặt lên người khác.",
        context: "Nguyên tắc vàng của đạo đức Khổng Tử.",
        wisdom: "Empathy là cơ sở của đạo đức",
      },
    ],
  },
  {
    category: "Xã Hội",
    icon: Users,
    color: "blue",
    symbolColor: "#3b82f6",
    gradient: "from-blue-400 to-indigo-600",
    quotes: [
      {
        vietnamese: "Quân tử hiểu về nghĩa, tiểu nhân hiểu về lợi",
        chinese: "君子喻於義，小人喻於利",
        meaning: "Người quân tử chỉ biết đến nghĩa, kẻ tiểu nhân chỉ biết đến lợi.",
        context: "Phân biệt giữa người có đạo đức và kẻ vụ lợi.",
        wisdom: "Đạo đức quan trọng hơn lợi ích",
      },
      {
        vietnamese: "Không có lễ thì không thể đứng vững được",
        chinese: "不學禮，無以立",
        meaning: "Không học lễ thì không thể lập thân trong xã hội.",
        context: "Tầm quan trọng của lễ giáo trong đời sống xã hội.",
        wisdom: "Lễ phép tạo nên trật tự xã hội",
      },
    ],
  },
  {
    category: "Trí Tuệ",
    icon: Lightbulb,
    color: "yellow",
    symbolColor: "#f59e0b",
    gradient: "from-yellow-400 to-orange-600",
    quotes: [
      {
        vietnamese: "Ba người đi cùng nhau, ắt có người làm thầy ta",
        chinese: "三人行，必有我師焉",
        meaning: "Trong ba người đi cùng, chắc chắn có người có thể làm thầy tôi.",
        context: "Tinh thần học hỏi từ mọi người xung quanh.",
        wisdom: "Mọi người đều có thể dạy ta điều gì đó",
      },
      {
        vietnamese: "Người xưa học để tu thân, người nay học để khoe khoang",
        chinese: "古之學者為己，今之學者為人",
        meaning: "Người xưa học để hoàn thiện bản thân, người nay học để làm cho người khác biết.",
        context: "So sánh động cơ học tập giữa xưa và nay.",
        wisdom: "Học tập phải hướng về nội tâm",
      },
    ],
  },
]

const colorClasses = {
  green: "border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-green-100",
  red: "border-red-200 hover:border-red-400 bg-gradient-to-br from-red-50 to-red-100",
  blue: "border-blue-200 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100",
  yellow: "border-yellow-200 hover:border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100",
}

// Interactive Quote Carousel Component
function InteractiveQuoteCarousel({ teaching }: { teaching: any }) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)

  const currentQuote = teaching.quotes[currentQuoteIndex]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextQuote()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentQuoteIndex, isAutoPlaying])

  const nextQuote = () => {
    setDirection(1)
    setCurrentQuoteIndex((prev) => (prev + 1) % teaching.quotes.length)
  }

  const prevQuote = () => {
    setDirection(-1)
    setCurrentQuoteIndex((prev) => (prev - 1 + teaching.quotes.length) % teaching.quotes.length)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <div className="relative h-80 overflow-hidden">
      {/* Quote Display */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentQuoteIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
          }}
          className="absolute inset-0 flex flex-col justify-center space-y-4"
        >
          <div
            className="p-6 rounded-xl backdrop-blur-sm border-2 space-y-4"
            style={{
              backgroundColor: teaching.symbolColor + "10",
              borderColor: teaching.symbolColor + "30"
            }}
          >
            <Quote className="w-8 h-8 mx-auto" style={{ color: teaching.symbolColor }} />

            <blockquote className="text-xl font-bold text-center text-foreground leading-relaxed">
              "{currentQuote.vietnamese}"
            </blockquote>

            <cite className="block text-center text-muted-foreground text-lg">
              {currentQuote.chinese}
            </cite>

            <div className="bg-white/70 rounded-lg p-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Ý nghĩa:</strong> {currentQuote.meaning}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Bối cảnh:</strong> {currentQuote.context}
              </p>
              <p className="text-sm font-medium" style={{ color: teaching.symbolColor }}>
                <strong>Triết lý:</strong> {currentQuote.wisdom}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevQuote}
          className="w-10 h-10 p-0 rounded-full border-2"
          style={{ borderColor: teaching.symbolColor + "50" }}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 p-0 rounded-full border-2"
          style={{ borderColor: teaching.symbolColor + "50" }}
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={nextQuote}
          className="w-10 h-10 p-0 rounded-full border-2"
          style={{ borderColor: teaching.symbolColor + "50" }}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {teaching.quotes.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentQuoteIndex ? 1 : -1)
              setCurrentQuoteIndex(index)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentQuoteIndex ? "scale-125" : "scale-100 opacity-50"
              }`}
            style={{
              backgroundColor: index === currentQuoteIndex ? teaching.symbolColor : teaching.symbolColor + "50"
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Enhanced 3D Teaching Card Component
function Enhanced3DTeachingCard({ teaching, index }: { teaching: any; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]))
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [index])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const IconComponent = teaching.icon

  return (
    <motion.div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02, z: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card
          className={`${colorClasses[teaching.color as keyof typeof colorClasses]} border-2 transition-all duration-500 hover:shadow-2xl h-full relative overflow-hidden`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 30px 30px, ${teaching.symbolColor} 2px, transparent 2px)`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            style={{ transform: "translateX(-100%)" }}
            animate={isHovered ? { transform: "translateX(100%)", opacity: [0, 0.3, 0] } : {}}
            transition={{ duration: 0.8 }}
          />

          <CardHeader className="text-center relative z-10">
            <motion.div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
              style={{
                background: `linear-gradient(135deg, ${teaching.symbolColor}20, ${teaching.symbolColor}40)`,
                border: `3px solid ${teaching.symbolColor}`
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <IconComponent className="w-10 h-10" style={{ color: teaching.symbolColor }} />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-card-foreground">{teaching.category}</CardTitle>
            <CardDescription className="text-accent font-medium">
              {teaching.quotes.length} lời dạy quý báu
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <InteractiveQuoteCarousel teaching={teaching} />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default function TeachingsPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FallingLeaves />
      <Header />

      <main className="pt-20">
        {/* Enhanced Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
          {/* Parallax Background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{ y: backgroundY }}
          >
            <div className="absolute inset-0 bg-[url('/images/tranquil-chinese-landscape-with-mountains-and-trad.jpg')] bg-cover bg-center"></div>
          </motion.div>

          {/* Animated Wisdom Characters */}
          <div className="absolute inset-0 pointer-events-none">
            {["学", "思", "仁", "义", "礼", "智"].map((char, index) => (
              <motion.div
                key={index}
                className="absolute text-5xl font-bold opacity-10 text-amber-600"
                style={{
                  left: `${15 + index * 15}%`,
                  top: `${20 + (index % 2) * 40}%`
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              >
                {char}
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 text-lg px-4 py-2 bg-amber-100 text-amber-800 border-amber-300">
                Luận Ngữ
              </Badge>

              <motion.h1
                className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Giáo Lý Khổng Tử
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-muted-foreground text-pretty"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Những lời dạy quý báu từ Luận Ngữ - Kho tàng trí tuệ của nhân loại
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Teaching Categories */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Bốn Lĩnh Vực Giáo Lý
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {teachings.map((teaching, index) => (
                <Enhanced3DTeachingCard key={index} teaching={teaching} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Quote with 3D Effects */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 50px 50px, #f59e0b 3px, transparent 3px)`,
                backgroundSize: '100px 100px'
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, rotateY: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Floating sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + (i % 2) * 60}%`
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>

              <Star className="w-12 h-12 text-primary mx-auto mb-6" />
              <blockquote className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                "Có bạn từ phương xa đến, chẳng phải vui sao?"
              </blockquote>
              <cite className="text-xl text-muted-foreground mb-6">有朋自遠方來，不亦樂乎？</cite>
              <motion.p
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Câu nói thể hiện niềm vui khi gặp gỡ bạn bé, thể hiện tinh thần cởi mở và hiếu khách của Khổng Tử.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Wisdom Summary */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Tinh Hoa Tư Tưởng
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: BookOpen, title: "Học Tập Suốt Đời", desc: "Không ngừng học hỏi và tự hoàn thiện bản thân", color: "#10b981" },
                { icon: Heart, title: "Lòng Nhân Ái", desc: "Yêu thương và quan tâm đến người khác", color: "#ef4444" },
                { icon: Users, title: "Hòa Hợp Xã Hội", desc: "Xây dựng xã hội văn minh và công bằng", color: "#3b82f6" }
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border-2 relative overflow-hidden">
                      {/* Background Glow */}
                      <div
                        className="absolute inset-0 opacity-5"
                        style={{ backgroundColor: item.color }}
                      />

                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <IconComponent className="w-12 h-12 mx-auto mb-4" style={{ color: item.color }} />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
