import { useState } from 'react'
import { Difficulty } from '../Utils/Types'
import { useGameContext } from './useContext'
import useTokenAnimation from './useTokenAnimation'

const useAI = () => {
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY)
    const { board, currPlayer } = useGameContext()
    const { startAnimation } = useTokenAnimation()

    const playMove = () => {
        const worker = new Worker(
            new URL('../Utils/aiWorker.ts', import.meta.url),
            { type: 'module' }
        )

        worker.onmessage = (e) => {
            const { col } = e.data
            // Utilisez score et col comme nécessaire.
            const columns = document.querySelectorAll('.column')
            const target = columns[col] as HTMLDivElement
            startAnimation(target, col)
        }

        // envoi de données au worker
        worker.postMessage({
            board: board,
            depth: difficulty,
            alpha: -Infinity,
            beta: Infinity,
            isMaximizingPlayer: true,
            player: currPlayer,
        })

        // N'oubliez pas de nettoyer
        return () => worker.terminate()
    }
    const adjustDifficulty = (value: keyof typeof Difficulty) => {
        setDifficulty(Difficulty[value])
    }

    return { playMove, adjustDifficulty }
}

export default useAI
