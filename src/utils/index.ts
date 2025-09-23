import { MoodType } from '../types'

// Gera ID único para mensagens e sessões
export const generateId = (): string => 
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Extrai o humor da resposta da psicóloga
export const extractMoodFromResponse = (response: string): MoodType => {
  const lowerResponse = response.toLowerCase()
  
  // Procura por padrões que indicam humor feliz
  if (lowerResponse.includes('humor: feliz') || 
      lowerResponse.includes('feliz') ||
      lowerResponse.includes('alegre') ||
      lowerResponse.includes('positivo') ||
      lowerResponse.includes('otimista') ||
      lowerResponse.includes('animado')) {
    return 'feliz'
  }
  
  // Procura por padrões que indicam humor triste
  if (lowerResponse.includes('humor: triste') || 
      lowerResponse.includes('triste') ||
      lowerResponse.includes('melancólico') ||
      lowerResponse.includes('deprimido') ||
      lowerResponse.includes('abatido') ||
      lowerResponse.includes('desanimado')) {
    return 'triste'
  }
  
  // Procura por padrões que indicam humor tranquilo
  if (lowerResponse.includes('humor: tranquilo') || 
      lowerResponse.includes('tranquilo') ||
      lowerResponse.includes('calmo') ||
      lowerResponse.includes('sereno') ||
      lowerResponse.includes('relaxado') ||
      lowerResponse.includes('equilibrado')) {
    return 'tranquila'
  }
  
  // Retorna padrão se não encontrar nenhum humor específico
  return 'default'
}

// Formata timestamp para exibição
export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Obtém o período do dia
export const getTimeOfDay = (): string => {
  const hour = new Date().getHours()
  if (hour < 12) return 'manhã'
  if (hour < 18) return 'tarde'
  return 'noite'
}
