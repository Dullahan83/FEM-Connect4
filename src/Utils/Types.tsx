export type TokenColor = 'red' | 'yellow'

export type Board = TokenColor[][]

export type GetLine = (
    board: Board,
    startX: number,
    startY: number,
    deltaX: number,
    deltaY: number,
    player: TokenColor
) => number[][]

export type CheckForWinner = (
    board: Board,
    colIndex: number,
    rowIndex: number,
    player: TokenColor
) => number[][] | null
