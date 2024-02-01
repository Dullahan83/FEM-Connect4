const MenuContainer = ({
    children,
    ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<'div'>) => {
    return (
        <div
            className={`py-12.5 shadow-container flex flex-col items-center  rounded-[40px] border-[3px] border-black px-10  sm:w-[480px] ${props.className}`}
        >
            {children}
        </div>
    )
}

export default MenuContainer
