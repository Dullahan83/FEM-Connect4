import { useNavigate } from 'react-router-dom'
import CustomButton from '../Components/CustomButton'
import Logo from '../Components/Logo'
import VersusComputer from '../Components/SVGComponents/VersusComputer'
import VersusPlayer from '../Components/SVGComponents/VersusPlayer'
import MenuContainer from './MenuContainer'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className=" relative flex h-full w-full flex-col items-center justify-center bg-purple sm:bg-darkPurple">
            <MenuContainer className="-mt-13 w-full border-none bg-transparent px-5 py-0 shadow-none sm:-mt-0 sm:border-[3px] sm:border-solid sm:border-black sm:bg-purple sm:px-10 sm:pb-15 sm:pt-[70px] sm:shadow-container">
                <Logo className="mb-19 aspect-square w-16" />
                <CustomButton
                    onClick={() => navigate('/FEM-Connect4/Difficulty')}
                    variant="Menu"
                    className="justify-between bg-red"
                >
                    play vs cpu <VersusComputer />
                </CustomButton>
                <CustomButton
                    onClick={() => navigate('/FEM-Connect4/Game')}
                    variant="Menu"
                    className="mt-6 justify-between bg-yellow"
                >
                    play vs player <VersusPlayer />
                </CustomButton>
                <CustomButton
                    onClick={() => navigate('/FEM-Connect4/Rules')}
                    variant="Menu"
                    className="mt-6 bg-white"
                >
                    Game Rules
                </CustomButton>
            </MenuContainer>
        </div>
    )
}

export default Home
