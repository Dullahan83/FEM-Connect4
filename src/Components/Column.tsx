import { ComponentPropsWithoutRef } from 'react'
import { TokenColor } from '../Utils/Types'
import ColumnIndicator from './ColumnIndicator'
import PlayerToken from './PlayerToken'

type ColumnProps = {
    colData: TokenColor[]
    index: number
} & ComponentPropsWithoutRef<'div'>

const Column = ({ colData, index, ...props }: ColumnProps) => {
    return (
        <>
            <div
                {...props}
                className="group/column relative z-10 flex h-full w-10 flex-col-reverse gap-[7px] bg-red-300 pb-[11px] hover:cursor-pointer sm:w-[70px] sm:gap-[18px]"
            >
                {colData?.map((token, i) => {
                    return (
                        <PlayerToken
                            colIndex={index}
                            tokenIndex={i}
                            tokenColor={token}
                            key={i}
                        />
                    )
                })}
                <ColumnIndicator />
            </div>
        </>
    )
}

export default Column
