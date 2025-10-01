import { useState, useEffect } from "react"
import filmlist from '../../../assets/filmlist'
import './cardlist.css'

function CardList() {

    const initialMovies = filmlist;

    const [movies, setMovies] = useState(initialMovies);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const [select, setSelect] = useState("");
    const [search, setSearch] = useState("");

    const [newTitle, setNewTitle] = useState('');
    const [newGenre, setNewGenre] = useState('');

    const [genres, setGenres] = useState([]);

    const addMovie = e => {
        e.preventDefault();

        if (!newTitle.trim() || !newGenre.trim())
            return;

        const updatedMovies = [...movies,
        { title: newTitle, genre: newGenre }
        ];
        setMovies(updatedMovies);
        setNewTitle('');
        setNewGenre('');
    }

    useEffect(() => {
        const uniqueGenres = [];
        movies.forEach(movie => {
            if (!uniqueGenres.includes(movie.genre)) {
                uniqueGenres.push(movie.genre);
            }
        });
        setGenres(uniqueGenres);
    }, [movies]);

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
            <div className="main-container">

                <div className="main-card">

                    <form onSubmit={addMovie} className="add-form">
                        <label htmlFor="movie-add" className="label">Aggiungi un film: </label>
                        <input className="input title"
                            type="text"
                            value={newTitle}
                            placeholder="Titolo"
                            onChange={(e) => { setNewTitle(e.target.value) }} />

                        <input className="input genre"
                            type="text"
                            value={newGenre}
                            placeholder="Genere"
                            onChange={(e) => { setNewGenre(e.target.value) }} />

                        <button type="submit" className="add-btn">AGGIUNGI</button>
                    </form>

                    <form className="filter-search">
                        <div className="search">
                            <label htmlFor="search-movie" className="label">Cerca un film: </label>
                            <input className="input"
                                type="text"
                                value={search}
                                placeholder="Cerca"
                                onChange={(e) => { setSearch(e.target.value) }} />
                        </div>

                        <div className="filter">
                            <label htmlFor="movie-select" className="label">Scegli un genere: </label>
                            <select className="genre-select"
                                name="genres"
                                value={select}
                                onChange={(e) => { setSelect(e.target.value) }}>

                                <option value="choose">Scegli un'opzione</option>
                                {genres.map((genre, index) => (
                                    <option key={index} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>
                    </form>

                    <ul>
                        {filteredMovies.map((movie, index) => (
                            <li
                                key={index}>
                                {movie.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CardList