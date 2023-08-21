import WatchedItem from "./WatchItem"

export default function WatchedList({ watched, onRemoveWatched }) {
  function createHandleRemove(id) {
    return () => onRemoveWatched(id)
  }
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedItem movie={movie} key={movie.imdbID} onRemove={createHandleRemove(movie.imdbID)} />
      ))}
    </ul>
  )
}
