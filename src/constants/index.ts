import { MoodPalette, MoodType } from '../types'

// Configurações do chat
export const CHAT_CONFIG = {
  MAX_MESSAGES_IN_CONTEXT: 20,
  MAX_TOKENS: 1500,
  TEMPERATURE: 0.8,
  STORAGE_KEY: 'psicologa-chat-sessions',
  CURRENT_SESSION_KEY: 'psicologa-current-session'
}

// Paletas de cores baseadas no humor
export const MOOD_PALETTES: Record<MoodType, MoodPalette> = {
  feliz: {
    primary: 'from-yellow-400 to-orange-400',
    secondary: 'from-yellow-500 to-orange-500',
    background: 'from-yellow-50 via-orange-50 to-amber-50',
    darkBackground: 'from-yellow-900/20 via-orange-900/20 to-amber-900/20',
    accent: 'yellow-500',
    text: 'yellow-600',
    border: 'yellow-200',
    darkBorder: 'yellow-700',
    button: 'from-yellow-500 to-orange-500',
    buttonHover: 'from-yellow-600 to-orange-600',
    message: 'from-yellow-100 to-orange-100',
    darkMessage: 'from-yellow-900/30 to-orange-900/30'
  },
  triste: {
    primary: 'from-blue-400 to-indigo-400',
    secondary: 'from-blue-500 to-indigo-500',
    background: 'from-blue-50 via-indigo-50 to-slate-50',
    darkBackground: 'from-blue-900/20 via-indigo-900/20 to-slate-900/20',
    accent: 'blue-500',
    text: 'blue-600',
    border: 'blue-200',
    darkBorder: 'blue-700',
    button: 'from-blue-500 to-indigo-500',
    buttonHover: 'from-blue-600 to-indigo-600',
    message: 'from-blue-100 to-indigo-100',
    darkMessage: 'from-blue-900/30 to-indigo-900/30'
  },
  tranquila: {
    primary: 'from-green-400 to-emerald-400',
    secondary: 'from-green-500 to-emerald-500',
    background: 'from-green-50 via-emerald-50 to-teal-50',
    darkBackground: 'from-green-900/20 via-emerald-900/20 to-teal-900/20',
    accent: 'green-500',
    text: 'green-600',
    border: 'green-200',
    darkBorder: 'green-700',
    button: 'from-green-500 to-emerald-500',
    buttonHover: 'from-green-600 to-emerald-600',
    message: 'from-green-100 to-emerald-100',
    darkMessage: 'from-green-900/30 to-emerald-900/30'
  },
  default: {
    primary: 'from-purple-400 to-pink-400',
    secondary: 'from-purple-500 to-pink-500',
    background: 'from-purple-50 via-pink-50 to-blue-50',
    darkBackground: 'from-purple-900/20 via-pink-900/20 to-blue-900/20',
    accent: 'purple-500',
    text: 'purple-600',
    border: 'purple-200',
    darkBorder: 'purple-700',
    button: 'from-purple-500 to-pink-500',
    buttonHover: 'from-purple-600 to-pink-600',
    message: 'from-purple-100 to-pink-100',
    darkMessage: 'from-purple-900/30 to-pink-900/30'
  }
}

// Mensagens de boas-vindas personalizadas
export const WELCOME_MESSAGES = [
  "Olá! Meu nome é Sofia. Estou aqui para ouvir você com carinho e sem julgamentos. Como você está se sentindo hoje?",
  "Oi! Sou a Sofia, sua psicóloga virtual. Este é um espaço seguro para você compartilhar o que está em seu coração. O que gostaria de conversar?",
  "Olá, querido(a)! Eu sou a Sofia. Estou aqui para te acompanhar nesta jornada de autoconhecimento. Como posso te ajudar hoje?"
]

// Sugestões de conversa
export const CONVERSATION_STARTERS = [
  "Estou me sentindo ansioso(a) ultimamente",
  "Preciso de ajuda com meus relacionamentos",
  "Estou passando por um momento difícil",
  "Quero melhorar minha autoestima",
  "Estou com dificuldades no trabalho",
  "Sinto que preciso de orientação"
]
