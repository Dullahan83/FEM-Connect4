import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CheckForWinner, GetLine } from './Types'

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
