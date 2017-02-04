interface MoviesQuery {
  page: number,
  sort?: 'trending' | '',
  order?: 1 | -1,
  genre?: string,
  keywords?: string
}