import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Catalog from './pages/Catalog';
import NoPage from './pages/NoPage';
import App2048 from './games/2048/App';

export default function App() {
    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Catalog />} />
                    <Route path="2048" element={<App2048 />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
