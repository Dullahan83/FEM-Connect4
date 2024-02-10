import { useCallback } from 'react'
import { Board, TokenColor } from '../Utils/Types'
import { checkForWinner } from '../Utils/functions'
import { useGameContext } from './useContext'

const useAI = () => {
    const { currPlayer, winner } = useGameContext()

    const minimax = useCallback(
        (
            board: Board,
            depth: number,
            alpha: number,
            beta: number,
            isMaximizingPlayer: boolean,
            player: TokenColor
        ): { score: number; col: number } => {
            if (depth === 0) {
                return { score: evaluateBoard(board, player), col: -1 }
            }
            let bestCol = -1
            // if (test(board, 'yellow')) {
            //     return { score: 9999, col: bestCol }
            // }
            // if (test(board, 'red')) {
            //     return { score: -9999, col: bestCol }
            // }
            const moves = generateAllPossibleMoves(board)
            const opponent = player === 'yellow' ? 'red' : 'yellow'

            if (isMaximizingPlayer) {
                //branche maximisante, tour du joueur yellow
                bestCol = -1
                let maxEval = -Infinity // Juste là car je ne voulais pas modifier directement alpha ou béta
                for (const col of moves) {
                    const newBoard = applyMove(board, col, 'yellow')
                    const evaluation = minimax(
                        newBoard,
                        depth - 1,
                        alpha,
                        beta,
                        false,
                        'red'
                    ).score
                    if (evaluation > maxEval) {
                        console.log(evaluation)

                        maxEval = evaluation
                        bestCol = col
                    }
                    alpha = Math.max(alpha, evaluation)
                    if (alpha >= beta) break
                }
                return { score: maxEval, col: bestCol }
            } else {
                let minEval = Infinity // Juste là car je ne voulais pas modifier directement alpha ou béta
                let bestCol = -1
                for (const col of moves) {
                    const newBoard = applyMove(board, col, 'red')
                    const evaluation = minimax(
                        newBoard,
                        depth - 1,
                        alpha,
                        beta,
                        true,
                        'yellow'
                    ).score
                    if (evaluation < minEval) {
                        minEval = evaluation
                        bestCol = col
                    }
                    beta = Math.min(beta, evaluation)
                    if (alpha >= beta) break
                }
                return { score: minEval, col: bestCol }
            }
        },
        [currPlayer]
    )

    const generateAllPossibleMoves = (board: Board): number[] => {
        const possibleMoves: number[] = []

        for (let col = 0; col < 7; col++) {
            if (board[col].length < 6) {
                // Si la cellule en haut de la colonne est vide
                possibleMoves.push(col)
            }
        }
        return possibleMoves
    }

    const applyMove = (
        board: Board,
        column: number,
        currPlayer: TokenColor
    ): Board => {
        // Applique un coup dans la colonne spécifiée et retourne le nouveau plateau
        const newBoard = board.map((row) => [...row])
        // Implémentez l'ajout d'un jeton dans la colonne

        if (newBoard[column].length < 6) {
            // Si la cellule est vide
            newBoard[column].push(currPlayer) // Place le jeton du joueur ('red' ou 'yellow')
        }
        return newBoard
    }
    const test = (board, player) => {
        let result
        for (let i = 0; i < board.length; i++) {
            result = checkForWinner(board, i, board[i].length - 1, player)
            if (result) {
                return result
            }
            return null
        }
        return result
    }
    const evaluateBoard = (board, player) => {
        // console.log(player, 'in evaluate board')

        const directions = [
            { x: 1, y: 0 }, // Horizontal
            { x: 0, y: 1 }, // Vertical
            { x: 1, y: 1 }, // Diagonal up
            { x: 1, y: -1 }, // Diagonal down
        ]
        let score = 0
        for (let i = 0; i < board[3].length; i++) {
            if (board[3][i] === 'yellow') score++
            else if (board[3][i] === 'red') score--
        }
        score *= 3
        for (let y = 0; y < board.length; y++) {
            // Pour chaque colonne, évaluer les directions
            directions.forEach((dir) => {
                score += evaluateLineScore(board, 0, y, dir.x, dir.y, player)
            })
        }
        return score
    }

    const evaluateLineScore = (
        board,
        startX,
        startY,
        deltaX,
        deltaY,
        player
    ) => {
        let count = 0
        let opponentCount = 0
        let openEnds = 0
        let score = 0
        const opponent = player === 'yellow' ? 'red' : 'yellow'
        for (let i = 0; i < 6; i++) {
            // Calculate col and row pos given orientation
            const x = startX + i * deltaX
            const y = startY + i * deltaY

            if (x >= 0 && x < 7 && y >= 0 && y < 6) {
                if (board[x][y] === player) {
                    count++
                    opponentCount = 0
                } else if (board[x][y] === opponent) {
                    opponentCount++
                    count = 0
                } else if (!board[x][y]) {
                    openEnds++
                }
            }
        }
        if (opponentCount === 3 && openEnds >= 1) score -= 9999
        else if (count === 3 && openEnds >= 1) score += 9999
        else if (count === 2 && openEnds >= 2) score += 5

        return score
    }
    return { minimax }
}

export default useAI
