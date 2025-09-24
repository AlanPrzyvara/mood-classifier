'use client'

import { MoodPalette } from '../types'
import { PsychologyIcon } from './Icons'

interface TypingIndicatorProps {
  currentPalette: MoodPalette
}

export const TypingIndicator = ({ currentPalette }: TypingIndicatorProps) => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${currentPalette.primary} text-white flex items-center justify-center text-lg transition-all duration-2000 ease-in-out`}>
          <PsychologyIcon className="w-5 h-5" />
        </div>
        <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-${currentPalette.border}/50 dark:border-gray-600 rounded-2xl rounded-bl-md px-5 py-4 transition-all duration-2000 ease-in-out`}>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className={`w-2 h-2 bg-${currentPalette.accent} rounded-full animate-bounce transition-all duration-2000 ease-in-out`}></div>
              <div className={`w-2 h-2 bg-${currentPalette.accent} rounded-full animate-bounce transition-all duration-2000 ease-in-out`} style={{ animationDelay: '0.1s' }}></div>
              <div className={`w-2 h-2 bg-${currentPalette.accent} rounded-full animate-bounce transition-all duration-2000 ease-in-out`} style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Sofia está digitando...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
