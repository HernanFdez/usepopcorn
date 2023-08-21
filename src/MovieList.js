import MovieItem from "./MovieItem"

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map(movie => (
        <MovieItem movie={movie} key={movie.imdbID} onSelect={onSelectMovie} />
      ))}
    </ul>
  )
}
