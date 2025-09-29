"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FallingLeaves } from "@/components/falling-leaves"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, Calendar, MapPin, User, BookOpen, Filter, Clock, Star } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

const timelineEvents = [
  {
    year: "551 TCN",
    age: "Sinh",
    title: "Ra đời tại ấp Trâu, thôn Xương Bình",
    description: "Khổng Khâu sinh ra tại nước Lỗ (nay là huyện Khúc Phụ, tỉnh Sơn Đông)",
    details:
      "Cha là Thúc Lương Hột (70 tuổi), mẹ là Nhan thị (18 tuổi). Cuộc hôn nhân này được gọi là 'dã hợp' vì chênh lệch tuổi tác lớn. Tên Khâu được đặt theo Ni Khâu - nơi cha mẹ cầu con.",
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
    icon: User,
    location: "Nước Lỗ",
  },
  {
    year: "536 TCN",
    age: "15 tuổi",
    title: "Bắt đầu tập trung học đạo",
    description: "Nghiên cứu lễ giáo và các môn học khác, đặt nền móng cho tư tưởng sau này",
    details:
      "Khổng Tử nói: 'Mười lăm tuổi ta chí học'. Đây là thời điểm ông bắt đầu nghiêm túc với việc học tập và nghiên cứu các kinh điển cổ.",
    category: "Học tập",
    icon: BookOpen,
    location: "Nước Lỗ",
  },
  {
    year: "532 TCN",
    age: "19 tuổi",
    title: "Lấy vợ và sinh con",
    description: "Kết hôn và năm sau sinh con đầu lòng đặt tên là Lí, tự là Bá Ngư",
    details:
      "Cuộc sống gia đình ổn định giúp Khổng Tử có điều kiện tập trung vào việc học tập và sau này là giảng dạy.",
    category: "Gia đình",
    icon: User,
    location: "Nước Lỗ",
  },
  {
    year: "529 TCN",
    age: "22 tuổi",
    title: "Bắt đầu sự nghiệp giáo dục",
    description: "Mở trường dạy học tư nhân, đề xướng 'Có giáo không loại'",
    details:
      "Khổng Tử bắt đầu nhận học trò không phân biệt xuất thân, tạo ra cuộc cách mạng giáo dục. Phương pháp 'nhân tài mà giáo' của ông trở thành nền tảng sư phạm.",
    category: "Giáo dục",
    icon: BookOpen,
    location: "Nước Lỗ",
  },
  {
    year: "521 TCN",
    age: "30 tuổi",
    title: "Đi Lạc Dương nghiên cứu",
    description: "Được Lỗ Chiêu Công cử đi Lạc Dương tham quan và khảo cứu luật lệ, thư tịch cổ",
    details:
      "Cùng với Nam Cung Quát, được ban cho một cỗ xe song mã và một người hầu. Chuyến đi này giúp ông mở rộng kiến thức về lễ nhạc và văn hóa cổ đại.",
    category: "Học tập",
    icon: BookOpen,
    location: "Lạc Dương",
  },
  {
    year: "516 TCN",
    age: "35 tuổi",
    title: "Tạm lánh sang nước Tề",
    description: "Theo Lỗ Chiêu Công lánh nạn khi Quý Bình Tử khởi loạn",
    details:
      "Tề Cảnh Công rất khâm phục, muốn phong đất Ni Khê cho ông nhưng bị Tướng quốc Án Anh ngăn cản. Ông ở Tề 6 năm trước khi về Lỗ.",
    category: "Chính trị",
    icon: MapPin,
    location: "Nước Tề",
  },
  {
    year: "501 TCN",
    age: "50 tuổi",
    title: "Làm quan tại nước Lỗ",
    description: "Được Lỗ Định công mời làm Trung đô tế, sau thăng Tư không rồi Đại tư khấu",
    details:
      "Trong thời gian làm quan, ông thực hiện nhiều cải cách tích cực. Khuyên vua thu hồi binh quyền của ba dòng họ quý tộc để tăng cường quyền lực trung ương.",
    category: "Chính trị",
    icon: MapPin,
    location: "Nước Lỗ",
  },
  {
    year: "496 TCN",
    age: "55 tuổi",
    title: "Bắt đầu cuộc chu du 14 năm",
    description: "Xin từ chức, rời nước Lỗ để truyền bá tư tưởng khắp các nước chư hầu",
    details:
      "Thất vọng vì vua Lỗ bỏ bê việc triều chính sau khi nhận 80 thiếu nữ đẹp từ nước Tề. Cùng đệ tử đi qua nhiều nước như Vệ, Trần, Thái, Tống nhưng không ai áp dụng đạo trị quốc của ông.",
    category: "Chu du",
    icon: MapPin,
    location: "Các nước chư hầu",
  },
  {
    year: "482 TCN",
    age: "69 tuổi",
    title: "Trở về nước Lỗ",
    description: "Kết thúc cuộc chu du, về quê hương chuyên tâm viết sách và giảng dạy",
    details:
      "Tập trung biên soạn và san định các kinh điển cổ, tạo thành bộ Ngũ Kinh. Tổng số môn đệ có lúc lên tới 3.000 người, trong đó 72 người được liệt vào hạng tài giỏi (Thất thập nhị hiền).",
    category: "Giáo dục",
    icon: BookOpen,
    location: "Nước Lỗ",
  },
  {
    year: "479 TCN",
    age: "71 tuổi",
    title: "Qua đời tại nước Lỗ",
    description: "Khổng Tử qua đời ngày 11 tháng 4, để lại di sản tư tưởng bất hủ",
    details:
      "Mất khi tâm nguyện chưa thành - không thể thực hiện được lý tưởng chính trị. Tuy nhiên, tư tưởng của ông được các đệ tử ghi chép lại trong Luận Ngữ và trở thành nền tảng văn hóa Á Đông.",
    category: "Cuối đời",
    icon: User,
    location: "Nước Lỗ",
  },
]

