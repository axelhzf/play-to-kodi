import qs from 'qs'

class Api {

  popcornEndpoint = 'https://api-fetch.website';
  // TODO new endpoint? https://tv-v2.api-fetch.website no cors?


  async movies (page = 1, query = {}) {
    const url = `${this.popcornEndpoint}/tv/movies/${page}?${qs.stringify(query)}`;
    const response = await fetch(url);
    return await response.json();
  }

  async movieDetails(imdbId) {
    const url = `${this.popcornEndpoint}/tv/movie/${imdbId}`;
    const response = await fetch(url);
    return await response.json();
  }

  async shows (page = 1, query = {}) {
    const url = `${this.popcornEndpoint}/tv/shows/${page}?${qs.stringify(query)}`;
    const response = await fetch(url);
    return await response.json();
  }

  async showDetails (imdbId) {
    const url = `${this.popcornEndpoint}/tv/show/${imdbId}`;
    const response = await fetch(url);
    return await response.json();
  }

  async playMagnet (magnet) {
    const query = {magnet: encodeURIComponent(magnet)};
    const response = await fetch(`http://localhost:3000/api/play?${qs.stringify(query)}`)
    return await response.json();
  }

}

export default new Api()