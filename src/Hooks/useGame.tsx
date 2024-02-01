import React, { useState } from 'react'
import { TokenColor } from '../Utils/Types'
import { checkForWinner } from '../Utils/functions'
import useScore from './useScore'

const initialBoard: TokenColor[][] = [[], [], [], [], [], [], []]

const useGame = () => {
    const [board, setBoard] = React.useState(initialBoard)
    const [winner, setWinner] = React.useState<TokenColor | null>(null)
    const [isGameOver, setIsGameOver] = React.useState(false)
    const [currPlayer, setCurrPlayer] = React.useState<TokenColor>('red')
    const [winningPositions, setWinningPositions] = React.useState<number[][]>(
        []
    )
    const { score, updateScore, resetScore } = useScore()
    const [activateTimer, setActivateTimer] = useState(false)

    const addToken = (colIndex: number, player: TokenColor) => {
        if (board.every((col) => col.length === 0)) setActivateTimer(true)
        if (board[colIndex].length > 5 || winner || isGameOver) return

        setBoard((prev) => {
            const newBoard = [...prev]
            newBoard[colIndex] = [...newBoard[colIndex], player]
            const rowIndex = newBoard[colIndex].length - 1

            const result = checkForWinner(newBoard, colIndex, rowIndex, player)
            if (result) {
                setWinner(player)
                setWinningPositions(result)
                updateScore(player)
            }
            if (newBoard.every((col) => col.length > 5)) {
                setIsGameOver(true)
            }
            return newBoard
        })
        setCurrPlayer((prev) => (prev === 'red' ? 'yellow' : 'red'))
    }
    const startNewRound = () => {
        setBoard(initialBoard)
        setCurrPlayer(winner === 'red' ? 'yellow' : 'red')
        setWinner(null)
        setWinningPositions([])
        setIsGameOver(false)
    }
    const resetGame = () => {
        resetScore()
        setBoard(initialBoard)
        setCurrPlayer('red')
        setWinner(null)
        setIsGameOver(false)
        setWinningPositions([])
        setActivateTimer(false)
    }

    const onTimeUp = () => {
        setActivateTimer(false)
        setWinner(currPlayer === 'red' ? 'yellow' : 'red')
        updateScore(currPlayer === 'red' ? 'yellow' : 'red')
    }

    return {
        board,
        setBoard,
        addToken,
        startNewRound,
        resetGame,
        currPlayer,
        winner,
        winningPositions,
        score,
        onTimeUp,
        isGameOver,
        activateTimer,
    }
}

export default useGame
