import React from 'react'
import { useGameContext } from '../Hooks/useContext'
import { cn } from '../Utils/functions'

const TurnSlate = () => {
    const {
        currPlayer,
        onTimeUp,
        StartTimer,
        ClearTimer,
        timer,
        activateTimer,
    } = useGameContext()

    React.useEffect(() => {
        activateTimer && StartTimer()

        return () => ClearTimer()
    }, [currPlayer])

    React.useEffect(() => {
        console.log(timer)
        if (timer === 0) {
            onTimeUp()
        }
    }, [timer])
    return (
        <div
            className={cn(
                'absolute bottom-0  left-1/2 z-20 flex h-[170px] w-[197px] -translate-x-1/2 translate-y-[145px] flex-col items-center  justify-center bg-[url("/assets/images/turn-background-yellow.svg")] bg-no-repeat sm:translate-y-[120px] ',
                {
                    "bg-[url('/assets/images/turn-background-red.svg')] text-white":
                        currPlayer === 'red',
                }
            )}
        >
            <p className="text-Heading-XS mb-0.5 uppercase">{`player ${currPlayer === 'red' ? 1 : 2}'s turn`}</p>
            <p className="text-Heading-L">{`${timer}s`}</p>
        </div>
    )
}

export default TurnSlate
