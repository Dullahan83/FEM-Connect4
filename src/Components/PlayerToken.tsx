import { useGameContext } from '../Hooks/useContext'
import { TokenColor } from '../Utils/Types'

type PlayerTokenProps = {
    tokenColor: TokenColor
    tokenIndex: number
    colIndex: number
}

const Checktoken = () => {
    return (
        <span className='absolute h-full w-full before:absolute before:left-1/2 before:top-1/2 before:aspect-square before:w-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border-[6px] before:border-white before:content-[""] sm:-mt-1 sm:before:border-8 '></span>
    )
}

const PlayerToken = ({
    tokenColor,
    tokenIndex,
    colIndex,
}: PlayerTokenProps) => {
    const pos = [colIndex, tokenIndex]
    const { winningPositions } = useGameContext()
    const arrayContainsArray = (
        winningPositions: number[][],
        pos: number[]
    ) => {
        return winningPositions.some(
            (subArray) =>
                Array.isArray(subArray) &&
                subArray.length === pos.length &&
                subArray.every((element, index) => element === pos[index])
        )
    }
    const isWinningToken = arrayContainsArray(winningPositions, pos)
    return tokenColor === 'red' ? (
        <>
            <div className='relative aspect-square w-full  rounded-full bg-[url("./assets/images/counter-red-small.svg")] sm:bg-[url("./assets/images/counter-red-large.svg")]'>
                {isWinningToken ? <Checktoken /> : null}
            </div>
        </>
    ) : (
        <>
            <div className='relative aspect-square  w-full rounded-full bg-[url("./assets/images/counter-yellow-small.svg")] sm:bg-[url("./assets/images/counter-yellow-large.svg")]'>
                {isWinningToken ? <Checktoken /> : null}
            </div>
        </>
    )
}

export default PlayerToken
