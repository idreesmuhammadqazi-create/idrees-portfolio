'use client'

import { useEasterEgg } from '@/lib/EasterEggContext'
import KonamiHandler from '@/components/EasterEggs/KonamiHandler'
import SecretConsole from '@/components/EasterEggs/SecretConsole'
import CustomCursor from '@/components/EasterEggs/CustomCursor'
import AchievementsModal from '@/components/EasterEggs/AchievementsModal'

export default function EasterEggOrchestrator() {
  const { isAchievementsModalOpen, hideAchievementsModal } = useEasterEgg()

  return (
    <>
      <KonamiHandler enabled={true} />
      <SecretConsole enabled={true} />
      <CustomCursor enabled={false} />
      <AchievementsModal 
        isOpen={isAchievementsModalOpen} 
        onClose={hideAchievementsModal} 
      />
    </>
  )
}
