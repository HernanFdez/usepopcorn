import { useEffect, useRef, useState } from "react"
import StarRating from "./StarRating"
import Loader from "./Loader"
import { useKey } from "./useKey"

export default function MovieDetails({ KEY, selectedId, currentRating, onCloseMovie, onAddWatched }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState(currentRating || 0)

  const countRef = useRef(0)

  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true)
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
        const data = await res.json()
        setMovie(data)
        setIsLoading(false)
      }

      getMovieDetails()
    },
    [selectedId, KEY]
  )

  useEffect(
    function () {
      if (title) document.title = `MOVIE | ${title}`

      return () => (document.title = "usePopcorn")
    },
    [title]
  )

  useKey("Escape", onCloseMovie)

  useEffect(
    function () {
      console.log(countRef)
      if (userRating) countRef.current++
    },
    [userRating]
  )

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating,
      coutRatingChanges: countRef.current
    }

    onAddWatched(newWatchedMovie)
    onCloseMovie()
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of the movie ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {currentRating ? (
                <p>
                  you rated this movie <strong>{currentRating}🌟</strong>
                </p>
              ) : (
                <>
                  <StarRating maxRating={10} size={24} onSetRating={setUserRating} defaultRating={userRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to List
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  )
}
