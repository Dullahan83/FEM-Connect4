import React, { createContext } from 'react'
import useGame from '../../Hooks/useGame'
import useTimer from '../../Hooks/useTimer'
import { TokenColor } from '../../Utils/Types'

type GameContext = {
    board: TokenColor[][]
    addToken: (colIndex: number, player: TokenColor) => void
    currPlayer: TokenColor
    winner: TokenColor | null
    winningPositions: number[][]
    resetGame: () => void
    score: { red: number; yellow: number }
    startNewRound: () => void
    onTimeUp: () => void
    isGameOver: boolean
    timer: number
    StartTimer: (val?: number) => void
    ClearTimer: () => void
    activateTimer: boolean
    PauseTimer: () => void
}

export const GameContext = createContext<GameContext | null>(null)

const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        board,
        addToken,
        currPlayer,
        winner,
        winningPositions,
        resetGame,
        score,
        startNewRound,
        onTimeUp,
        isGameOver,
        activateTimer,
    } = useGame()
    const { timer, StartTimer, ClearTimer, PauseTimer } = useTimer()
    return (
        <GameContext.Provider
            value={{
                board,
                addToken,
                currPlayer,
                winner,
                winningPositions,
                resetGame,
                score,
                startNewRound,
                onTimeUp,
                isGameOver,
                timer,
                StartTimer,
                ClearTimer,
                activateTimer,
                PauseTimer,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider
