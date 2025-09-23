'use client'

import { ChatSession, MoodPalette } from '../types'
import { formatTimestamp } from '../utils'

interface SidebarProps {
  showSidebar: boolean
  sessions: ChatSession[]
  sessionId: string
  currentPalette: MoodPalette
  onToggleSidebar: () => void
  onCreateNewSession: () => void
  onLoadSession: (sessionId: string) => void
  onDeleteSession: (sessionId: string) => void
}

export const Sidebar = ({
  showSidebar,
  sessions,
  sessionId,
  currentPalette,
  onToggleSidebar,
  onCreateNewSession,
  onLoadSession,
  onDeleteSession
}: SidebarProps) => {
  return (
    <div className={`${showSidebar ? 'w-80' : 'w-0'} transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-r border-${currentPalette.border}/50 dark:border-${currentPalette.darkBorder} flex flex-col overflow-hidden`}>
      <div className={`p-6 border-b border-${currentPalette.border}/50 dark:border-${currentPalette.darkBorder} transition-all duration-2000 ease-in-out`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            💬 Nossas Conversas
          </h2>
          <button
            onClick={onToggleSidebar}
            className={`p-2 text-gray-500 hover:text-${currentPalette.accent} dark:text-gray-400 dark:hover:text-${currentPalette.accent} transition-all duration-2000 ease-in-out`}
          >
            ✕
          </button>
        </div>
        <button
          onClick={onCreateNewSession}
          className={`w-full px-4 py-3 bg-gradient-to-r ${currentPalette.button} text-white rounded-xl hover:${currentPalette.buttonHover} transition-all duration-2000 ease-in-out text-sm font-medium shadow-lg hover:shadow-xl`}
        >
          ✨ Nova Conversa
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-2000 ease-in-out mb-3 ${
              session.id === sessionId
                ? `bg-gradient-to-r ${currentPalette.message} dark:${currentPalette.darkMessage} border border-${currentPalette.accent}/50 dark:border-${currentPalette.accent} shadow-md`
                : `hover:bg-white/60 dark:hover:bg-gray-700/60 border border-transparent hover:border-${currentPalette.border} dark:hover:border-gray-600`
            }`}
            onClick={() => onLoadSession(session.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800 dark:text-white truncate mb-1">
                  {session.title || 'Conversa'}
                </div>
                <div className={`text-xs text-${currentPalette.text} dark:text-${currentPalette.accent} mb-1 transition-all duration-2000 ease-in-out`}>
                  {session.messages.length} mensagens
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimestamp(session.lastActivity)}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteSession(session.id)
                }}
                className="ml-2 text-gray-400 hover:text-red-500 transition-all duration-2000 ease-in-out p-1"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
