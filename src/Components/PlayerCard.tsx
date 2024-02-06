import { ComponentPropsWithoutRef } from 'react'
import { TokenColor } from '../Utils/Types'
import Player1 from './SVGComponents/Player1'
import Player2 from './SVGComponents/Player2'

const PlayerCard = ({
    score,
    player,
    ...props
}: {
    score: number
    player: TokenColor
} & ComponentPropsWithoutRef<'div'>) => {
    return (
        <div
            className={`w-35.5 relative flex items-center justify-center rounded-[20px] border-[3px] border-black bg-white py-2.5 shadow-[0_10px_0_0_#000] sm:p-0 lg:-mt-[44px] lg:h-[166px]  lg:flex-col lg:pt-11 ${props.className}`}
        >
            {player === 'red' ? (
                <Player1 className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-1/2 lg:top-0 " />
            ) : (
                <Player2 className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-1/2 lg:top-0 " />
            )}
            <p className=" text-Heading-XS uppercase sm:text-Heading-S">
                {player === 'red' ? 'Player 1' : 'Player 2'}
            </p>
            <p className=" text-Heading-variant sm:text-Heading-L">{score}</p>
        </div>
    )
}

export default PlayerCard
