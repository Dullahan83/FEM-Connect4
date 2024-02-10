import { useState } from 'react'
import { useGameContext } from './useContext'

const useTokenAnimation = () => {
    const [isAnimating, setIsAnimating] = useState(false)
    const [showToken, setShowToken] = useState(false)
    const { board, addToken, currPlayer, winner, isGameOver } = useGameContext()

    const startAnimation = (target: HTMLDivElement, colIndex: number) => {
        if (!target) return
        const token = document.createElement('span')
        const classname = ` absolute z-40 bg-white aspect-square token rounded-full `
        const emptyCells = 6 - board[colIndex].length
        const durationAnim = emptyCells * 100
        token.className = classname
        token.style.setProperty('--empty-cells', String(emptyCells))
        token.style.setProperty('--animation-duration', `${durationAnim}ms`)
        token.classList.add('falling-token')
        token.classList.add(currPlayer === 'red' ? 'redPlayer' : 'yellowPlayer')

        if (winner || isGameOver || isAnimating) return
        target.prepend(token)

        setShowToken(true)
        setIsAnimating(true)

        // Timeout to match the end of animation
        const timer = setTimeout(() => {
            setShowToken(false)
            setIsAnimating(false)
            // Remove temporary token and add new token to boardData
            token.remove()
            addToken(colIndex, currPlayer)
        }, durationAnim)
        return () => clearTimeout(timer)
    }

    return { showToken, startAnimation }
}

export default useTokenAnimation
