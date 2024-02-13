import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Difficulty from './Difficulty'
import Game from './Game'
import Home from './Home'
import Rules from './Rules'
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/FEM-Connect4/" element={<Home />} />
                <Route
                    path="/FEM-Connect4/Difficulty"
                    element={<Difficulty />}
                />

                <Route path="/FEM-Connect4/Game" element={<Game />} />
                <Route path="/FEM-Connect4/Rules" element={<Rules />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
