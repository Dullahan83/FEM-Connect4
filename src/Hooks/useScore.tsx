import React from 'react'
import { TokenColor } from '../Utils/Types'

type Score = {
    red: number
    yellow: number
}

const initialScore: Score = {
    red: 0,
    yellow: 0,
}

const useScore = () => {
    const [score, setScore] = React.useState<Score>(initialScore)

    const updateScore = (player: TokenColor) => {
        setScore((prev) => {
            const newScore = { ...prev }
            newScore[player] += 1
            return newScore
        })
    }

    const resetScore = () => {
        setScore(initialScore)
    }

    return { score, updateScore, resetScore }
}

export default useScore
