import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from './Game'
import Home from './Home'
import Rules from './Rules'
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Game" element={<Game />} />
                <Route path="/Rules" element={<Rules />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
