'use client'

import { Message, MoodPalette } from '../types'
import { formatTimestamp } from '../utils'

interface MessageBubbleProps {
  message: Message
  currentPalette: MoodPalette
}

export const MessageBubble = ({ message, currentPalette }: MessageBubbleProps) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-3 max-w-2xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-2000 ease-in-out ${
          message.role === 'user' 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
            : `bg-gradient-to-r ${currentPalette.primary} text-white`
        }`}>
          {message.role === 'user' ? '👤' : '🌸'}
        </div>
        
        {/* Message bubble */}
        <div
          className={`px-5 py-4 rounded-2xl shadow-sm transition-all duration-2000 ease-in-out ${
            message.role === 'user'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-md'
              : `bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white border border-${currentPalette.border}/50 dark:border-gray-600 rounded-bl-md`
          }`}
        >
          <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
            {message.content}
          </div>
          <div className={`text-xs mt-2 ${
            message.role === 'user' 
              ? 'text-blue-100' 
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {formatTimestamp(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  )
}
