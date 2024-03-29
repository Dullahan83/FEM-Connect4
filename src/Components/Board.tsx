import { ComponentPropsWithoutRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useGameContext } from '../Hooks/useContext'
import useTokenAnimation from '../Hooks/useTokenAnimation'
import Column from './Column'
import TurnSlate from './TurnSlate'
import WinSlate from './WinSlate'

const Board = ({ ...props }: ComponentPropsWithoutRef<'div'>) => {
    const { board, winner, isGameOver, currPlayer } = useGameContext()
    const { startAnimation } = useTokenAnimation()
    const location = useLocation()
    const cpu = new URLSearchParams(location.search).get('cpu')
    const handlePlay = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ) => {
        if (cpu && currPlayer === 'yellow') return
        startAnimation(e.currentTarget, index)
    }

    return (
        <div
            className={`relative z-0 flex h-[320px] w-[335px] justify-between bg-[url('/FEM-Connect4/assets/images/board-layer-black-small.svg')] bg-no-repeat p-[7px] pb-[26px] pr-2 before:pointer-events-none before:absolute before:left-0  before:top-0 before:z-20  before:h-full before:w-full before:bg-[url('/FEM-Connect4/assets/images/board-layer-white-small.svg')] before:bg-no-repeat before:content-[''] sm:h-[594px]  sm:w-[632px] sm:bg-[url('/FEM-Connect4/assets/images/board-layer-black-large.svg')] sm:p-[17px] sm:pb-12 before:sm:bg-[url('/FEM-Connect4/assets/images/board-layer-white-large.svg')] ${props.className}`}
        >
            {board?.map((col, index) => {
                return (
                    <Column
                        onClick={(e) => handlePlay(e, index)}
                        colData={col}
                        key={index}
                        index={index}
                    />
                )
            })}
            {winner || isGameOver ? <WinSlate /> : <TurnSlate />}
        </div>
    )
}

export default Board
