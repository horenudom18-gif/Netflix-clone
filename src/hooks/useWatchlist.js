import { useCallback, useEffect, useState } from 'react'
import { doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

// Stored at: users/{uid}/watchlist/{movie-id or tv-id}
export function useWatchlist() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setItems([])
      setLoading(false)
      return
    }
    const ref = collection(db, 'users', user.uid, 'watchlist')
    const unsub = onSnapshot(ref, (snap) => {
      setItems(snap.docs.map((d) => d.data()))
      setLoading(false)
    })
    return unsub
  }, [user])

  const isSaved = useCallback((id) => items.some((m) => m.id === id), [items])

  const toggleWatchlist = useCallback(
    async (item, mediaType = 'movie') => {
      if (!user) return
      const docId = `${mediaType}-${item.id}`
      const ref = doc(db, 'users', user.uid, 'watchlist', docId)
      if (isSaved(item.id)) {
        await deleteDoc(ref)
      } else {
        await setDoc(ref, {
          id: item.id,
          title: item.title || item.name,
          poster_path: item.poster_path,
          backdrop_path: item.backdrop_path,
          vote_average: item.vote_average ?? null,
          media_type: mediaType,
          addedAt: Date.now(),
        })
      }
    },
    [user, isSaved]
  )

  return { items, loading, isSaved, toggleWatchlist }
}
