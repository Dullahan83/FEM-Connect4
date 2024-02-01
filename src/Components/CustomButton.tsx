import React, { ComponentPropsWithoutRef } from 'react'
import Check from './SVGComponents/Check'

type CustomButtonProps = {
    variant?: 'Menu' | 'Header' | 'NewGame' | 'Validate'
    children?: React.ReactNode
} & ComponentPropsWithoutRef<'button'>

const CustomButton = ({ variant, children, ...props }: CustomButtonProps) => {
    switch (variant) {
        case 'Menu':
            return (
                <button
                    {...props}
                    className={`${props.className} shadow-container h-18 hover:shadow-darkPurple hover:border-darkPurple flex w-full items-center rounded-2.5xl border-[3px] border-black px-5 text-Heading-M uppercase`}
                >
                    {children}
                </button>
            )
        case 'Header':
            return (
                <button
                    {...props}
                    className={`bg-darkPurple hover:bg-red flex h-[39px] items-center rounded-full px-[20.5px] uppercase leading-none text-white`}
                >
                    {children}
                </button>
            )
        case 'NewGame':
            return (
                <button
                    {...props}
                    className={`text-Heading-XS bg-purple h-[39px] w-[130px] rounded-full uppercase text-white `}
                >
                    play again
                </button>
            )
        case 'Validate':
            return (
                <button
                    {...props}
                    className={`${props.className} bg-red hover:shadow-darkPurple hover:border-darkPurple absolute top-full flex aspect-square w-16 -translate-y-1/2 items-center rounded-full border-[3px] border-black shadow-[0_5px_0_0_#000]`}
                >
                    <Check />
                </button>
            )
        default:
            return <button {...props}>{children}</button>
    }
}

export default CustomButton
