import { useEffect, useState } from "react"

const KEY = "adc9b8c5"

export function useMovies(query) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(
    function () {
      // callback?.()
      const controller = new AbortController()
      async function fetchMovies() {
        try {
          setIsLoading(true)
          setError("")
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal })
          if (!res.ok) throw new Error("error fetching the movies")
          const data = await res.json()
          if (data.Response === "False") throw new Error("Movie not found")
          setMovies(data.Search)
          setError("")
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message)
        } finally {
          setIsLoading(false)
        }
      }
      if (query.length < 3) {
        setMovies([])
        setError("")
        return
      }

      fetchMovies()

      return () => controller.abort()
    },
    [query]
  )

  return { movies, isLoading, error }
}
