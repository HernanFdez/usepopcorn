import { useEffect, useState } from "react"

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storeValue = localStorage.getItem(key)
    return storeValue ? JSON.parse(storeValue) : initialState
  })

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value))
    },
    [value, key]
  )

  return [value, setValue]
}
