import useSWR from 'swr'
import SpotifySVG from './social-icons/spotify.svg'

export const Spotify = () => {
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const { data } = useSWR('/api/spotify', fetcher)

  return (
    <a
      target="_blank"
      rel="noopener noreferer noreferrer"
      href={data?.isPlaying && data.songURL}
      className="w-85 relative flex items-center space-x-4 overflow-hidden rounded-md border border-gray-500 p-5 transition-shadow hover:shadow-md dark:border-gray-400"
    >
      <div className="w-16">
        {data?.isPlaying ? (
          <img className="w-16 shadow-sm" src={data?.album.image} alt={data?.album.name} />
        ) : (
          <SpotifySVG fill="currentColor" />
        )}
      </div>

      <div className="flex-1">
        <p className="component font-bold">{data?.isPlaying ? data.title : 'Not Listening'}</p>
        <p className="font-dark text-xs">
          {data?.isPlaying ? data.artists.map((artist) => artist.name).join(', ') : 'Spotify'}
        </p>
      </div>
      <div className="absolute bottom-2.5 right-2">
        <SpotifySVG fill="currentColor" width={20} height={20} />
      </div>
    </a>
  )
}

export const SpotifySmall = () => {
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const { data } = useSWR('/api/spotify', fetcher)

  return (
    <a target="_blank" rel="noopener noreferer noreferrer" href={data?.isPlaying && data?.songURL}>
      <div className="mb-3 flex text-sm tracking-wide text-gray-500 dark:text-gray-400">
        <SpotifySVG fill="currentColor" height={20} width={20} />
        <p className="ml-3 mr-1 font-bold tracking-wider underline">
          {data?.isPlaying ? 'Now Playing:' : 'Not Listening'}
        </p>
        <p className="mr-1">{data?.isPlaying && data?.title}</p>
        <p>{data?.isPlaying && '-'}</p>
        <p className="ml-1 italic">
          {data?.isPlaying && data?.artists.map((artist) => artist.name).join(', ')}
        </p>
      </div>
    </a>
  )
}
