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

export enum Difficulty {
    EASY = 1,
    MEDIUM = 3,
    HARD = 6,
    EXTREME = 9,
}
