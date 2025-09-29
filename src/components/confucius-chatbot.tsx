"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, X, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Message {
    id: string
    type: 'user' | 'bot'
    content: string
    timestamp: Date
}

export function ConfuciusChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'bot',
            content: 'Xin chào! Tôi là trợ lý AI chuyên về Khổng Tử. Bạn có thể hỏi tôi bất cứ điều gì về cuộc đời, triết học, giáo lý của ngài. Hãy bắt đầu câu hỏi nhé! 🏛️',
            timestamp: new Date()
        }
    ])
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    // Chỉ scroll khi gửi message mới, không scroll khi streaming
    const scrollToBottomOnNewMessage = () => {
        if (!isLoading) {
            scrollToBottom()
        }
    }

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputMessage('')
        setIsLoading(true)

        // Scroll xuống khi gửi message mới
        setTimeout(() => scrollToBottom(), 100)

        // Tạo bot message placeholder để streaming với hiệu ứng mượt mà
        const botMessageId = (Date.now() + 1).toString()
        const botMessage: Message = {
            id: botMessageId,
            type: 'bot',
            content: '',
            timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            })

            if (!response.ok) {
                throw new Error('Failed to get response')
            }

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let accumulatedContent = ''
            let isTypingEffect = false

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break

                    const chunk = decoder.decode(value, { stream: true })
                    const lines = chunk.split('\n')

                    for (const line of lines) {
                        if (line.trim()) {
                            try {
                                const data = JSON.parse(line)

                                if (data.type === 'chunk') {
                                    accumulatedContent += data.content
                                    isTypingEffect = true

                                    // Cập nhật message với hiệu ứng typing mượt mà
                                    setMessages(prev =>
                                        prev.map(msg =>
                                            msg.id === botMessageId
                                                ? { ...msg, content: accumulatedContent }
                                                : msg
                                        )
                                    )

                                    // Không tự động scroll khi đang streaming để người dùng có thể đọc

                                } else if (data.type === 'end') {
                                    isTypingEffect = false
                                    // Scroll xuống khi kết thúc streaming
                                    setTimeout(() => scrollToBottom(), 200)
                                    break
                                }
                            } catch (e) {
                                console.warn('Failed to parse chunk:', line)
                            }
                        }
                    }
                }
            }

        } catch (error) {
            console.error('Chat error:', error)
            // Xử lý lỗi với message thân thiện
            const errorContent = '⚠️ Xin lỗi, tôi gặp sự cố kỹ thuật. Như Khổng Tử đã nói: **"Tri chi vi tri chi, bất tri vi bất tri"** - Biết thì nói biết, không biết thì nói không biết. Hãy thử lại câu hỏi khác nhé! 🙏'

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === botMessageId
                        ? { ...msg, content: errorContent }
                        : msg
                )
            )
            // Scroll xuống sau khi hiển thị lỗi
            setTimeout(() => scrollToBottom(), 100)
        }

        setIsLoading(false)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Format message content với markdown-like support
    const formatMessageContent = (content: string) => {
        if (!content) return ''

        // Split content by lines và format từng dòng
        const lines = content.split('\n')
        return lines.map((line, index) => {
            // Format in đậm **text**
            let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')

            // Format in nghiêng *text*
            formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')

            // Format quotes "text"
            formatted = formatted.replace(/"([^"]+)"/g, '<span class="text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded">"$1"</span>')

            // Format danh sách - item
            if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                return (
                    <div key={index} className="flex items-start space-x-2 my-1">
                        <span className="text-blue-500 text-sm mt-0.5">•</span>
                        <span dangerouslySetInnerHTML={{ __html: formatted.replace(/^[-•]\s*/, '') }} />
                    </div>
                )
            }

            // Format số 1. 2. 3.
            if (/^\d+\.\s/.test(line.trim())) {
                const match = line.match(/^(\d+)\.\s(.*)/)
                if (match) {
                    return (
                        <div key={index} className="flex items-start space-x-2 my-1">
                            <span className="text-blue-600 font-bold text-sm bg-blue-100 w-5 h-5 rounded-full flex items-center justify-center text-xs">{match[1]}</span>
                            <span dangerouslySetInnerHTML={{ __html: match[2] }} />
                        </div>
                    )
                }
            }

            return (
                <div key={index} className={index > 0 ? "mt-2" : ""}>
                    <span dangerouslySetInnerHTML={{ __html: formatted }} />
                </div>
            )
        })
    }

    const suggestedQuestions = [
        "Khổng Tử sinh năm nào?",
        "Nhân là gì trong tư tưởng Khổng Tử?",
        "Ngũ đức của Khổng Tử?",
        "Luận Ngữ nói về điều gì?",
    ]

    return (
        <>
            {/* Chat Toggle Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 2, duration: 0.6, type: "spring", stiffness: 200 }}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    size="lg"
                    className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-2xl transition-all duration-300 hover:scale-110 group overflow-hidden"
                >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="relative z-10"
                            >
                                <X className="w-7 h-7" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="relative z-10"
                            >
                                <MessageCircle className="w-7 h-7" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Pulsing Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-pulse"></div>
                </Button>

                {/* Notification Badge */}
                {!isOpen && (
                    <motion.div
                        className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ delay: 3, duration: 0.4 }}
                    >
                        <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            儒
                        </motion.span>
                    </motion.div>
                )}

                {/* Tooltip */}
                {!isOpen && (
                    <motion.div
                        className="absolute bottom-full right-0 mb-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 4, duration: 0.3 }}
                    >
                        Hỏi về Khổng Tử
                        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </motion.div>
                )}
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-24 right-6 z-40 w-96 h-[40rem] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)]"
                        initial={{ opacity: 0, y: 100, scale: 0.8, rotateY: -15 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8, rotateY: 15 }}
                        transition={{ duration: 0.4, type: "spring", damping: 20 }}
                    >
                        <Card className="h-full flex flex-col shadow-2xl border-2 border-primary/20 bg-white/98 backdrop-blur-sm overflow-hidden">
                            {/* Header */}
                            <CardHeader className="px-4 py-4 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white relative overflow-hidden">
                                {/* Animated Background Pattern */}
                                <div className="absolute inset-0 opacity-20">
                                    {["智", "仁", "礼", "义", "信"].map((char, index) => (
                                        <motion.div
                                            key={index}
                                            className="absolute text-3xl font-bold text-white/30 select-none pointer-events-none"
                                            style={{
                                                left: `${index * 18 + 5}%`,
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                            }}
                                            animate={{
                                                y: [-8, 8, -8],
                                                opacity: [0.4, 0.2, 0.4],
                                                rotate: [-2, 2, -2],
                                            }}
                                            transition={{
                                                duration: 4 + index * 0.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            {char}
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between relative z-20 min-h-[60px]">
                                    <div className="flex items-center space-x-3">
                                        <motion.div
                                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Bot className="w-7 h-7" />
                                        </motion.div>
                                        <div className="flex flex-col justify-center">
                                            <h3 className="font-bold text-lg leading-tight">Trợ lý Chatbot</h3>
                                            <p className="text-sm opacity-90 leading-tight">Giải đáp về Khổng Tử</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Badge className="bg-green-500/25 text-green-100 border border-green-400/40 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                                            <motion.div
                                                className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2 shadow-sm"
                                                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                            <span className="text-xs font-semibold">Online</span>
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            {/* Messages */}
                            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-amber-50/30 via-white/50 to-cyan-50/30">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} group`}
                                    >
                                        <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                                            <motion.div
                                                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${message.type === 'user'
                                                    ? 'bg-gradient-to-r from-primary to-blue-600 text-white rounded-br-md shadow-lg'
                                                    : 'bg-white border border-gray-200 rounded-bl-md shadow-md hover:shadow-lg transition-shadow'
                                                    }`}
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className={`${message.type === 'bot' ? 'prose prose-sm max-w-none' : ''}`}>
                                                    {formatMessageContent(message.content)}
                                                </div>
                                                {/* Streaming cursor effect cho bot messages đang được type */}
                                                {message.type === 'bot' && isLoading && message.content && (
                                                    <motion.span
                                                        className="inline-block w-2 h-4 bg-primary/70 ml-1"
                                                        animate={{ opacity: [1, 0, 1] }}
                                                        transition={{ duration: 1, repeat: Infinity }}
                                                    />
                                                )}
                                            </motion.div>
                                            <div className={`text-xs text-gray-500 mt-1 px-1 ${message.type === 'user' ? 'text-right' : 'text-left'
                                                }`}>
                                                {formatTime(message.timestamp)}
                                            </div>
                                        </div>

                                        <motion.div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${message.type === 'user'
                                                ? 'order-1 mr-3 bg-gradient-to-r from-primary to-blue-600 text-white'
                                                : 'order-2 ml-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white'
                                                }`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {message.type === 'user' ? (
                                                <User className="w-4 h-4" />
                                            ) : (
                                                <span className="text-xs">儒</span>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                ))}

                                {/* Loading Message */}
                                {isLoading && !messages.some(m => m.type === 'bot' && m.content === '') && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="order-2 ml-3 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
                                            儒
                                        </div>
                                        <div className="order-1 bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-md">
                                            <div className="flex items-center space-x-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                                <span className="text-sm text-gray-600">Đang suy nghĩ...</span>
                                                <div className="flex space-x-1">
                                                    {[0, 1, 2].map((i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="w-1 h-1 bg-primary rounded-full"
                                                            animate={{ scale: [1, 1.5, 1] }}
                                                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Suggested Questions */}
                                {messages.length === 1 && !isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="space-y-2"
                                    >
                                        <p className="text-xs text-gray-500 text-center mb-3">💡 Câu hỏi gợi ý:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {suggestedQuestions.map((question, index) => (
                                                <motion.button
                                                    key={index}
                                                    className="text-xs px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-blue-700 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
                                                    onClick={() => setInputMessage(question)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {question}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </CardContent>

                            {/* Input */}
                            <div className="p-4 border-t bg-white/90 backdrop-blur-sm">
                                <div className="flex space-x-2">
                                    <Input
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Hỏi về Khổng Tử..."
                                        className="flex-1 text-sm border-2 border-primary/20 focus:border-primary rounded-xl bg-white/80 backdrop-blur-sm"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        onClick={sendMessage}
                                        size="sm"
                                        disabled={!inputMessage.trim() || isLoading}
                                        className="px-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-200"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    🤖 AI có thể mắc lỗi. Hãy kiểm chứng thông tin quan trọng về Khổng Tử.
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}