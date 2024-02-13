import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Board, CheckForWinner, GetLine, TokenColor } from './Types'

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const checkForWinner: CheckForWinner = (
    board,
    colIndex,
    rowIndex,
    player
) => {
    const directions = [
        { x: 1, y: 0 }, // Horizontal
        { x: 0, y: 1 }, // Vertical
        { x: 1, y: 1 }, // Diagonal up
        { x: 1, y: -1 }, // Diagonal down
    ]

    for (let i = 0; i < directions.length; i++) {
        const dir = directions[i]
        const line = getLine(board, colIndex, rowIndex, dir.x, dir.y, player)
        if (line.length >= 4) {
            return line
        }
    }
    return null
}

export const getLine: GetLine = (
    board,
    startX,
    startY,
    deltaX,
    deltaY,
    player
) => {
    let line = []
    for (let i = -3; i <= 3; i++) {
        // Calculate col and row pos given orientation
        const x = startX + i * deltaX
        const y = startY + i * deltaY

        if (x >= 0 && x < 7 && y >= 0 && y < 6 && board[x][y] === player) {
            line.push([x, y])
            if (line.length === 4) break
        } else {
            line = []
        }
    }
    return line
}

export const minimax = (
    board: Board,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizingPlayer: boolean,
    player: TokenColor
): { score: number; col: number } => {
    if (depth === 0 || isTerminalNode(board)) {
        return { score: calculateScore(board), col: -1 }
    }
    let bestCol = -1

    const moves = generateAllPossibleMoves(board)

    if (isMaximizingPlayer) {
        //branche maximisante, tour du joueur yellow (ordinateur)
        bestCol = -1
        let maxEval = -Infinity
        for (const col of moves) {
            const newBoard = applyMove(board, col, 'yellow')
            player = 'red'
            const evaluation = minimax(
                newBoard,
                depth - 1,
                alpha,
                beta,
                false,
                player
            ).score

            if (evaluation > maxEval) {
                // console.log(evaluation)

                maxEval = evaluation
                bestCol = col
            }
            // board[col].pop()
            alpha = Math.max(alpha, evaluation)
            if (alpha >= beta) break
        }
        return { score: maxEval, col: bestCol }
    } else {
        let minEval = Infinity
        bestCol = -1
        for (const col of moves) {
            const newBoard = applyMove(board, col, 'red')
            player = 'yellow'
            const evaluation = minimax(
                newBoard,
                depth - 1,
                alpha,
                beta,
                true,
                player
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
}

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

const calculateScore = (board: Board) => {
    let score = 0

    // Horizontal
    for (let r = 0; r < 6; r++) {
        // 6 lignes
        for (let c = 0; c <= 7 - 4; c++) {
            // 7 colonnes - 3 pour la recherche horizontale
            const slice = [
                board[c][r],
                board[c + 1][r],
                board[c + 2][r],
                board[c + 3][r],
            ]
            score += evaluateSlice(slice)
        }
    }

    // Vertical
    for (let c = 0; c < 7; c++) {
        // 7 colonnes
        for (let r = 0; r <= 6 - 4; r++) {
            // 6 lignes - 3 pour la recherche verticale
            const slice = [
                board[c][r],
                board[c][r + 1],
                board[c][r + 2],
                board[c][r + 3],
            ]
            score += evaluateSlice(slice)
        }
    }

    // Diagonal up
    for (let r = 3; r < 6; r++) {
        // Commence à 3 pour permettre la montée diagonale
        for (let c = 0; c <= 7 - 4; c++) {
            const slice = [
                board[c][r],
                board[c + 1][r - 1],
                board[c + 2][r - 2],
                board[c + 3][r - 3],
            ]
            score += evaluateSlice(slice)
        }
    }

    // Diagonal down
    for (let r = 0; r <= 6 - 4; r++) {
        // Pour permettre la descente diagonale
        for (let c = 0; c <= 7 - 4; c++) {
            const slice = [
                board[c][r],
                board[c + 1][r + 1],
                board[c + 2][r + 2],
                board[c + 3][r + 3],
            ]
            score += evaluateSlice(slice)
        }
    }
    return score
}

const evaluateSlice = (slice: TokenColor[]) => {
    let score = 0

    const playerCount = slice.filter((x: TokenColor) => x === 'yellow').length
    const opponentCount = slice.filter((x: TokenColor) => x === 'red').length
    const emptyCount = slice.filter((x: TokenColor) => !x).length

    if (playerCount === 4) score += 1000
    else if (opponentCount === 4) score -= 1000
    else if (playerCount === 3 && emptyCount >= 1) score += 100
    else if (opponentCount === 3 && emptyCount >= 1) score -= 100
    else if (playerCount === 2 && emptyCount >= 2) score += 10
    else if (opponentCount === 2 && emptyCount >= 2) score -= 10

    return score
}
