import './App.css'
import GameProvider from './Components/Context/GameContext'
import Router from './Layout/Router'

function App() {
    return (
        <>
            <GameProvider>
                <Router />
            </GameProvider>
        </>
    )
}

export default App
