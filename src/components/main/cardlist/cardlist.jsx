import { useState, useEffect } from "react"
import filmlist from '../../../assets/filmlist'

function CardList() {

    const initialMovies = filmlist;

    const [movies, setMovies] = useState(initialMovies);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [select, setSelect] = useState("");

    useEffect(() => {
        if (select === "choose" || select === "") {
            setFilteredMovies(movies);
        } else {
            setFilteredMovies(
                movies.filter(movie => movie.genre === select)
            );
        }
    }, [movies, select]);

    return (
        <>
            <form>
                <label htmlFor="movie-select">Scegli un genere: </label>
                <select name="genres" value={select} onChange={(e) => { setSelect(e.target.value) }}>
                    <option value="choose">Scegli un'opzione</option>
                    <option value="Fantascienza">Fantascienza</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Romantico">Romantico</option>
                    <option value="Azione">Azione</option>
                </select>
            </form>

            <ul>
                {filteredMovies.map((movie, index) => (
                    <li
                        key={index}>
                        {movie.title}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default CardList