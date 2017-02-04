interface Movie {
  _id: string,
  certification: string,
  genres: string[],
  images: {
    banner: string,
    fanart: string,
    poster: string
  },
  imdb_id: string,
  rating: {
    percentage: number,
    watching: number,
    votes: number,
    loved: number,
    hated: number,
  },
  released: number,
  runtime: string,
  synopsis: string,
  title: string,
  torrents: {
    [key: string]: {
      "780p"?: Torrent,
      "1080p"?: Torrent
    }
  },
  trailer: string,
  year: string
}