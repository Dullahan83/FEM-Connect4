import useAI from './useAI'
import { useGameContext } from './useContext'
import useTokenAnimation from './useTokenAnimation'

const useComputerMove = () => {
    const { board, currPlayer } = useGameContext()
    const { minimax } = useAI()
    const { startAnimation } = useTokenAnimation()
    const playMove = () => {
        const { score, col } = minimax(
            board,
            2,
            -Infinity,
            Infinity,
            true,
            currPlayer
        )
        const columns = document.querySelectorAll('.column')
        const target = columns[col] as HTMLDivElement
        startAnimation(target, col)
        console.log(col, score)
    }

    return { playMove }
}

export default useComputerMove
