import { useNavigate } from 'react-router-dom'
import CustomButton from '../Components/CustomButton'
import MenuContainer from './MenuContainer'

const Difficulty = () => {
    const navigate = useNavigate()

    return (
        <div className=" relative flex h-full w-full flex-col items-center justify-center bg-purple sm:bg-darkPurple">
            <MenuContainer className="-mt-13 w-full border-none bg-transparent px-5 py-0 shadow-none sm:-mt-0 sm:border-[3px] sm:border-solid sm:border-black sm:bg-purple sm:px-10 sm:pb-15 sm:pt-[70px] sm:shadow-container">
                <CustomButton
                    onClick={() =>
                        navigate('/FEM-Connect4/Game?cpu=true&difficulty=EASY')
                    }
                    variant="Menu"
                    className="justify-between bg-green-500"
                >
                    normal
                </CustomButton>
                <CustomButton
                    onClick={() =>
                        navigate(
                            '/FEM-Connect4/Game?cpu=true&difficulty=MEDIUM'
                        )
                    }
                    variant="Menu"
                    className="mt-6 justify-between bg-yellow"
                >
                    medium
                </CustomButton>
                <CustomButton
                    onClick={() =>
                        navigate('/FEM-Connect4/Game?cpu=true&difficulty=HARD')
                    }
                    variant="Menu"
                    className="mt-6 bg-red"
                >
                    hard
                </CustomButton>
                <CustomButton
                    onClick={() =>
                        navigate(
                            '/FEM-Connect4/Game?cpu=true&difficulty=EXTREME'
                        )
                    }
                    variant="Menu"
                    className="mt-6 bg-slate-800 text-white"
                >
                    extreme
                </CustomButton>
            </MenuContainer>
        </div>
    )
}

export default Difficulty
