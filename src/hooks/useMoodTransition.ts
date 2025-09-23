import { useState, useCallback } from 'react'
import { MoodType } from '../types'
import { MOOD_PALETTES } from '../constants'

export const useMoodTransition = () => {
  const [currentMood, setCurrentMood] = useState<MoodType>('default')
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Função para transição suave entre humores
  const transitionToMood = useCallback((newMood: MoodType) => {
    if (newMood !== currentMood) {
      setIsTransitioning(true)
      
      // Pequeno delay para iniciar a transição
      setTimeout(() => {
        setCurrentMood(newMood)
        
        // Finaliza a transição após a animação
        setTimeout(() => {
          setIsTransitioning(false)
        }, 2000)
      }, 100)
    }
  }, [currentMood])

  // Obtém a paleta de cores atual
  const currentPalette = MOOD_PALETTES[currentMood]

  return {
    currentMood,
    isTransitioning,
    currentPalette,
    transitionToMood,
    setCurrentMood
  }
}
