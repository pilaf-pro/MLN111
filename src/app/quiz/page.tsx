"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FallingLeaves } from "@/components/falling-leaves"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, Brain, Trophy, RotateCcw, Clock, BookOpen } from "lucide-react"

const quizQuestions = [
    {
        id: 1,
        category: "Tiểu Sử",
        question: "Khổng Tử sinh năm nào?",
        options: ["551 TCN", "549 TCN", "553 TCN", "547 TCN"],
        correct: 0,
        explanation: "Khổng Tử sinh ngày 28 tháng 9 năm 551 TCN tại ấp Trâu, thôn Xương Bình, nước Lỗ.",
        difficulty: "Dễ"
    },
    {
        id: 2,
        category: "Triết Học",
        question: "Đức tính nào được Khổng Tử coi là quan trọng nhất?",
        options: ["Trí (智)", "Nhân (仁)", "Lễ (礼)", "Nghĩa (义)"],
        correct: 1,
        explanation: "Nhân (仁) - lòng nhân ái là đức tính cao nhất trong tư tưởng Khổng Tử, là nền tảng của mọi đức tính khác.",
        difficulty: "Trung bình"
    },
    {
        id: 3,
        category: "Giáo Lý",
        question: "Câu nào sau đây là lời dạy của Khổng Tử?",
        options: [
            "Học mà không tư thì mờ mịt",
            "Tri kỷ nan tầm",
            "Thắng nhân tiên thắng kỷ",
            "Bất nhập hổ huyệt yên đắc hổ tử"
        ],
        correct: 0,
        explanation: "\"學而不思則罔，思而不學則殆\" - Học mà không tư thì mờ mịt, tư mà không học thì nguy hiểm.",
        difficulty: "Trung bình"
    },
    {
        id: 4,
        category: "Tác Phẩm",
        question: "Bộ Ngũ Kinh do Khổng Tử biên soạn gồm bao nhiều cuốn sách?",
        options: ["4 cuốn", "5 cuốn", "6 cuốn", "7 cuốn"],
        correct: 1,
        explanation: "Ngũ Kinh gồm 5 cuốn: Kinh Thi, Kinh Thư, Kinh Lễ, Kinh Dịch và Kinh Xuân Thu.",
        difficulty: "Dễ"
    },
    {
        id: 5,
        category: "Tiểu Sử",
        question: "Tên thật của Khổng Tử là gì?",
        options: ["Khổng Khâu", "Khổng Ni", "Khổng Phu", "Khổng Tử"],
        correct: 0,
        explanation: "Tên thật là Khổng Khâu (孔丘), tự là Trọng Ni (仲尼).",
        difficulty: "Trung bình"
    },
    {
        id: 6,
        category: "Triết Học",
        question: "Nguyên tắc vàng của Khổng Tử là gì?",
        options: [
            "Có công mài sắt có ngày nên kim",
            "Đừng làm điều gì mà bạn không muốn người khác làm cho mình",
            "Học tập suốt đời",
            "Quân tử tự cường bất tức"
        ],
        correct: 1,
        explanation: "\"己所不欲，勿施於人\" - Đừng làm điều gì mà bạn không muốn người khác làm cho mình.",
        difficulty: "Dễ"
    },
    {
        id: 7,
        category: "Giáo Dục",
        question: "Khổng Tử đề xướng phương châm giáo dục nào?",
        options: ["Có giáo không loại", "Học tập suốt đời", "Tự học tự làm", "Thầy nghiêm trò giỏi"],
        correct: 0,
        explanation: "\"有教無類\" - Có giáo không loại, nghĩa là giáo dục cho mọi người không phân biệt xuất thân.",
        difficulty: "Trung bình"
    },
    {
        id: 8,
        category: "Tiểu Sử",
        question: "Khổng Tử qua đời ở tuổi bao nhiêu?",
        options: ["71 tuổi", "73 tuổi", "69 tuổi", "75 tuổi"],
        correct: 0,
        explanation: "Khổng Tử qua đời năm 479 TCN ở tuổi 71, tại quê hương nước Lỗ.",
        difficulty: "Trung bình"
    },
    {
        id: 9,
        category: "Triết Học",
        question: "Theo Khổng Tử, một người quân tử cần có đặc điểm gì?",
        options: ["Giàu có và quyền lực", "Đạo đức và học thức", "Nổi tiếng và thành đạt", "Khỏe mạnh và thông minh"],
        correct: 1,
        explanation: "Quân tử trong tư tưởng Khổng Tử là người có đạo đức cao thương, có học thức và luôn tu dưỡng bản thân.",
        difficulty: "Khó"
    },
    {
        id: 10,
        category: "Giáo Lý",
        question: "\"三人行，必有我師焉\" có nghĩa là gì?",
        options: [
            "Ba người đi cùng nhau rất vui",
            "Ba người đi, nhất định có người làm thầy ta",
            "Ba người cùng làm việc sẽ thành công",
            "Ba người bạn thân như anh em"
        ],
        correct: 1,
        explanation: "Câu này thể hiện tinh thần khiêm tốn và luôn học hỏi từ mọi người xung quanh.",
        difficulty: "Dễ"
    },
    {
        id: 11,
        category: "Lịch Sử",
        question: "Khổng Tử bắt đầu chu du các nước ở tuổi nào?",
        options: ["50 tuổi", "55 tuổi", "60 tuổi", "45 tuổi"],
        correct: 1,
        explanation: "Khổng Tử bắt đầu cuộc chu du 14 năm ở tuổi 55 để truyền bá tư tưởng của mình.",
        difficulty: "Khó"
    },
    {
        id: 12,
        category: "Triết Học",
        question: "Trong Ngũ Đức của Khổng Tử, đức tính nào đại diện cho lòng tin?",
        options: ["Tín (信)", "Nghĩa (义)", "Trí (智)", "Lễ (礼)"],
        correct: 0,
        explanation: "Tín (信) đại diện cho lòng tin, sự thành thật và việc giữ lời hứa.",
        difficulty: "Trung bình"
    }
]

