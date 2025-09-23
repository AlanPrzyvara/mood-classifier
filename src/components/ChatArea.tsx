'use client'

import { Message, MoodPalette } from '../types'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import { WelcomeScreen } from './WelcomeScreen'

interface ChatAreaProps {
  messages: Message[]
  isLoading: boolean
  isTyping: boolean
  error: string | null
  currentPalette: MoodPalette
  onSelectStarter: (starter: string) => void
  messagesEndRef: React.RefObject<HTMLDivElement>
}

export const ChatArea = ({
  messages,
  isLoading,
  isTyping,
  error,
  currentPalette,
  onSelectStarter,
  messagesEndRef
}: ChatAreaProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.length === 0 && (
          <WelcomeScreen 
            currentPalette={currentPalette}
            onSelectStarter={onSelectStarter}
          />
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            currentPalette={currentPalette}
          />
        ))}

        {(isLoading || isTyping) && (
          <TypingIndicator currentPalette={currentPalette} />
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-100/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-6 py-4 rounded-xl text-sm">
              💔 Ops! Algo deu errado. Tente novamente em alguns instantes.
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
