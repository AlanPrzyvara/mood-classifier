import { useState, useCallback, useRef, useEffect } from 'react'
import { Message, ChatRequest, ChatResponse } from '../types'
import { CHAT_CONFIG } from '../constants'
import { generateId, extractMoodFromResponse } from '../utils'

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll automático para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simula digitação humana
  const simulateTyping = useCallback(async (callback: () => void) => {
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    setIsTyping(false)
    callback()
  }, [])

  // Gera contexto dinâmico baseado na conversa
  const generateContext = useCallback((conversationMessages: Message[]): Record<string, string> => {
    const context: Record<string, string> = {
      system: "Você é Sofia, uma psicóloga virtual empática, calorosa e profissional. Seu estilo é acolhedor, sem julgamentos, e você sempre oferece suporte baseado em evidências científicas. Use linguagem natural, carinhosa mas profissional. Responda como uma psicóloga real conversaria com seu paciente, sendo genuína e humana.",
      conversation_summary: "",
      user_preferences: "",
      current_topic: ""
    }

    if (conversationMessages.length > 0) {
      const recentMessages = conversationMessages.slice(-6)
      const userMessages = recentMessages.filter(m => m.role === 'user')
      
      const topics = userMessages.map(m => m.content.toLowerCase())
      if (topics.some(t => t.includes('ansiedade') || t.includes('ansioso'))) {
        context.current_topic = "ansiedade"
      } else if (topics.some(t => t.includes('depressão') || t.includes('deprimido'))) {
        context.current_topic = "depressão"
      } else if (topics.some(t => t.includes('relacionamento') || t.includes('amor'))) {
        context.current_topic = "relacionamentos"
      } else if (topics.some(t => t.includes('trabalho') || t.includes('carreira'))) {
        context.current_topic = "carreira"
      }

      if (conversationMessages.length > 4) {
        context.conversation_summary = `Esta é uma conversa contínua com ${conversationMessages.length} mensagens. O usuário tem demonstrado interesse em ${context.current_topic || 'questões gerais de bem-estar'}.`
      }
    }

    return context
  }, [])

  // Limita mensagens para contexto
  const getContextMessages = useCallback((allMessages: Message[]): Message[] => {
    if (allMessages.length <= CHAT_CONFIG.MAX_MESSAGES_IN_CONTEXT) {
      return allMessages
    }
    
    const initialMessages = allMessages.slice(0, 2)
    const recentMessages = allMessages.slice(-(CHAT_CONFIG.MAX_MESSAGES_IN_CONTEXT - 2))
    
    return [...initialMessages, ...recentMessages]
  }, [])

  // Envia mensagem para a API
  const sendMessage = useCallback(async (
    currentMessages: Message[],
    onUpdateMessages: (messages: Message[], mood?: string) => void
  ) => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: Date.now(),
      id: generateId()
    }

    const newMessages = [...currentMessages, userMessage]
    setMessages(newMessages)
    onUpdateMessages(newMessages)
    setInputMessage('')
    setIsLoading(true)
    setError(null)

    try {
      const contextMessages = getContextMessages(newMessages)
      const dynamicContext = generateContext(newMessages)

      const requestBody: ChatRequest = {
        context: dynamicContext,
        messages: contextMessages,
        temperature: CHAT_CONFIG.TEMPERATURE,
        max_tokens: CHAT_CONFIG.MAX_TOKENS
      }

      const response = await fetch('http://localhost:2508/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`)
      }

      const data: ChatResponse = await response.json()
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        await simulateTyping(() => {
          const assistantMessage: Message = {
            role: 'assistant',
            content: data.choices[0].message.content,
            timestamp: Date.now(),
            id: generateId()
          }
          
          // Extrai o humor da resposta
          const detectedMood = extractMoodFromResponse(assistantMessage.content)
          
          const finalMessages = [...newMessages, assistantMessage]
          setMessages(finalMessages)
          onUpdateMessages(finalMessages, detectedMood)
        })
      } else {
        throw new Error('Formato de resposta inesperado da API')
      }
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err)
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }, [inputMessage, isLoading, getContextMessages, generateContext, simulateTyping])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      // Esta função será chamada pelo componente pai
    }
  }

  return {
    messages,
    inputMessage,
    isLoading,
    error,
    isTyping,
    messagesEndRef,
    setMessages,
    setInputMessage,
    setError,
    sendMessage,
    handleKeyPress
  }
}
