import { useGameContext } from '../Hooks/useContext'
import { cn } from '../Utils/functions'

const ColumnIndicator = () => {
    const { currPlayer, winner, isGameOver } = useGameContext()
    return (
        <>
            {currPlayer === 'red' ? (
                <img
                    src="/FEM-Connect4/assets/images/marker-red.svg"
                    alt="red player indicator"
                    className={cn(
                        'mb absolute bottom-full left-1/2 z-30 hidden w-fit -translate-x-1/2 lg:mb-6 lg:group-hover/column:flex',
                        {
                            'group-hover/column:hidden': winner || isGameOver,
                        }
                    )}
                />
            ) : (
                <img
                    src="/FEM-Connect4/assets/images/marker-yellow.svg"
                    alt="yellow player indicator"
                    className={cn(
                        'mb absolute bottom-full left-1/2 z-30 hidden w-fit -translate-x-1/2 lg:mb-6 lg:group-hover/column:flex',
                        {
                            'group-hover/column:hidden': winner || isGameOver,
                        }
                    )}
                />
            )}
        </>
    )
}

export default ColumnIndicator
