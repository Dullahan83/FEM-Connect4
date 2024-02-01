import { useNavigate } from 'react-router-dom'
import CustomButton from '../Components/CustomButton'
import MenuContainer from './MenuContainer'

const Rules = () => {
    const rules = [
        'Red goes first in the first game.',
        'Players must alternate turns, and only one disc can be dropped in each turn. ',
        'The game ends when there is a 4-in-a-row or a stalemate.',
        'The starter of the previous game goes second on the next game.',
    ]
    const navigate = useNavigate()
    return (
        <div className="bg-purple relative flex h-full w-full flex-col items-center justify-center">
            <MenuContainer className="sm:px-8.5 py-7.5 relative w-[335px]  bg-white px-5 pb-16 sm:pb-14">
                <h1 className="mb-[29px] text-Heading-L uppercase">rules</h1>
                <div className="space-y-4">
                    <h2 className=" text-purple text-Heading-S uppercase">
                        objective
                    </h2>
                    <p className=" text-regular text-black/65">
                        Be the first player to connect 4 of the same colored
                        discs in a row (either vertically, horizontally, or
                        diagonally).
                    </p>
                </div>
                <div className="mt-8 space-y-4">
                    <h2 className=" text-purple text-Heading-S uppercase">
                        how to play
                    </h2>
                    <ul className="flex w-full flex-col gap-3">
                        {rules.map((rule, index) => {
                            return (
                                <li className="flex gap-x-[14px]" key={index}>
                                    <p className=" text-Heading-XS">
                                        {index + 1}
                                    </p>
                                    <p className="text-regular text-black/65">
                                        {rule}
                                    </p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <CustomButton
                    onClick={() => navigate('/')}
                    variant="Validate"
                />
            </MenuContainer>
        </div>
    )
}

export default Rules
