"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Trang Chủ", icon: "🏠" },
    { href: "/biography", label: "Tiểu Sử", icon: "👤" },
    { href: "/philosophy", label: "Triết Học", icon: "🧠" },
    { href: "/teachings", label: "Giáo Lý", icon: "📚" },
    { href: "/timeline", label: "Lịch Sử", icon: "⏰" },
    { href: "/quiz", label: "Quiz", icon: "🧩" },
  ]

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5"
        : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Floating Chinese Characters Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" suppressHydrationWarning={true}>
        {mounted && ["智", "仁", "礼", "义"].map((char, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl font-bold opacity-5 text-primary"
            style={{
              left: `${20 + index * 25}%`,
              top: "50%",
            }}
            animate={{
              y: [-5, 5, -5],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            suppressHydrationWarning={true}
          >
            {char}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-4 relative z-10" suppressHydrationWarning={true}>
        <div className="flex items-center justify-between" suppressHydrationWarning={true}>
          {/* Enhanced Logo */}
          <motion.div
            whileHover={mounted ? { scale: 1.05 } : {}}
            whileTap={mounted ? { scale: 0.95 } : {}}
            suppressHydrationWarning={true}
          >
            <Link href="/" className="group">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-30 h-11.57 object-cover"
                suppressHydrationWarning={true}
              />
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2" suppressHydrationWarning={true}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={mounted ? { opacity: 0, y: -20 } : false}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={mounted ? { delay: index * 0.1 } : {}}
                suppressHydrationWarning={true}
              >
                <Link href={item.href}>
                  <motion.div
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${pathname === item.href
                      ? "text-primary font-medium bg-primary/10 shadow-sm"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: pathname === item.href ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.08)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </span>

                    {/* Active indicator */}
                    {pathname === item.href && mounted && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        suppressHydrationWarning={true}
                      />
                    )}

                    {/* Hover shine effect */}
                    {mounted && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg opacity-0"
                        whileHover={{
                          opacity: 1,
                          x: ["-100%", "100%"]
                        }}
                        transition={{ duration: 0.6 }}
                        suppressHydrationWarning={true}
                      />
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <motion.div
            whileHover={mounted ? { scale: 1.05 } : {}}
            whileTap={mounted ? { scale: 0.95 } : {}}
            suppressHydrationWarning={true}
          >
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative overflow-hidden group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              suppressHydrationWarning={true}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300"
                suppressHydrationWarning={true}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "menu"}
                  initial={mounted ? { rotate: -90, opacity: 0 } : false}
                  animate={mounted ? { rotate: 0, opacity: 1 } : {}}
                  exit={mounted ? { rotate: 90, opacity: 0 } : {}}
                  transition={mounted ? { duration: 0.2 } : {}}
                  suppressHydrationWarning={true}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && mounted && (
            <motion.nav
              className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              suppressHydrationWarning={true}
            >
              <motion.div
                className="flex flex-col space-y-2"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                suppressHydrationWarning={true}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    suppressHydrationWarning={true}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${pathname === item.href
                          ? "text-primary font-medium bg-primary/10 shadow-sm"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                          }`}
                        whileHover={mounted ? {
                          x: 5,
                          backgroundColor: "rgba(59, 130, 246, 0.08)"
                        } : {}}
                        whileTap={mounted ? { scale: 0.98 } : {}}
                        suppressHydrationWarning={true}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>

                        {pathname === item.href && mounted && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-primary rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            suppressHydrationWarning={true}
                          />
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
