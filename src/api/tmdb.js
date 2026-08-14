const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTQyYzBiM2JmOTJmNDcyMzE2NWNiYTNkMDYyMDBkOCIsIm5iZiI6MTc4NjM3MTI0OC45NDUsInN1YiI6IjZhNzlkY2IwNThkYjZjNTI3NzQ5ZDUzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ul71UjI4wW1muUewu8ciWMKQwGt8RiUh57dqCtJON4s'

const options = {
  method: 'GET',
  headers: { accept: 'application/json', Authorization: `Bearer ${BEARER_TOKEN}` },
}

const BASE_URL = 'https://api.themoviedb.org/3'
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500'
export const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original'

async function tmdbFetch(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url, options)
  if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`)
  return res.json()
}

export const getPopularMovies = (page = 1) => tmdbFetch('/movie/popular', { page })
export const getTopRatedMovies = (page = 1) => tmdbFetch('/movie/top_rated', { page })
export const getUpcomingMovies = (page = 1) => tmdbFetch('/movie/upcoming', { page })
export const getNowPlayingMovies = (page = 1) => tmdbFetch('/movie/now_playing', { page })
export const getTrendingMovies = () => tmdbFetch('/trending/movie/week')

export const getTrendingTV = () => tmdbFetch('/trending/tv/week')
export const getPopularTV = (page = 1) => tmdbFetch('/tv/popular', { page })
export const getTopRatedTV = (page = 1) => tmdbFetch('/tv/top_rated', { page })
export const getOnTheAirTV = (page = 1) => tmdbFetch('/tv/on_the_air', { page })

export const getMovieGenres = () => tmdbFetch('/genre/movie/list')
export const discoverMoviesByGenre = (genreId, page = 1) =>
  tmdbFetch('/discover/movie', { with_genres: genreId, page, sort_by: 'popularity.desc' })

export const discoverMoviesByLanguage = (languageCode, page = 1) =>
  tmdbFetch('/discover/movie', { with_original_language: languageCode, page, sort_by: 'popularity.desc' })

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ko', label: 'Korean' },
  { code: 'ja', label: 'Japanese' },
  { code: 'hi', label: 'Hindi' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'zh', label: 'Chinese' },
  { code: 'th', label: 'Thai' },
  { code: 'km', label: 'Khmer' },
  { code: 'de', label: 'German' },
]
