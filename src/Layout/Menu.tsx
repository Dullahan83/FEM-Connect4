import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../Components/CustomButton'
import { useGameContext } from '../Hooks/useContext'

interface MenuProps extends React.ComponentPropsWithoutRef<'dialog'> {
    onClose: () => void
}

const Menu = React.forwardRef<HTMLDialogElement, MenuProps>(
    ({ onClose }, ref) => {
        const MenuBody = React.useRef<HTMLDivElement>(null)
        const { timer, StartTimer, ClearTimer, resetGame } = useGameContext()
        const navigate = useNavigate()
        const handleClick = (
            e: React.MouseEvent<HTMLDialogElement, MouseEvent>
        ) => {
            const target = e.target as Node
            if (MenuBody.current && !MenuBody.current.contains(target)) {
                StartTimer(timer)
                onClose()
            }
        }
        const handleResume = () => {
            StartTimer(timer)
            onClose()
        }
        const handleRestart = () => {
            resetGame()
            ClearTimer()
            onClose()
        }
        const handleQuit = () => {
            navigate('/')
            onClose()
        }

        return (
            <dialog
                ref={ref}
                onClick={handleClick}
                className="fixed  top-0 z-50 hidden h-full w-full items-center justify-center bg-black/50 open:flex"
            >
                <div
                    ref={MenuBody}
                    className="py-7.5 sm:py-12.5 shadow-container gap-7.5 bg-purple flex h-fit flex-col items-center rounded-[40px] border-[3px] border-black px-5 sm:-mt-8 sm:w-[480px] sm:px-10 lg:-mt-24"
                >
                    <h1 className=" text-Heading-L uppercase text-white sm:mb-2">
                        pause
                    </h1>
                    <CustomButton
                        onClick={handleResume}
                        variant="Menu"
                        className="bg-white"
                    >
                        continue game
                    </CustomButton>
                    <CustomButton
                        onClick={handleRestart}
                        variant="Menu"
                        className="bg-white"
                    >
                        restart
                    </CustomButton>
                    <CustomButton
                        onClick={handleQuit}
                        variant="Menu"
                        className="bg-red text-white"
                    >
                        quit game
                    </CustomButton>
                </div>
            </dialog>
        )
    }
)
Menu.displayName = 'Menu'
export default Menu
