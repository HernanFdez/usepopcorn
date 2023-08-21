import { useEffect, useRef } from "react"
import { useKey } from "./useKey"

export default function SearchBar({ query, setQuery }) {
  const inputElement = useRef(null)

  function handleFocus() {
    if (document.activeElement !== inputElement.current) {
      inputElement.current.focus()
      setQuery("")
    }
  }

  useEffect(function () {
    inputElement.current.focus()
  }, [])

  useKey("Enter", handleFocus)

  return <input className="search" type="text" placeholder="Search movies..." value={query} onChange={e => setQuery(e.target.value)} ref={inputElement} />
}
