import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import Main from "./Main"
import SearchResults from "./SearchResults"
import SearchBar from "./SearchBar"
import MovieList from "./MovieList"
import Box from "./Box"
import WatchedSummary from "./WatchedSummary"
import WatchedList from "./WatchedList"
import Loader from "./Loader"
import ErrorMessage from "./ErrorMessage"
import MovieDetails from "./MovieDetails"
import { useMovies } from "./useMovies"
import { useLocalStorageState } from "./useLocalStorageState"

const KEY = "adc9b8c5"

export default function App() {
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  const { movies, isLoading, error } = useMovies(query)

  const [watched, setWatched] = useLocalStorageState([], "watched")

  const selectedRating = watched.find(movie => movie.imdbID === selectedId)?.userRating

  function handleSelectMovie(id) {
    setSelectedId(curr => (curr === id ? null : id))
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    localStorage.setItem("watched", JSON.stringify([...watched, movie]))

    setWatched(watched => [...watched, movie])
  }

  function handleRemoveWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <SearchResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && !error && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails KEY={KEY} selectedId={selectedId} currentRating={selectedRating} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onRemoveWatched={handleRemoveWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}
