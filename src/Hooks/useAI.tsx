import { useCallback } from 'react'
import { Board, TokenColor } from '../Utils/Types'
import { useGameContext } from './useContext'

const useAI = () => {
    const { currPlayer } = useGameContext()

    const minimax = useCallback(
        (
            board: Board,
            depth: number,
            alpha: number,
            beta: number,
            isMaximizingPlayer: boolean,
            player: TokenColor
        ): { score: number; col: number } => {
            if (depth === 0 || isTerminalNode(board)) {
                return { score: evaluateBoard(board, player), col: -1 }
            }
            let bestCol = -1

            const moves = generateAllPossibleMoves(board)
            const opponent = player === 'yellow' ? 'red' : 'yellow'

            if (isMaximizingPlayer) {
                //branche maximisante, tour du joueur yellow (ordinateur)
                bestCol = -1
                let maxEval = -Infinity
                for (const col of moves) {
                    const newBoard = applyMove(board, col, 'yellow')
                    const evaluation = minimax(
                        newBoard,
                        depth - 1,
                        alpha,
                        beta,
                        false,
                        opponent
                    ).score
                    if (evaluation > maxEval) {
                        // console.log(evaluation)

                        maxEval = evaluation
                        bestCol = col
                    }
                    alpha = Math.max(alpha, evaluation)
                    if (alpha >= beta) break
                }
                return { score: maxEval, col: bestCol }
            } else {
                let minEval = Infinity
                bestCol = -1
                for (const col of moves) {
                    const newBoard = applyMove(board, col, 'red')
                    const evaluation = minimax(
                        newBoard,
                        depth - 1,
                        alpha,
                        beta,
                        true,
                        currPlayer
                    ).score
                    if (evaluation < minEval) {
                        minEval = evaluation
                        bestCol = col
                        // console.log(minEval)
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
                possibleMoves.push(col)
            }
        }
        return possibleMoves
    }
    const isGameOver = (board: Board) => {
        return board.every((col) => col.length === 5)
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

    const hasWinner = (board: Board, player: TokenColor) => {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 5 - 3; j++) {
                if (
                    board[i][j] == player &&
                    board[i][j + 1] == player &&
                    board[i][j + 2] == player &&
                    board[i][j + 3] == player
                ) {
                    return true
                }
            }
        }

        for (let i = 0; i < 6 - 3; i++) {
            for (let j = 0; j < 5; j++) {
                if (
                    board[i][j] == player &&
                    board[i + 1][j] == player &&
                    board[i + 2][j] == player &&
                    board[i + 3][j] == player
                ) {
                    return true
                }
            }
        }

        for (let i = 0; i < 6 - 3; i++) {
            for (let j = 0; j < 5 - 3; j++) {
                if (
                    board[i][j] == player &&
                    board[i + 1][j + 1] == player &&
                    board[i + 2][j + 2] == player &&
                    board[i + 3][j + 3] == player
                ) {
                    return true
                }
            }
        }

        for (let i = 0; i < 6 - 3; i++) {
            for (let j = 3; j < 5; j++) {
                if (
                    board[i][j] == player &&
                    board[i + 1][j - 1] == player &&
                    board[i + 2][j - 2] == player &&
                    board[i + 3][j - 3] == player
                ) {
                    return true
                }
            }
        }
    }

    const isTerminalNode = (board: Board) => {
        return (
            hasWinner(board, 'yellow') ||
            hasWinner(board, 'red') ||
            isGameOver(board)
        )
    }
    const evaluateBoard = (board: Board, player: TokenColor) => {
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
                score += evaluateLineScore(board, y, 0, dir.x, dir.y, player)
            })
            console.log(score)
        }
        return score
    }

    const evaluateLineScore = (
        board: Board,
        startX: number,
        startY: number,
        deltaX: number,
        deltaY: number,
        player: TokenColor
    ) => {
        let count = 0
        let opponentCount = 0
        let openEnds = 0
        let score = 0
        for (let i = 0; i < 6; i++) {
            // Calculate col and row pos given orientation
            const x = startX + i * deltaX
            const y = startY + i * deltaY
            // console.log(player)

            if (x >= 0 && x < 7 && y >= 0 && y < 6) {
                if (board[x][y] === 'yellow') {
                    count++
                    opponentCount = 0
                } else if (board[x][y] === 'red') {
                    opponentCount++
                    count = 0
                } else {
                    openEnds++
                }
            }
        }
        if (opponentCount === 3 && openEnds >= 1) score -= 9999
        else if (opponentCount === 2 && openEnds >= 2) score -= 50
        if (count === 3 && openEnds >= 1) score += 9999
        else if (count === 2 && openEnds >= 2) score += 50

        return score
    }
    return { minimax }
}

export default useAI
