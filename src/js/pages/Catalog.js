import { Link} from "react-router-dom";

export default function Catalog() {
    return (
        <nav>
            <ul>
                <li> <Link to="/2048">2048</Link> </li>
                <li> <Link to="/Minesweeper">Minesweeper</Link> </li>
            </ul>
        </nav>
    );
}