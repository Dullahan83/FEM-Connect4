import { useNavigate } from 'react-router-dom'
import CustomButton from '../Components/CustomButton'
import Logo from '../Components/Logo'
import VersusPlayer from '../Components/SVGComponents/VersusPlayer'
import MenuContainer from './MenuContainer'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className=" bg-purple sm:bg-darkPurple relative flex h-full w-full flex-col items-center justify-center">
            <MenuContainer className="sm:bg-purple sm:shadow-container sm:pb-15 -mt-13 border-none bg-transparent px-5 py-0 shadow-none sm:-mt-0 sm:border-[3px] sm:border-solid sm:border-black sm:px-10 sm:pt-[70px]">
                <Logo className="mb-19 aspect-square w-16" />
                <CustomButton
                    onClick={() => navigate('/Game')}
                    variant="Menu"
                    className="bg-yellow justify-between"
                >
                    play vs player <VersusPlayer />
                </CustomButton>
                <CustomButton
                    onClick={() => navigate('/Rules')}
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
