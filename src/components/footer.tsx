"use client"

import { Heart, Mail, Phone, MapPin, ExternalLink, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  const quickLinks = [
    { href: "/biography", label: "Tiểu Sử", icon: "👤" },
    { href: "/philosophy", label: "Triết Học", icon: "🧠" },
    { href: "/teachings", label: "Giáo Lý", icon: "📚" },
    { href: "/timeline", label: "Lịch Sử", icon: "⏰" },
  ]

  const wisdomQuotes = [
    {
      text: "Học mà không tư thì mờ mịt",
      chinese: "學而不思則罔",
    },
    {
      text: "Người có nhân thì yêu người",
      chinese: "仁者愛人",
    },
    {
      text: "Đạo không xa người",
      chinese: "道不遠人",
    },
  ]

  return (
    <motion.footer
      className="relative bg-gradient-to-br from-muted/30 via-muted/50 to-muted/70 border-t border-border/50 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Chinese Characters */}
        {["学", "思", "仁", "义", "礼", "智", "道", "德"].map((char, index) => (
          <motion.div
            key={index}
            className="absolute text-6xl font-bold opacity-5 text-primary"
            style={{
              left: `${10 + index * 12}%`,
              top: `${20 + (index % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            {char}
          </motion.div>
        ))}

        {/* Floating Particles */}
        {[...Array(12)].map((_, index) => {
          // Use deterministic values based on index to avoid hydration mismatch
          const leftPos = (index * 19) % 100;
          const topPos = (index * 29) % 100;
          const duration = 6 + (index % 4);
          const delay = (index * 0.7) % 3;

          return (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-full"
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10" suppressHydrationWarning={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" suppressHydrationWarning={true}>
          {/* Enhanced About Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            suppressHydrationWarning={true}
          >
            <motion.div
              className="flex items-center space-x-3 mb-6 group"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="relative w-12 h-12 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{
                  rotate: 360,
                  scale: 1.1,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
                }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-lg">孔</span>

                {/* Orbiting particles */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-25px)`,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              <div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Khổng Tử
                </h3>
                <p className="text-sm text-muted-foreground">孔夫子 • Kǒng Fūzǐ</p>
              </div>
            </motion.div>

            <motion.p
              className="text-muted-foreground leading-relaxed text-pretty mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Trang web giáo dục về cuộc đời và tư tưởng của Khổng Tử - nhà tư tưởng vĩ đại của Trung Quốc,
              người đặt nền móng cho triết học Nho giáo.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Qufu, Shandong, China</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>📅</span>
                <span>551 - 479 TCN</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            suppressHydrationWarning={true}
          >
            <h4 className="text-lg font-semibold text-foreground mb-6 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              Khám Phá
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link href={link.href}>
                    <motion.div
                      className="flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 text-muted-foreground hover:text-primary hover:bg-primary/5 group"
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-base">{link.icon}</span>
                      <span className="group-hover:font-medium transition-all">{link.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Wisdom Quotes Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            suppressHydrationWarning={true}
          >
            <h4 className="text-lg font-semibold text-foreground mb-6 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Lời Dạy
            </h4>

            <div className="space-y-4">
              {wisdomQuotes.map((quote, index) => (
                <motion.blockquote
                  key={index}
                  className="relative p-4 bg-gradient-to-br from-primary/5 to-blue-500/5 backdrop-blur-sm rounded-lg border border-primary/10 hover:border-primary/20 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="absolute top-2 left-2 text-primary/20 text-2xl font-bold">"</div>
                  <p className="text-sm text-foreground italic text-pretty pl-4">
                    {quote.text}
                  </p>
                  <cite className="text-xs text-muted-foreground mt-2 block text-right">
                    {quote.chinese}
                  </cite>
                </motion.blockquote>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Legacy Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            suppressHydrationWarning={true}
          >
            <h4 className="text-lg font-semibold text-foreground mb-6">Di Sản</h4>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-border/30">
                  <span>Đệ tử</span>
                  <span className="font-medium text-primary">3,000+</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/30">
                  <span>Hiền nhân</span>
                  <span className="font-medium text-primary">72</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/30">
                  <span>Ảnh hưởng</span>
                  <span className="font-medium text-primary">2,500+ năm</span>
                </div>
              </div>

              <motion.div
                className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <p className="text-xs text-amber-800 text-center font-medium">
                  "Người thầy vĩ đại của muôn đời"
                </p>
                <p className="text-xs text-amber-600 text-center mt-1">
                  万世师表
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          className="border-t border-border/50 mt-12 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          suppressHydrationWarning={true}
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.p
              className="text-muted-foreground flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.02 }}
            >
              Được tạo với
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-4 h-4 text-red-500" />
              </motion.span>
              để tôn vinh trí tuệ cổ điển
            </motion.p>

            <motion.div
              className="flex items-center space-x-4 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <span>© 2024 Khổng Tử Legacy</span>
              <span className="hidden md:inline">•</span>
              <span>Educational Purpose</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
