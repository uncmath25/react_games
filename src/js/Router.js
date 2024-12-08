import { BrowserRouter, Route, Routes } from "react-router-dom";

import Catalog from './pages/Catalog';
import NoPage from './pages/NoPage';
import App2048 from './games/2048/App';
import Minesweeper from './games/minesweeper/App';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="2048" element={<App2048 />} />
                <Route path="Minesweeper" element={<Minesweeper />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}
