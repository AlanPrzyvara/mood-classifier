'use client'

import { MoodPalette } from '../types'
import { getTimeOfDay } from '../utils'

interface HeaderProps {
  showSidebar: boolean
  currentPalette: MoodPalette
  onToggleSidebar: () => void
  onClearCurrentChat: () => void
}

export const Header = ({
  showSidebar,
  currentPalette,
  onToggleSidebar,
  onClearCurrentChat
}: HeaderProps) => {
  return (
    <header className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-${currentPalette.border}/50 dark:border-${currentPalette.darkBorder} p-6 transition-all duration-2000 ease-in-out`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {!showSidebar && (
            <button
              onClick={onToggleSidebar}
              className={`p-2 text-gray-600 hover:text-${currentPalette.accent} dark:text-gray-400 dark:hover:text-${currentPalette.accent} transition-all duration-2000 ease-in-out`}
            >
              ☰
            </button>
          )}
          <div>
            <h1 className={`text-2xl font-bold bg-gradient-to-r ${currentPalette.primary} bg-clip-text text-transparent transition-all duration-2000 ease-in-out`}>
              Sofia - Sua Psicóloga Virtual
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bom {getTimeOfDay()}! Estou aqui para te ouvir com carinho 💜
            </p>
          </div>
        </div>
        <button
          onClick={onClearCurrentChat}
          className={`px-4 py-2 text-sm bg-gradient-to-r ${currentPalette.button} text-white rounded-xl hover:${currentPalette.buttonHover} transition-all duration-2000 ease-in-out`}
        >
           Nova Conversa
        </button>
      </div>
    </header>
  )
}