const categoryColors = {
    "Tiểu Sử": { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
    "Triết Học": { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
    "Giáo Lý": { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
    "Tác Phẩm": { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
    "Giáo Dục": { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-200" },
    "Lịch Sử": { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" }
}

const difficultyColors = {
    "Dễ": { bg: "bg-green-100", text: "text-green-700" },
    "Trung bình": { bg: "bg-yellow-100", text: "text-yellow-700" },
    "Khó": { bg: "bg-red-100", text: "text-red-700" }
}

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [answers, setAnswers] = useState<boolean[]>([])
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(30) // 30 seconds per question
    const [quizStarted, setQuizStarted] = useState(false)

    // Timer effect
    useEffect(() => {
        if (quizStarted && !quizCompleted && !showResult && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else if (timeLeft === 0 && !showResult) {
            handleTimeUp()
        }
    }, [timeLeft, quizStarted, quizCompleted, showResult])

    const handleTimeUp = () => {
        setSelectedAnswer(null)
        setShowResult(true)
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = false
        setAnswers(newAnswers)
    }

    const handleAnswerSelect = (answerIndex: number) => {
        if (showResult) return
        setSelectedAnswer(answerIndex)
    }

    const handleSubmitAnswer = () => {
        if (selectedAnswer === null) return

        const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correct
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = isCorrect
        setAnswers(newAnswers)

        if (isCorrect) {
            setScore(score + 1)
        }

        setShowResult(true)
    }

    const handleNextQuestion = () => {
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(null)
            setShowResult(false)
            setTimeLeft(30)
        } else {
            setQuizCompleted(true)
        }
    }

    const handleRestartQuiz = () => {
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setShowResult(false)
        setScore(0)
        setAnswers([])
        setQuizCompleted(false)
        setTimeLeft(30)
        setQuizStarted(false)
    }

    const getScoreMessage = () => {
        const percentage = (score / quizQuestions.length) * 100
        if (percentage >= 90) return { message: "Xuất sắc! Bạn là chuyên gia về Khổng Tử!", emoji: "🎉", color: "text-green-600" }
        if (percentage >= 70) return { message: "Rất tốt! Bạn hiểu khá nhiều về Khổng Tử", emoji: "🎊", color: "text-blue-600" }
        if (percentage >= 50) return { message: "Khá ổn! Bạn cần tìm hiểu thêm về Khổng Tử", emoji: "📚", color: "text-yellow-600" }
        return { message: "Hãy học thêm về vị thánh nhân này nhé!", emoji: "📖", color: "text-red-600" }
    }

    if (!quizStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cyan-50">
                <FallingLeaves />
                <Header />

                <main className="pt-20">
                    {/* Hero Section */}
                    <section className="py-20 px-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/tranquil-chinese-landscape-with-mountains-and-trad.jpg')] bg-cover bg-center opacity-10"></div>

                        {/* Floating Chinese Characters */}
                        <div className="absolute inset-0 pointer-events-none">
                            {["智", "仁", "礼", "义", "信"].map((char, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute text-6xl font-bold opacity-5 text-primary"
                                    style={{
                                        left: `${15 + index * 18}%`,
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
                                <Badge className="mb-6 text-lg px-6 py-2 bg-amber-100 text-amber-800 border-amber-300">
                                    <Brain className="w-5 h-5 mr-2" />
                                    Trắc Nghiệm
                                </Badge>

                                <motion.h1
                                    className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                >
                                    Quiz Khổng Tử
                                </motion.h1>

                                <motion.p
                                    className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty"
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                >
                                    Kiểm tra kiến thức của bạn về Khổng Tử và tư tưởng Nho giáo
                                </motion.p>
                            </motion.div>

                            {/* Quiz Info Cards */}
                            <motion.div
                                className="grid md:grid-cols-3 gap-6 mb-12"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 hover:border-blue-300 transition-colors">
                                    <CardContent className="p-6 text-center">
                                        <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                        <h3 className="font-semibold text-foreground mb-2">{quizQuestions.length} Câu Hỏi</h3>
                                        <p className="text-sm text-muted-foreground">Đa dạng chủ đề về Khổng Tử</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white/80 backdrop-blur-sm border-2 border-amber-200 hover:border-amber-300 transition-colors">
                                    <CardContent className="p-6 text-center">
                                        <Clock className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                                        <h3 className="font-semibold text-foreground mb-2">30 Giây/Câu</h3>
                                        <p className="text-sm text-muted-foreground">Thử thách tốc độ tư duy</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200 hover:border-green-300 transition-colors">
                                    <CardContent className="p-6 text-center">
                                        <Trophy className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                        <h3 className="font-semibold text-foreground mb-2">Nhiều Cấp Độ</h3>
                                        <p className="text-sm text-muted-foreground">Từ dễ đến khó</p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <Button
                                    size="lg"
                                    onClick={() => setQuizStarted(true)}
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    Bắt Đầu Quiz
                                </Button>
                            </motion.div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        )
    }

    if (quizCompleted) {
        const scoreData = getScoreMessage()
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cyan-50">
                <FallingLeaves />
                <Header />

                <main className="pt-20">
                    <section className="py-20 px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border-2 border-primary/20 shadow-2xl"
                            >
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    className="text-8xl mb-6"
                                >
                                    {scoreData.emoji}
                                </motion.div>

                                <motion.h1
                                    className="text-4xl font-bold text-foreground mb-4"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    Quiz Hoàn Thành!
                                </motion.h1>

                                <motion.div
                                    className="text-6xl font-bold mb-6"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                                >
                                    <span className="text-primary">{score}</span>
                                    <span className="text-muted-foreground">/{quizQuestions.length}</span>
                                </motion.div>

                                <motion.p
                                    className={`text-xl font-medium mb-8 ${scoreData.color}`}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                >
                                    {scoreData.message}
                                </motion.p>

                                {/* Score Breakdown */}
                                <motion.div
                                    className="grid md:grid-cols-3 gap-4 mb-8"
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                        <div className="text-2xl font-bold text-green-600">{score}</div>
                                        <div className="text-sm text-green-700">Câu đúng</div>
                                    </div>
                                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                                        <div className="text-2xl font-bold text-red-600">{quizQuestions.length - score}</div>
                                        <div className="text-sm text-red-700">Câu sai</div>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                        <div className="text-2xl font-bold text-blue-600">{Math.round((score / quizQuestions.length) * 100)}%</div>
                                        <div className="text-sm text-blue-700">Tỷ lệ đúng</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 justify-center"
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7, duration: 0.6 }}
                                >
                                    <Button
                                        onClick={handleRestartQuiz}
                                        size="lg"
                                        className="px-8 py-3 text-lg"
                                    >
                                        <RotateCcw className="w-5 h-5 mr-2" />
                                        Làm Lại Quiz
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => window.location.href = '/'}
                                        className="px-8 py-3 text-lg"
                                    >
                                        Về Trang Chủ
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        )
    }

    const question = quizQuestions[currentQuestion]
    const categoryStyle = categoryColors[question.category as keyof typeof categoryColors]
    const difficultyStyle = difficultyColors[question.difficulty as keyof typeof difficultyColors]

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cyan-50">
            <FallingLeaves />
            <Header />

            <main className="pt-20">
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Progress Bar */}
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Câu {currentQuestion + 1} / {quizQuestions.length}
                                </span>
                                <span className="text-sm font-medium text-muted-foreground">
                                    Điểm: {score}
                                </span>
                            </div>
                            <Progress
                                value={((currentQuestion) / quizQuestions.length) * 100}
                                className="h-2"
                            />
                        </motion.div>

                        {/* Question Card */}
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 shadow-2xl">
                                <CardHeader>
                                    {/* Category and Difficulty Badges */}
                                    <div className="flex justify-between items-center mb-4">
                                        <Badge className={`${categoryStyle?.bg} ${categoryStyle?.text} border-0`}>
                                            {question.category}
                                        </Badge>
                                        <div className="flex items-center gap-2">
                                            <Badge className={`${difficultyStyle?.bg} ${difficultyStyle?.text} border-0`}>
                                                {question.difficulty}
                                            </Badge>
                                            {!showResult && (
                                                <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="font-mono">{timeLeft}s</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <CardTitle className="text-2xl font-bold text-foreground text-balance">
                                        {question.question}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    {/* Options */}
                                    <div className="space-y-3 mb-6">
                                        <AnimatePresence>
                                            {question.options.map((option, index) => {
                                                let buttonStyle = "bg-white border-2 border-border hover:border-primary/50 text-foreground"

                                                if (showResult) {
                                                    if (index === question.correct) {
                                                        buttonStyle = "bg-green-100 border-2 border-green-500 text-green-800"
                                                    } else if (index === selectedAnswer && selectedAnswer !== question.correct) {
                                                        buttonStyle = "bg-red-100 border-2 border-red-500 text-red-800"
                                                    }
                                                } else if (selectedAnswer === index) {
                                                    buttonStyle = "bg-primary/10 border-2 border-primary text-foreground"
                                                }

                                                return (
                                                    <motion.button
                                                        key={index}
                                                        className={`w-full p-4 rounded-lg text-left font-medium transition-all duration-200 ${buttonStyle}`}
                                                        onClick={() => handleAnswerSelect(index)}
                                                        disabled={showResult}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        whileHover={!showResult ? { scale: 1.02 } : {}}
                                                        whileTap={!showResult ? { scale: 0.98 } : {}}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span>{option}</span>
                                                            {showResult && (
                                                                <div>
                                                                    {index === question.correct && (
                                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                                    )}
                                                                    {index === selectedAnswer && selectedAnswer !== question.correct && (
                                                                        <XCircle className="w-5 h-5 text-red-600" />
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.button>
                                                )
                                            })}
                                        </AnimatePresence>
                                    </div>

                                    {/* Explanation */}
                                    <AnimatePresence>
                                        {showResult && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
                                            >
                                                <h4 className="font-semibold text-blue-800 mb-2">Giải thích:</h4>
                                                <p className="text-blue-700">{question.explanation}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Action Buttons */}
                                    <div className="flex justify-between">
                                        {!showResult ? (
                                            <Button
                                                onClick={handleSubmitAnswer}
                                                disabled={selectedAnswer === null}
                                                className="px-8 py-2"
                                                size="lg"
                                            >
                                                Xác Nhận
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handleNextQuestion}
                                                className="px-8 py-2"
                                                size="lg"
                                            >
                                                {currentQuestion < quizQuestions.length - 1 ? "Câu Tiếp Theo" : "Xem Kết Quả"}
                                            </Button>
                                        )}

                                        <Button
                                            variant="outline"
                                            onClick={handleRestartQuiz}
                                            className="px-8 py-2"
                                            size="lg"
                                        >
                                            <RotateCcw className="w-4 h-4 mr-2" />
                                            Bắt Đầu Lại
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}