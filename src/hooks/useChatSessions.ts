import { useState, useCallback } from 'react'
import { ChatSession, Message, MoodType } from '../types'
import { CHAT_CONFIG } from '../constants'
import { generateId } from '../utils'

export const useChatSessions = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [sessionId, setSessionId] = useState<string>('')

  // Carrega sessões salvas do localStorage
  const loadSessions = useCallback(() => {
    try {
      const savedSessions = localStorage.getItem(CHAT_CONFIG.STORAGE_KEY)
      const currentSessionId = localStorage.getItem(CHAT_CONFIG.CURRENT_SESSION_KEY)
      
      if (savedSessions) {
        const parsedSessions: ChatSession[] = JSON.parse(savedSessions)
        setSessions(parsedSessions)
        
        if (currentSessionId) {
          const currentSession = parsedSessions.find(s => s.id === currentSessionId)
          if (currentSession) {
            setSessionId(currentSessionId)
            return currentSession
          }
        }
      }
      
      return null
    } catch (error) {
      console.error('Erro ao carregar sessões:', error)
      return null
    }
  }, [])

  // Cria nova sessão
  const createNewSession = useCallback(() => {
    const newSessionId = generateId()
    // const welcomeMessage = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]
    
    const newSession: ChatSession = {
      id: newSessionId,
      messages: [{
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
        id: generateId()
      }],
      createdAt: Date.now(),
      lastActivity: Date.now(),
      title: 'Nova Conversa',
      currentMood: 'default'
    }
    
    setSessionId(newSessionId)
    setSessions(prev => [newSession, ...prev])
    localStorage.setItem(CHAT_CONFIG.CURRENT_SESSION_KEY, newSessionId)
    
    return newSession
  }, [])

  // Salva sessões no localStorage
  const saveSessions = useCallback((updatedSessions: ChatSession[]) => {
    try {
      localStorage.setItem(CHAT_CONFIG.STORAGE_KEY, JSON.stringify(updatedSessions))
      setSessions(updatedSessions)
    } catch (error) {
      console.error('Erro ao salvar sessões:', error)
    }
  }, [])

  // Atualiza mensagens da sessão atual
  const updateCurrentSession = useCallback((newMessages: Message[], newMood?: MoodType) => {
    setSessions(prev => {
      const updated = prev.map(session => 
        session.id === sessionId 
          ? { 
              ...session, 
              messages: newMessages, 
              lastActivity: Date.now(),
              title: newMessages.length > 1 ? newMessages[1].content.substring(0, 30) + '...' : 'Nova Conversa',
              currentMood: newMood || session.currentMood || 'default'
            }
          : session
      )
      saveSessions(updated)
      return updated
    })
  }, [sessionId, saveSessions])

  // Carrega sessão específica
  const loadSession = useCallback((targetSessionId: string) => {
    const targetSession = sessions.find(s => s.id === targetSessionId)
    if (targetSession) {
      setSessionId(targetSessionId)
      localStorage.setItem(CHAT_CONFIG.CURRENT_SESSION_KEY, targetSessionId)
      return targetSession
    }
    return null
  }, [sessions])

  // Deleta sessão
  const deleteSession = useCallback((sessionIdToDelete: string) => {
    const updatedSessions = sessions.filter(s => s.id !== sessionIdToDelete)
    saveSessions(updatedSessions)
    
    if (sessionIdToDelete === sessionId) {
      return createNewSession()
    }
    
    return null
  }, [sessions, sessionId, saveSessions, createNewSession])

  return {
    sessions,
    sessionId,
    loadSessions,
    createNewSession,
    updateCurrentSession,
    loadSession,
    deleteSession
  }
}
