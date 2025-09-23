"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FallingLeaves } from "@/components/falling-leaves"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, BookOpen, Scale, Quote, ChevronRight, Sparkles, Compass } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

const philosophies = [
  {
    icon: Heart,
    title: "Nhân (仁)",
    description: "Lòng nhân ái, tình yêu thương con người",
    content:
      "Nhân là đức tính cao nhất trong tư tưởng Khổng Tử, thể hiện tình yêu thương, lòng từ bi và sự quan tâm đến người khác.",
    color: "red",
    quote: "Người có nhân thì yêu người, người có trí thì biết người",
    chineseQuote: "仁者愛人，知者知人",
    symbolColor: "#ef4444",
    position: { x: 150, y: 0 },
    details: [
      "Nhân là nền tảng của mọi đức tính khác",
      "Thể hiện qua việc yêu thương gia đình, bạn bè",
      "Mở rộng tình yêu từ cá nhân đến cộng đồng",
      "Cơ sở cho việc xây dựng xã hội hài hòa",
    ],
  },
  {
    icon: Users,
    title: "Lễ (礼)",
    description: "Phép tắc xã hội và đạo đức",
    content: "Lễ là hệ thống các quy tắc xã hội, giúp duy trì trật tự và hòa hợp trong cộng đồng.",
    color: "blue",
    quote: "Không có lễ thì không thể đứng vững được",
    chineseQuote: "不學禮，無以立",
    symbolColor: "#3b82f6",
    position: { x: 0, y: 150 },
    details: [
      "Quy định cách ứng xử trong xã hội",
      "Thể hiện sự tôn trọng lẫn nhau",
      "Duy trì trật tự xã hội",
      "Cân bằng giữa quyền lợi và nghĩa vụ",
    ],
  },
  {
    icon: BookOpen,
    title: "Trí (智)",
    description: "Trí tuệ và ham học hỏi",
    content: "Trí tuệ không chỉ là kiến thức mà còn là khả năng phán đoán đúng đắn và hiểu biết sâu sắc về cuộc sống.",
    color: "green",
    quote: "Học mà không tư thì mờ mịt, tư mà không học thì nguy hiểm",
    chineseQuote: "學而不思則罔，思而不學則殆",
    symbolColor: "#10b981",
    position: { x: -150, y: 0 },
    details: [
      "Học tập suốt đời",
      "Kết hợp lý thuyết và thực hành",
      "Phát triển tư duy phản biện",
      "Áp dụng kiến thức vào cuộc sống",
    ],
  },
  {
    icon: Scale,
    title: "Nghĩa (义)",
    description: "Sự công bằng và chính trực",
    content: "Nghĩa là làm điều đúng đắn, công bằng, không vì lợi ích cá nhân mà làm tổn hại đến người khác.",
    color: "purple",
    quote: "Quân tử hiểu về nghĩa, tiểu nhân hiểu về lợi",
    chineseQuote: "君子喻於義，小人喻於利",
    symbolColor: "#8b5cf6",
    position: { x: 0, y: -150 },
    details: [
      "Ưu tiên đạo đức hơn lợi ích",
      "Hành động vì công lý",
      "Chịu trách nhiệm với hành động",
      "Đặt lợi ích chung lên trên",
    ],
  },
]

// Floating wisdom particles data
const wisdomParticles = [
  { char: "智", color: "#10b981" },
  { char: "仁", color: "#ef4444" },
  { char: "礼", color: "#3b82f6" },
  { char: "义", color: "#8b5cf6" },
  { char: "和", color: "#f59e0b" },
  { char: "德", color: "#06b6d4" },
  { char: "学", color: "#84cc16" },
  { char: "道", color: "#f97316" },
]

// Floating Wisdom Particles Component
function FloatingWisdomParticles() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })

      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {wisdomParticles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl font-bold opacity-20"
          style={{ color: particle.color }}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            rotate: 0,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          {particle.char}
        </motion.div>
      ))}
    </div>
  )
}

