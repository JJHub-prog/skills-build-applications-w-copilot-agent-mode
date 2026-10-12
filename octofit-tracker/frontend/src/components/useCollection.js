import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function useCollection(endpoint) {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setIsLoading(true)
      setError('')

      try {
        setItems(await fetchCollection(endpoint, controller.signal))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    loadItems()
    return () => controller.abort()
  }, [endpoint])

  return { items, isLoading, error }
}
