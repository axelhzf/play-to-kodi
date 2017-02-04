import * as axios from 'axios';

const POPCORN_ENDPOINT = 'https://api-fetch.website';

class Api {

  // TODO new endpoint? https://tv-v2.api-fetch.website no cors?

  async movies (query: MoviesQuery = {}): Promise<Movie[]> {
    const { page = 1, ...params } = query;
    const url = `${POPCORN_ENDPOINT}/tv/movies/${page}`;
    const response = await axios.get<Movie[]>(url, { params });
    return response.data;
  }

  async movieDetails(imdbId: string) {
    const url = `${POPCORN_ENDPOINT}/tv/movie/${imdbId}`;
    const response = await axios.get(url);
    return response.data;
  }

  async shows (page = 1, query = {}) {
    const url = `${POPCORN_ENDPOINT}/tv/shows/${page}`;
    const response = await axios.get(url);
    return response.data;
  }

  async showDetails (imdbId: string) {
    const url = `${POPCORN_ENDPOINT}/tv/show/${imdbId}`;
    const response = await axios.get(url);
    return await response.data;
  }

  async playMagnet (magnet: string) {
    const params = {magnet: encodeURIComponent(magnet)};
    const response = await axios.get("/api/play", { params });
    return response.data;
  }

}

export default new Api()