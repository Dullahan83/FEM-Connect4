import React from 'react'
import Board from '../Components/Board'
import CustomButton from '../Components/CustomButton'
import Logo from '../Components/Logo'
import PlayerCard from '../Components/PlayerCard'
import useComputerMove from '../Hooks/useComputerMove'
import { useGameContext } from '../Hooks/useContext'
import { cn } from '../Utils/functions'
import Menu from './Menu'

const Game = () => {
    const { resetGame, score, ClearTimer, PauseTimer, winner, currPlayer } =
        useGameContext()
    const { playMove } = useComputerMove()
    const modalRef = React.useRef<HTMLDialogElement>(null)

    const handleOPen = () => {
        modalRef.current?.show()
        PauseTimer()
    }

    const handleClose = () => {
        if (modalRef.current) {
            modalRef.current?.close()
        }
    }

    const handleReset = () => {
        resetGame()
        ClearTimer()
    }

    React.useEffect(() => {
        if (currPlayer === 'yellow') {
            playMove()
        }
    }, [currPlayer])
    return (
        <main
            className={cn(
                "relative flex h-full w-full flex-col items-center bg-purple px-5 py-12.5 before:absolute before:bottom-0 before:h-[236px] before:w-full before:rounded-t-[60px] before:bg-darkPurple before:content-[''] sm:px-0 sm:pt-7.5 sm:before:h-[234px] lg:pt-[49px] lg:before:h-50 ",
                {
                    'before:bg-red': winner === 'red',
                    'before:bg-yellow': winner === 'yellow',
                }
            )}
        >
            <div className="flex w-full max-w-[632px] items-center justify-between">
                <CustomButton onClick={handleOPen} variant="Header">
                    Menu
                </CustomButton>

                <Logo className="-mr-6 aspect-square w-16" />
                <CustomButton variant="Header" onClick={handleReset}>
                    Restart
                </CustomButton>
            </div>
            <section className="mt-[51px] flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-12.5 sm:mt-8 sm:gap-8 lg:mt-[45px] lg:flex-nowrap lg:gap-14">
                {/* Player 1 */}
                <PlayerCard
                    player={'red'}
                    score={score.red}
                    className="order-1 flex-col sm:w-[272px] sm:flex-row sm:justify-between sm:gap-x-5 sm:pl-11 sm:pr-5 lg:order-none lg:w-[141px] lg:justify-normal lg:px-0 "
                />
                {/* Game Board */}
                <Board className="order-3 lg:order-none" />
                {/* Player 2 */}
                <PlayerCard
                    player={'yellow'}
                    score={score.yellow}
                    className="order-2 flex-col sm:w-[272px]  sm:flex-row-reverse sm:justify-between sm:gap-x-5 sm:pl-5 sm:pr-11 lg:order-none lg:w-[141px] lg:justify-normal lg:px-0"
                />
            </section>
            <Menu ref={modalRef} onClose={handleClose} />
        </main>
    )
}

export default Game
