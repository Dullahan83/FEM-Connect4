import { useContext } from 'react'
import { GameContext } from '../Components/Context/GameContext'

export const useGameContext = () => {
    const context = useContext(GameContext)
    if (context === null) {
        throw new Error('useGameContext must be used within a GameProvider')
    }
    return context
}
