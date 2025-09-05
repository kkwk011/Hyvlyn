"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Sparkles, Palette, Shirt, Zap } from "lucide-react"

interface ChatMessage {
  role: 'user' | 'ai'
  message: string
  timestamp: Date
  type?: 'text' | 'design' | 'preview'
}

interface AIChatProps {
  onDesignCreated?: (design: string) => void
}

const designSuggestions = [
  "Dragão minimalista em tons de roxo",
  "Galáxia com estrelas brilhantes",
  "Lobo geométrico em preto e branco",
  "Mandala colorida vibrante",
  "Montanhas ao pôr do sol",
  "Borboleta abstrata neon"
]

export function AIChat({ onDesignCreated }: AIChatProps) {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { 
      role: 'ai', 
      message: 'Olá! Sou a IA Designer da Hyvlyn. Vou ajudar você a criar a estampa perfeita! Descreva sua ideia ou escolha uma das sugestões abaixo. ✨', 
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || message
    if (!textToSend.trim()) return
    
    const userMessage: ChatMessage = {
      role: 'user',
      message: textToSend,
      timestamp: new Date(),
      type: 'text'
    }
    
    setChatHistory(prev => [...prev, userMessage])
    setMessage("")
    setIsTyping(true)
    
    // Simular processamento da IA
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        role: 'ai',
        message: `Perfeito! Estou criando uma estampa "${textToSend}" para você. Analisando elementos visuais, cores e composição... 🎨`,
        timestamp: new Date(),
        type: 'text'
      }
      
      setChatHistory(prev => [...prev, aiResponse])
      
      // Simular criação do design
      setTimeout(() => {
        const designMessage: ChatMessage = {
          role: 'ai',
          message: `✨ Design criado com sucesso! Sua estampa "${textToSend}" está pronta. Características: estilo moderno, cores vibrantes, composição equilibrada. Gostaria de fazer algum ajuste?`,
          timestamp: new Date(),
          type: 'design'
        }
        
        setChatHistory(prev => [...prev, designMessage])
        setIsTyping(false)
        onDesignCreated?.(textToSend)
      }, 2000)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  return (
    <div className="flex flex-col h-full max-h-[500px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-800/50 rounded-lg mb-4">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                : msg.type === 'design'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                : 'bg-gray-700 text-gray-100'
            }`}>
              <div className="flex items-start space-x-2">
                {msg.role === 'ai' && (
                  <div className="flex-shrink-0 mt-1">
                    {msg.type === 'design' ? (
                      <Palette className="w-4 h-4 text-green-300" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-purple-300" />
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {msg.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 p-3 rounded-lg max-w-[85%]">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Design Suggestions */}
      {chatHistory.length <= 1 && (
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Sugestões populares:</p>
          <div className="flex flex-wrap gap-2">
            {designSuggestions.slice(0, 3).map((suggestion, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="text-xs border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Zap className="w-3 h-3 mr-1" />
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex space-x-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Descreva sua estampa ideal..."
          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          onKeyPress={(e) => e.key === 'Enter' && !isTyping && sendMessage()}
          disabled={isTyping}
        />
        <Button 
          onClick={() => sendMessage()} 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          disabled={isTyping || !message.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}