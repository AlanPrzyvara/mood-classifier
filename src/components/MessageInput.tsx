'use client'

import { MoodPalette } from '../types'
import { CHAT_CONFIG } from '../constants'

interface MessageInputProps {
  inputMessage: string
  isLoading: boolean
  messagesCount: number
  currentPalette: MoodPalette
  onInputChange: (value: string) => void
  onSendMessage: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
}

export const MessageInput = ({
  inputMessage,
  isLoading,
  messagesCount,
  currentPalette,
  onInputChange,
  onSendMessage,
  onKeyPress
}: MessageInputProps) => {
  return (
    <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-${currentPalette.border}/50 dark:border-${currentPalette.darkBorder} p-6 transition-all duration-2000 ease-in-out`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Como você está se sentindo... (Enter para enviar)"
              className={`w-full px-5 py-4 pr-16 border border-${currentPalette.border} dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-${currentPalette.accent} focus:border-transparent dark:bg-gray-700/50 dark:text-white resize-none backdrop-blur-sm bg-white/50 transition-all duration-2000 ease-in-out`}
              rows={1}
              style={{ minHeight: '56px', maxHeight: '120px' }}
              disabled={isLoading}
            />
            <div className={`absolute right-4 bottom-4 text-xs text-${currentPalette.accent} dark:text-${currentPalette.accent} transition-all duration-2000 ease-in-out`}>
              {messagesCount}/{CHAT_CONFIG.MAX_MESSAGES_IN_CONTEXT}
            </div>
          </div>
          <button
            onClick={onSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className={`px-8 py-4 bg-gradient-to-r ${currentPalette.button} text-white rounded-2xl hover:${currentPalette.buttonHover} focus:ring-2 focus:ring-${currentPalette.accent} focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-2000 ease-in-out font-medium shadow-lg hover:shadow-xl`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Enviar'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
