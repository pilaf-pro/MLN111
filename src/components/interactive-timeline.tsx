"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function InteractiveTimeline() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const timelineEvents = [
        {
            year: "551 TCN",
            event: "Sinh ra tại Quỳ Phụ, nước Lỗ",
            icon: "🌟",
            description: "Khổng Tử sinh ra trong một gia đình quý族 nghèo khó tại thành Quỳ Phụ, nước Lỗ"
        },
        {
            year: "534 TCN",
            event: "Bắt đầu sự nghiệp giáo dục",
            icon: "📚",
            description: "Lập trường dạy học, thu nhận học trò đầu tiên và phát triển phương pháp giảng dạy"
        },
        {
            year: "501 TCN",
            event: "Làm quan tại nước Lỗ",
            icon: "🏛️",
            description: "Được bổ nhiệm làm Tư Khấu đại phu, sau đó thăng chức Đại Tư Khấu"
        },
        {
            year: "497 TCN",
            event: "Bắt đầu du lịch các nước",
            icon: "🚶‍♂️",
            description: "Rời nước Lỗ, du lịch 14 năm qua các nước để tìm kiếm cơ hội thực hiện lý tưởng chính trị"
        },
        {
            year: "484 TCN",
            event: "Trở lại nước Lỗ",
            icon: "🏠",
            description: "Trở về quê hương, tập trung vào việc biên soạn kinh điển và giảng dạy"
        },
        {
            year: "479 TCN",
            event: "Qua đời tại Quỳ Phụ",
            icon: "🕊️",
            description: "Khổng Tử qua đời ở tuổi 73, để lại di sản tinh thần vĩ đại cho nhân loại"
        }
    ]

    return (
        <section ref={ref} className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-5xl md:text-6xl font-bold text-center mb-20 text-foreground"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Hành Trình Cuộc Đời
                    <span className="block text-3xl md:text-4xl text-muted-foreground font-normal mt-4">
                        Dòng thời gian của một triết gia vĩ đại
                    </span>
                </motion.h2>

                <div className="relative">
                    {/* Animated timeline line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-muted transform -translate-x-1/2">
                        <motion.div
                            className="w-full bg-gradient-to-b from-primary to-secondary origin-top"
                            style={{ scaleY: scrollYProgress }}
                        />
                    </div>

                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            className={`flex items-center mb-20 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                <motion.div
                                    className="bg-card p-8 rounded-3xl shadow-lg border hover:shadow-xl transition-all duration-500 group"
                                    whileHover={{
                                        scale: 1.02,
                                        rotateY: index % 2 === 0 ? 5 : -5,
                                        z: 50
                                    }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <motion.div
                                        className="text-4xl mb-4 inline-block"
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
                                        {event.icon}
                                    </motion.div>

                                    <h3 className="text-3xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                                        {event.year}
                                    </h3>

                                    <h4 className="text-xl font-semibold text-foreground mb-4">
                                        {event.event}
                                    </h4>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {event.description}
                                    </p>

                                    {/* Decorative corner */}
                                    <div className={`absolute top-4 ${index % 2 === 0 ? 'right-4' : 'left-4'} w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full opacity-60`} />
                                </motion.div>
                            </div>

                            <div className="w-2/12 flex justify-center relative">
                                <motion.div
                                    className="relative"
                                    whileInView={{ scale: [0, 1.3, 1] }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Outer ring */}
                                    <motion.div
                                        className="w-12 h-12 rounded-full border-4 border-primary/30 absolute inset-0"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.3, 0.8, 0.3]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: index * 0.3
                                        }}
                                    />

                                    {/* Inner circle */}
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-background shadow-lg relative z-10" />
                                </motion.div>
                            </div>

                            <div className="w-5/12" />
                        </motion.div>
                    ))}
                </div>

                {/* Floating decorative elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(15)].map((_, i) => {
                        // Use deterministic values based on index to avoid hydration mismatch
                        const chars = ['儒', '學', '仁', '義', '禮'];
                        const leftPos = 10 + (i * 17) % 80;
                        const topPos = 10 + (i * 23) % 80;
                        const duration = 6 + (i % 4);
                        const delay = (i * 0.8) % 5;
                        const charIndex = i % chars.length;

                        return (
                            <motion.div
                                key={i}
                                className="absolute text-2xl opacity-20"
                                style={{
                                    left: `${leftPos}%`,
                                    top: `${topPos}%`,
                                }}
                                animate={{
                                    y: [-10, 10, -10],
                                    rotate: [-15, 15, -15],
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{
                                    duration: duration,
                                    repeat: Infinity,
                                    delay: delay,
                                    ease: "easeInOut"
                                }}
                            >
                                {chars[charIndex]}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}