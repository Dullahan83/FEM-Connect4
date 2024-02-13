// import { useState } from 'react'
// import { Difficulty } from '../Utils/Types'
// import useAI from './useAI'
// import { useGameContext } from './useContext'
// import useTokenAnimation from './useTokenAnimation'

// const useComputerMove = () => {
//     const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.HARD)
//     const { board, currPlayer } = useGameContext()
//     const { minimax } = useAI()
//     const { startAnimation } = useTokenAnimation()

//     const adjustDifficulty = (value: Difficulty) => {
//         setDifficulty(value)
//     }

//     const playMove = () => {
//         const { col } = minimax(
//             board,
//             difficulty,
//             -Infinity,
//             Infinity,
//             true,
//             currPlayer
//         )
//         const columns = document.querySelectorAll('.column')
//         const target = columns[col] as HTMLDivElement
//         startAnimation(target, col)
//         // console.log(col, score)
//     }

//     return { playMove, adjustDifficulty }
// }

// export default useComputerMove
