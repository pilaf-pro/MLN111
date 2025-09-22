"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        setIsTransitioning(true)
        const timer = setTimeout(() => {
            setIsTransitioning(false)
        }, 1200)

        return () => clearTimeout(timer)
    }, [pathname])

    return (
        <>
            <AnimatePresence mode="wait">
                {isTransitioning && (
                    <motion.div
                        key="scroll-transition"
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Background overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-amber-100"></div>

                        {/* Main scroll container */}
                        <motion.div
                            className="relative w-full max-w-4xl mx-auto"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.1, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            {/* Top scroll rod */}
                            <motion.div
                                className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r from-amber-800 via-amber-900 to-amber-800 rounded-full shadow-lg"
                                initial={{ width: "0%" }}
                                animate={{ width: "75%" }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            />

                            {/* Bottom scroll rod */}
                            <motion.div
                                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r from-amber-800 via-amber-900 to-amber-800 rounded-full shadow-lg"
                                initial={{ width: "0%" }}
                                animate={{ width: "75%" }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            />

                            {/* Main scroll paper */}
                            <motion.div
                                className="relative bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 shadow-2xl border-l-4 border-r-4 border-amber-600 min-h-[60vh] p-8"
                                initial={{ height: 0, scaleY: 0 }}
                                animate={{ height: "auto", scaleY: 1 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                                style={{
                                    backgroundImage: `
                                        radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.1) 1px, transparent 1px),
                                        radial-gradient(circle at 80% 80%, rgba(139, 69, 19, 0.1) 1px, transparent 1px),
                                        linear-gradient(to right, transparent 0%, rgba(139, 69, 19, 0.05) 50%, transparent 100%)
                                    `,
                                    backgroundSize: '50px 50px, 50px 50px, 100% 100%'
                                }}
                            >
                                {/* Paper texture lines */}
                                <div className="absolute inset-0 opacity-20">
                                    {[...Array(20)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-full h-px bg-amber-300"
                                            style={{ top: `${(i + 1) * 5}%` }}
                                        />
                                    ))}
                                </div>

                                {/* Content area */}
                                <motion.div
                                    className="relative z-10 text-center"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    {/* Confucius symbol */}
                                    <div className="text-6xl mb-6 text-amber-800">
                                        儒
                                    </div>

                                    {/* Calligraphy-style text */}
                                    <div className="text-2xl font-serif text-amber-900 mb-4 tracking-wide">
                                        學而時習之
                                    </div>
                                    {/* <div className="text-lg text-amber-700 italic">
                                        Biết thì nói là biết, không biết thì nói là không biết, đó mới là biết
                                    </div> */}

                                    {/* Decorative elements */}
                                    <div className="flex justify-center items-center mt-8 space-x-4">
                                        <div className="w-16 h-px bg-amber-600"></div>
                                        <div className="text-amber-700">⚊</div>
                                        <div className="w-16 h-px bg-amber-600"></div>
                                    </div>
                                </motion.div>

                                {/* Scroll edge shadows */}
                                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-800/20 to-transparent"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-800/20 to-transparent"></div>
                            </motion.div>

                            {/* Scroll strings */}
                            <motion.div
                                className="absolute top-0 left-1/4 w-px h-full bg-amber-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                transition={{ duration: 0.3, delay: 0.6 }}
                            />
                            <motion.div
                                className="absolute top-0 right-1/4 w-px h-full bg-amber-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                transition={{ duration: 0.3, delay: 0.6 }}
                            />
                        </motion.div>

                        {/* Floating particles */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-60"
                                style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${20 + Math.random() * 60}%`,
                                }}
                                animate={{
                                    y: [-10, 10, -10],
                                    x: [-5, 5, -5],
                                    opacity: [0.3, 0.8, 0.3],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {children}
            </motion.div>
        </>
    )
}