// Tipos TypeScript baseados na especificação da API
export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  id: string
}

export interface ChatRequest {
  context: Record<string, string>
  messages: Message[]
  temperature: number
  max_tokens: number
}

export interface ChatResponse {
  choices: Array<{
    message: {
      role: string
      content: string
    }
  }>
}

export interface ChatSession {
  id: string
  messages: Message[]
  createdAt: number
  lastActivity: number
  title?: string
  currentMood?: MoodType
}

export type MoodType = 'feliz' | 'triste' | 'tranquila' | 'default'

export interface MoodPalette {
  primary: string
  secondary: string
  background: string
  darkBackground: string
  accent: string
  text: string
  border: string
  darkBorder: string
  button: string
  buttonHover: string
  message: string
  darkMessage: string
}