// Enhanced Interactive Philosophy Card with 3D effects
function Enhanced3DPhilosophyCard({ philosophy, index }: { philosophy: any; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
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

  const IconComponent = philosophy.icon
  const colorClasses = {
    red: "border-red-200 hover:border-red-400 bg-gradient-to-br from-red-50 to-red-100",
    blue: "border-blue-200 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100",
    green: "border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-green-100",
    purple: "border-purple-200 hover:border-purple-400 bg-gradient-to-br from-purple-50 to-purple-100",
  }

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
        whileHover={{ scale: 1.05, z: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card
          className={`${colorClasses[philosophy.color as keyof typeof colorClasses]} border-2 transition-all duration-500 hover:shadow-2xl cursor-pointer relative overflow-hidden`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 20px 20px, ${philosophy.symbolColor} 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            style={{ transform: "translateX(-100%)" }}
            animate={isHovered ? { transform: "translateX(100%)", opacity: [0, 0.3, 0] } : {}}
            transition={{ duration: 0.6 }}
          />

          <CardHeader className="text-center relative z-10">
            <motion.div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${isExpanded ? "scale-110" : ""}`}
              style={{ backgroundColor: philosophy.symbolColor + "20", border: `2px solid ${philosophy.symbolColor}` }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <IconComponent className="w-10 h-10" style={{ color: philosophy.symbolColor }} />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-card-foreground">{philosophy.title}</CardTitle>
            <CardDescription className="text-accent font-medium">{philosophy.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-card-foreground text-center leading-relaxed mb-4">{philosophy.content}</p>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <div className="border-t pt-4 mt-4">
                    <motion.div
                      className="bg-white/70 backdrop-blur-sm rounded-lg p-4 mb-4 border"
                      style={{ borderColor: philosophy.symbolColor + "30" }}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Quote className="w-5 h-5 mb-2" style={{ color: philosophy.symbolColor }} />
                      <blockquote className="text-sm font-medium text-foreground mb-2">"{philosophy.quote}"</blockquote>
                      <cite className="text-xs text-muted-foreground">{philosophy.chineseQuote}</cite>
                    </motion.div>

                    <h4 className="font-semibold mb-3 text-foreground">Ý nghĩa chi tiết:</h4>
                    <ul className="space-y-2">
                      {philosophy.details.map((detail: string, i: number) => (
                        <motion.li
                          key={i}
                          className="flex items-start space-x-2 text-sm"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: philosophy.symbolColor }} />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-4 hover:bg-white/50"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
            >
              {isExpanded ? "Thu gọn" : "Xem thêm"}
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-4 h-4 ml-2" />
              </motion.div>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function PhilosophyWheel() {
  const [rotation, setRotation] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.5)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-80 h-80 mx-auto mb-12">
      <div
        className="absolute inset-0 rounded-full border-4 border-primary/20"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {philosophies.map((philosophy, index) => {
          const angle = index * 90 - 45
          const x = Math.cos((angle * Math.PI) / 180) * 120
          const y = Math.sin((angle * Math.PI) / 180) * 120
          const IconComponent = philosophy.icon

          return (
            <div
              key={index}
              className={`absolute w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${selectedIndex === index
                ? "bg-primary text-primary-foreground scale-125 shadow-lg"
                : "bg-background border-2 border-primary/30 hover:scale-110"
                }`}
              style={{
                left: `calc(50% + ${x}px - 32px)`,
                top: `calc(50% + ${y}px - 32px)`,
                transform: `rotate(${-rotation}deg)`,
              }}
              onClick={() => setSelectedIndex(index)}
            >
              <IconComponent className="w-6 h-6" />
            </div>
          )
        })}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center bg-background rounded-full w-32 h-32 flex flex-col items-center justify-center border-4 border-primary shadow-lg">
          <div className="text-2xl font-bold text-primary">
            {philosophies[selectedIndex].title.split("(")[0].trim()}
          </div>
          <div className="text-sm text-muted-foreground">
            {philosophies[selectedIndex].title.match(/$$(.*?)$$/)?.[1]}
          </div>
        </div>
      </div>
    </div>
  )
}

// Interactive 3D Philosophy Wheel  
function Interactive3DPhilosophyWheel() {
  const [rotation, setRotation] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.3)
    }, 50)
    return () => clearInterval(interval)
  }, [isAutoRotating])

  const handlePhilosophySelect = (index: number) => {
    setSelectedIndex(index)
    setIsAutoRotating(false)
    setTimeout(() => setIsAutoRotating(true), 5000)
  }

  return (
    <div className="relative w-96 h-96 mx-auto mb-12">
      <motion.div
        className="absolute inset-0 rounded-full border-4 shadow-2xl"
        style={{
          background: "conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #ef4444, #06b6d4)",
          padding: "4px"
        }}
        animate={{ rotate: rotation }}
        transition={{ ease: "linear" }}
      >
        <div className="w-full h-full rounded-full bg-background/80 backdrop-blur-sm"></div>
      </motion.div>

      <div className="absolute inset-0">
        {philosophies.map((philosophy, index) => {
          const angle = index * 90
          const radius = 130
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius
          const IconComponent = philosophy.icon

          return (
            <motion.div
              key={index}
              className={`absolute w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${selectedIndex === index ? "scale-125 shadow-2xl z-20" : "hover:scale-110 z-10"
                }`}
              style={{
                left: `calc(50% + ${x}px - 40px)`,
                top: `calc(50% + ${y}px - 40px)`,
                backgroundColor: philosophy.symbolColor + "20",
                border: `3px solid ${philosophy.symbolColor}`,
                boxShadow: selectedIndex === index ? `0 0 30px ${philosophy.symbolColor}50` : `0 0 15px ${philosophy.symbolColor}30`,
              }}
              onClick={() => handlePhilosophySelect(index)}
              whileHover={{ scale: 1.1, rotateZ: 5 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                rotateZ: selectedIndex === index ? 360 : 0,
                y: selectedIndex === index ? -5 : 0,
              }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <IconComponent className="w-8 h-8" style={{ color: philosophy.symbolColor }} />

              {selectedIndex === index && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{ backgroundColor: philosophy.symbolColor }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        x: Math.cos((i * 60 * Math.PI) / 180) * 40,
                        y: Math.sin((i * 60 * Math.PI) / 180) * 40,
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center bg-background/90 backdrop-blur-sm rounded-full w-40 h-40 flex flex-col items-center justify-center border-4 shadow-2xl relative overflow-hidden"
          style={{
            borderColor: philosophies[selectedIndex].symbolColor,
            boxShadow: `0 0 40px ${philosophies[selectedIndex].symbolColor}30`
          }}
          key={selectedIndex}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle, ${philosophies[selectedIndex].symbolColor} 0%, transparent 70%)`
            }}
          />

          <div className="relative z-10">
            <motion.div
              className="text-3xl font-bold mb-1"
              style={{ color: philosophies[selectedIndex].symbolColor }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {philosophies[selectedIndex].title.split("(")[0].trim()}
            </motion.div>
            <motion.div
              className="text-lg opacity-70"
              style={{ color: philosophies[selectedIndex].symbolColor }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {philosophies[selectedIndex].title.match(/\((.*?)\)/)?.[1]}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function PhilosophyPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FallingLeaves />
      <FloatingWisdomParticles />
      <Header />

      <main className="pt-20">
        {/* Enhanced Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
          {/* Parallax Background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #06b6d4 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%),
                               radial-gradient(circle at 50% 50%, #8b5cf6 0%, transparent 50%)`,
              y: backgroundY,
            }}
          />

          {/* Floating Chinese Characters */}
          <div className="absolute inset-0 pointer-events-none">
            {wisdomParticles.slice(0, 4).map((particle, index) => (
              <motion.div
                key={index}
                className="absolute text-6xl font-bold opacity-5"
                style={{
                  color: particle.color,
                  left: `${20 + index * 20}%`,
                  top: `${30 + index * 15}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {particle.char}
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Triết Học Khổng Tử
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Khám phá bốn trụ cột của tư tưởng Nho giáo
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <Interactive3DPhilosophyWheel />
            </motion.div>
          </div>
        </section>

        {/* Interactive Philosophy Cards */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Tứ Đức: Bốn Đức Tính Cốt Lõi
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {philosophies.map((philosophy, index) => (
                <Enhanced3DPhilosophyCard key={index} philosophy={philosophy} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy in Practice */}
        <section className="py-20 px-4 bg-gradient-to-r from-cyan-50 to-blue-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 40px 40px, #3b82f6 2px, transparent 2px)`,
                backgroundSize: '80px 80px'
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2
              className="text-4xl font-bold mb-8 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Triết Học Trong Thực Tiễn
            </motion.h2>
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                "Đạo không xa người. Người làm đạo mà xa người, không thể coi là đạo được"
              </blockquote>
              <cite className="text-lg text-muted-foreground mb-6">道不遠人，人之為道而遠人，不可以為道</cite>
              <motion.p
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Khổng Tử nhấn mạnh rằng triết học không phải là lý thuyết suông, mà phải được áp dụng vào cuộc sống hàng
                ngày.
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