const categoryColors = {
  "Thời thơ ấu": { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200", color: "#3b82f6" },
  "Học tập": { bg: "bg-green-100", text: "text-green-800", border: "border-green-200", color: "#10b981" },
  "Gia đình": { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-200", color: "#ec4899" },
  "Giáo dục": { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200", color: "#8b5cf6" },
  "Chính trị": { bg: "bg-red-100", text: "text-red-800", border: "border-red-200", color: "#ef4444" },
  "Chu du": { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200", color: "#f97316" },
  "Cuối đời": { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200", color: "#6b7280" },
}

// Enhanced 3D Timeline Event Component
function Enhanced3DTimelineEvent({ event, index, isSelected, onSelect }: any) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const IconComponent = event.icon

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]))
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]))

  const categoryStyle = categoryColors[event.category as keyof typeof categoryColors]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
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

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
    >
      {/* Animated 3D Timeline Dot */}
      <motion.div
        className="absolute left-6 w-8 h-8 rounded-full border-4 border-background shadow-xl hidden md:flex items-center justify-center z-20"
        style={{ backgroundColor: categoryStyle.color }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 400, damping: 10 }}
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        <IconComponent className="w-4 h-4 text-white" />

        {/* Floating particles around the dot */}
        {isHovered && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: categoryStyle.color }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos((i * 90 * Math.PI) / 180) * 25,
                  y: Math.sin((i * 90 * Math.PI) / 180) * 25,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Enhanced Connecting Line with Gradient */}
      <motion.div
        className={`absolute left-9 top-8 w-0.5 h-full hidden md:block`}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
        style={{
          background: `linear-gradient(to bottom, ${categoryStyle.color}, ${categoryStyle.color}50, transparent)`,
          transformOrigin: "top"
        }}
      ></motion.div>

      <motion.div
        className="ml-0 md:ml-20"
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
          whileHover={{ scale: 1.02, z: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Card
            className={`cursor-pointer transition-all duration-500 border-2 relative overflow-hidden ${isSelected
              ? `ring-4 shadow-2xl scale-[1.02] border-opacity-100`
              : "hover:shadow-xl hover:bg-muted/20 border-opacity-50"
              }`}
            style={{
              borderColor: categoryStyle.color,
              boxShadow: isSelected ? `0 0 40px ${categoryStyle.color}30` : undefined,
              background: isSelected
                ? `linear-gradient(135deg, ${categoryStyle.color}05, ${categoryStyle.color}10)`
                : undefined
            }}
            onClick={() => onSelect(index)}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, ${categoryStyle.color} 2px, transparent 2px)`,
                  backgroundSize: '50px 50px'
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

            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant="outline"
                        className={`${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border} border-2`}
                      >
                        {event.category}
                      </Badge>
                    </motion.div>
                    <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 border border-cyan-200">
                      {event.age}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      {event.location}
                    </div>
                  </div>

                  <CardTitle className="text-xl font-bold text-card-foreground mb-2 text-balance">
                    {event.title}
                  </CardTitle>

                  <CardDescription className="font-bold text-lg mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" style={{ color: categoryStyle.color }} />
                    <span style={{ color: categoryStyle.color }}>{event.year}</span>
                  </CardDescription>

                  <p className="text-card-foreground text-pretty leading-relaxed">{event.description}</p>
                </div>

                <motion.div
                  animate={{ rotate: isSelected ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button variant="ghost" size="sm" className="ml-4 shrink-0">
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </CardHeader>

            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <CardContent className="pt-0 border-t relative z-10" style={{ borderColor: categoryStyle.color + "30" }}>
                    <motion.div
                      className="p-6 rounded-xl mt-4"
                      style={{
                        background: `linear-gradient(135deg, ${categoryStyle.color}10, ${categoryStyle.color}05)`,
                        border: `1px solid ${categoryStyle.color}20`
                      }}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: categoryStyle.color }} />
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Chi tiết sự kiện</h4>
                          <p className="text-muted-foreground leading-relaxed text-pretty">{event.details}</p>
                        </div>
                      </div>

                      {/* Significance indicator */}
                      <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: categoryStyle.color + "20" }}>
                        <Star className="w-4 h-4" style={{ color: categoryStyle.color }} />
                        <span className="text-sm font-medium" style={{ color: categoryStyle.color }}>
                          Sự kiện quan trọng trong giai đoạn {event.category.toLowerCase()}
                        </span>
                      </div>
                    </motion.div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Enhanced Timeline Progress with 3D Effects
function EnhancedTimelineProgress() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(scrollPercent, 100))
      setIsVisible(scrollPercent > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Track */}
          <div className="relative w-2 h-80 bg-gradient-to-b from-muted via-muted/50 to-muted rounded-full shadow-lg backdrop-blur-sm">
            {/* Progress Fill */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full shadow-2xl"
              style={{ height: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Progress Indicator */}
            <motion.div
              className="absolute w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-xl border-4 border-background -left-2"
              style={{ top: `${progress}%` }}
              animate={{
                y: -12,
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 30px rgba(59, 130, 246, 0.8)",
                  "0 0 20px rgba(59, 130, 246, 0.5)"
                ]
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity },
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            />

            {/* Floating Progress Percentage */}
            <motion.div
              className="absolute -right-16 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg border"
              style={{ top: `${Math.max(progress - 5, 0)}%` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TimelineProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(scrollPercent, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 w-1 h-64 bg-muted rounded-full hidden lg:block z-50">
      <div
        className="w-full bg-gradient-to-b from-cyan-400 to-primary rounded-full transition-all duration-300"
        style={{ height: `${progress}%` }}
      ></div>
      <div
        className="absolute w-3 h-3 bg-primary rounded-full -left-1 transition-all duration-300"
        style={{ top: `${progress}%`, transform: "translateY(-50%)" }}
      ></div>
    </div>
  )
}

export default function TimelinePage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const filteredEvents = filter === "all" ? timelineEvents : timelineEvents.filter((event) => event.category === filter)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FallingLeaves />
      {/* <EnhancedTimelineProgress /> */}
      <Header />

      <main className="pt-20">
        {/* Enhanced Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-cyan-50 to-blue-50 relative overflow-hidden">
          {/* Parallax Background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{ y: backgroundY }}
          >
            <div className="absolute inset-0 bg-[url('/images/tranquil-chinese-landscape-with-mountains-and-trad.jpg')] bg-cover bg-center"></div>
          </motion.div>

          {/* Animated Chinese Characters */}
          <div className="absolute inset-0 pointer-events-none">
            {["史", "时", "道", "学", "教", "政"].map((char, index) => (
              <motion.div
                key={index}
                className="absolute text-6xl font-bold opacity-5 text-cyan-600"
                style={{
                  left: `${10 + index * 15}%`,
                  top: `${25 + (index % 2) * 35}%`
                }}
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 6 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.7,
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
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Dòng Thời Gian Cuộc Đời
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                71 năm hành trình của một nhà tư tưởng vĩ đại
              </motion.p>
            </motion.div>

            {/* Enhanced Category Filter */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                  className="relative overflow-hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Tất cả
                  {filter === "all" && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
                    />
                  )}
                </Button>
              </motion.div>

              {Object.keys(categoryColors).map((category) => {
                const categoryStyle = categoryColors[category as keyof typeof categoryColors]
                return (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={filter === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter(category)}
                      className="text-xs relative overflow-hidden"
                      style={{
                        borderColor: filter === category ? categoryStyle.color : undefined,
                        backgroundColor: filter === category ? categoryStyle.color + "20" : undefined,
                        color: filter === category ? categoryStyle.color : undefined,
                      }}
                    >
                      {category}
                      {filter === category && (
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          style={{ backgroundColor: categoryStyle.color }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Button>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Timeline */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Main Enhanced Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 via-purple-500 to-amber-400 hidden md:block rounded-full shadow-lg"></div>

              <motion.div
                className="space-y-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {filteredEvents.map((event, index) => (
                    <Enhanced3DTimelineEvent
                      key={`${event.year}-${index}-${filter}`}
                      event={event}
                      index={index}
                      isSelected={selectedEvent === index}
                      onSelect={(idx: number) => setSelectedEvent(selectedEvent === idx ? null : idx)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Summary Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 60px 60px, #6366f1 4px, transparent 4px)`,
                backgroundSize: '120px 120px'
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
              Di Sản Bất Hủ
            </motion.h2>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, rotateY: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Floating elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    style={{
                      left: `${15 + i * 12}%`,
                      top: `${20 + (i % 3) * 30}%`
                    }}
                    animate={{
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 0.8, 0.3],
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>

              <Star className="w-12 h-12 text-primary mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                "Người xưa đã chết, nhưng tư tưởng của họ vẫn sống mãi"
              </blockquote>
              <motion.p
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Khổng Tử đã qua đời hơn 2500 năm, nhưng tư tưởng Nho giáo vẫn ảnh hưởng sâu sắc đến văn hóa và giáo dục
                của nhiều quốc gia Á Đông.
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
