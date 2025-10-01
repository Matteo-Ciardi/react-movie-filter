import { useState, useEffect } from "react"
import filmlist from '../../../assets/filmlist'

function CardList() {

    const initialMovies = filmlist;

    const [movies, setMovies] = useState(initialMovies);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const [select, setSelect] = useState("");
    const [search, setSearch] = useState("");

    const [newTitle, setNewTitle] = useState('');
    const [newGenre, setNewGenre] = useState('');

    const addMovie = e => {
        e.preventDefault();

        if (!newTitle.trim() || !newGenre.trim()) return;

        const updatedMovies = [...movies,
        { title: newTitle, genre: newGenre }
        ];
        setMovies(updatedMovies);
        setNewTitle('');
        setNewGenre('');
    }

    useEffect(() => {
        if (select === "choose" || select === "") {
            setFilteredMovies(movies);
        } else {
            setFilteredMovies(
                movies.filter(movie => movie.genre === select)
            );
        }
    }, [movies, select]);

    useEffect(() => {
        setFilteredMovies(
            movies.filter(movie => {
                return movie.title.toLowerCase().includes(search.toLowerCase().trim())
            })
        );
    }, [search, movies]);

    return (
        <>
            <form>
                <label htmlFor="movie-select">Scegli un genere: </label>
                <select name="genres"
                    value={select}
                    onChange={(e) => { setSelect(e.target.value) }}>
                    <option value="choose">Scegli un'opzione</option>
                    <option value="Fantascienza">Fantascienza</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Romantico">Romantico</option>
                    <option value="Azione">Azione</option>
                </select>
                <input type="text"
                    value={search}
                    placeholder="Cerca il titolo"
                    onChange={(e) => { setSearch(e.target.value) }} />
            </form>

            <form onSubmit={addMovie}>
                <input type="text"
                    value={newTitle}
                    placeholder="Inserisci il nuovo titolo"
                    onChange={(e) => { setNewTitle(e.target.value) }} />

                <input type="text"
                    value={newGenre}
                    placeholder="Inserisci il nuovo genere"
                    onChange={(e) => { setNewGenre(e.target.value) }} />

                <button type="submit">AGGIUNGI</button>
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