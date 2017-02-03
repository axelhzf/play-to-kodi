import * as axios from 'axios';

class Api {

  popcornEndpoint = 'https://api-fetch.website';
  // TODO new endpoint? https://tv-v2.api-fetch.website no cors?


  async movies (page = 1, query: MoviesQuery = {}): Promise<Movie[]> {
    const url = `${this.popcornEndpoint}/tv/movies/${page}`;
    const response = await axios.get<Movie[]>(url, { params: query });
    return response.data;
  }

  async movieDetails(imdbId: string) {
    const url = `${this.popcornEndpoint}/tv/movie/${imdbId}`;
    const response = await axios.get(url);
    return response.data;
  }

  async shows (page = 1, query = {}) {
    const url = `${this.popcornEndpoint}/tv/shows/${page}`;
    const response = await axios.get(url);
    return response.data;
  }

  async showDetails (imdbId: string) {
    const url = `${this.popcornEndpoint}/tv/show/${imdbId}`;
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