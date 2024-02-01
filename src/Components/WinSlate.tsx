import { useGameContext } from '../Hooks/useContext'
import CustomButton from './CustomButton'

const WinSlate = () => {
    const { startNewRound, winner, isGameOver } = useGameContext()
    return (
        <div className="absolute bottom-0 left-1/2 z-20 flex h-40 w-[285px] -translate-x-1/2 translate-y-[135px] flex-col items-center justify-center rounded-[20px] border-[3px] border-black bg-white shadow-[_0_10px_0_0_#000] sm:translate-y-[110px] sm:py-0">
            {isGameOver ? (
                <p className="text-Heading-L uppercase">Draw</p>
            ) : (
                <>
                    <p className="text-Heading-XS">
                        {winner === 'red' ? 'Player 1' : 'Player 2'}
                    </p>
                    <p className="text-Heading-L uppercase">wins</p>
                </>
            )}

            <CustomButton onClick={() => startNewRound()} variant="NewGame" />
        </div>
    )
}

export default WinSlate
