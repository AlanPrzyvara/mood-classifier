'use client'

import { useState, useEffect } from 'react'
import { Sidebar, Header, ChatArea, MessageInput } from '../components'
import { useChatSessions } from '../hooks/useChatSessions'
import { useMoodTransition } from '../hooks/useMoodTransition'
import { useChat } from '../hooks/useChat'

export default function ChatBot() {
  const [showSidebar, setShowSidebar] = useState(true)
  
  // Hooks customizados
  const {
    sessions,
    sessionId,
    loadSessions,
    createNewSession,
    updateCurrentSession,
    loadSession,
    deleteSession
  } = useChatSessions()
  
  const {
    currentMood,
    isTransitioning,
    currentPalette,
    transitionToMood,
    setCurrentMood
  } = useMoodTransition()
  
  const {
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
  } = useChat()

  // Inicializa o componente
  useEffect(() => {
    const currentSession = loadSessions()
    if (currentSession) {
      setMessages(currentSession.messages)
      const sessionMood = currentSession.currentMood || 'default'
      setCurrentMood(sessionMood)
    } else {
      createNewSession()
    }
  }, [loadSessions, setMessages, setCurrentMood, createNewSession])

  // Handlers
  const handleSendMessage = () => {
    sendMessage(messages, (newMessages, detectedMood) => {
      updateCurrentSession(newMessages, detectedMood as any)
      if (detectedMood) {
        transitionToMood(detectedMood as any)
      }
    })
  }

  const handleLoadSession = (targetSessionId: string) => {
    const targetSession = loadSession(targetSessionId)
    if (targetSession) {
      setMessages(targetSession.messages)
      const sessionMood = targetSession.currentMood || 'default'
      transitionToMood(sessionMood)
    }
  }

  const handleDeleteSession = (sessionIdToDelete: string) => {
    const newSession = deleteSession(sessionIdToDelete)
    if (newSession) {
      setMessages(newSession.messages)
      setCurrentMood('default')
    }
  }

  const handleClearCurrentChat = () => {
    const newSession = createNewSession()
    setMessages(newSession.messages)
    setCurrentMood('default')
    setError(null)
  }

  const handleSelectStarter = (starter: string) => {
    setInputMessage(starter)
  }

  const handleKeyPressWithSend = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={`flex h-screen bg-gradient-to-br ${currentPalette.background} dark:from-gray-900 dark:via-${currentPalette.darkBackground} dark:to-gray-800 transition-all duration-2000 ease-in-out ${isTransitioning ? 'opacity-95' : 'opacity-100'}`}>
      {/* Sidebar */}
      <Sidebar
        showSidebar={showSidebar}
        sessions={sessions}
        sessionId={sessionId}
        currentPalette={currentPalette}
        onToggleSidebar={() => setShowSidebar(false)}
        onCreateNewSession={handleClearCurrentChat}
        onLoadSession={handleLoadSession}
        onDeleteSession={handleDeleteSession}
      />

      {/* Área principal do chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          showSidebar={showSidebar}
          currentPalette={currentPalette}
          onToggleSidebar={() => setShowSidebar(true)}
          onClearCurrentChat={handleClearCurrentChat}
        />

        {/* Chat Area */}
        <ChatArea
          messages={messages}
          isLoading={isLoading}
          isTyping={isTyping}
          error={error}
          currentPalette={currentPalette}
          onSelectStarter={handleSelectStarter}
          messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
        />

        {/* Message Input */}
        <MessageInput
          inputMessage={inputMessage}
          isLoading={isLoading}
          messagesCount={messages.length}
          currentPalette={currentPalette}
          onInputChange={setInputMessage}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPressWithSend}
        />
      </div>
    </div>
  )
}