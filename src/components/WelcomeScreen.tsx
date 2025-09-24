'use client'

import { MoodPalette } from '../types'
import { CONVERSATION_STARTERS } from '../constants'
import { PsychologyIcon } from './Icons'

interface WelcomeScreenProps {
  currentPalette: MoodPalette
  onSelectStarter: (starter: string) => void
}

export const WelcomeScreen = ({ currentPalette, onSelectStarter }: WelcomeScreenProps) => {
  return (
    <div className="text-center text-gray-600 dark:text-gray-400 mt-16">
      <div className="mb-6 flex justify-center">
        <div className={`p-6 rounded-full bg-gradient-to-r ${currentPalette.primary} text-white`}>
          <PsychologyIcon className="w-16 h-16" />
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Bem-vindo(a) ao seu espaço seguro
      </h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
        Aqui você pode compartilhar seus sentimentos, preocupações e sonhos. 
        Estou aqui para te ouvir sem julgamentos, com muito carinho e profissionalismo.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {CONVERSATION_STARTERS.map((starter, index) => (
          <button
            key={index}
            onClick={() => onSelectStarter(starter)}
            className={`p-4 text-left bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-${currentPalette.border} dark:border-gray-600 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-2000 ease-in-out hover:shadow-md`}
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {starter}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
