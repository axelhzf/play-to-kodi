import qs from 'qs'

class Api {

  popcornEndpoint = 'https://api-fetch.website';
  // TODO new endpoint? https://tv-v2.api-fetch.website no cors?


  async movies (query = {}) {
    const url = `${this.popcornEndpoint}/tv/movies/1?${qs.stringify(query)}`;
    const response = await fetch(url);
    return await response.json();
  }

  async movieDetails(imdbId) {
    const url = `${this.popcornEndpoint}/tv/movie/${imdbId}`;
    const response = await fetch(url);
    return await response.json();
  }

  async shows (query = {}) {
    const url = `${this.popcornEndpoint}/tv/shows/1?${qs.stringify(query)}`;
    const response = await fetch(url);
    return await response.json();
  }

  async showDetails (imdbId) {
    const url = `${this.popcornEndpoint}/tv/show/${imdbId}`;
    const response = await fetch(url);
    return await response.json();
  }

  async playMagnet (magnet) {
    console.log("playing", magnet)
    return;

    const encodedMagnet = encodeURIComponent(magnet);
    const body = {
      jsonrpc: '2.0',
      method: 'Player.Open',
      id: 1,
      params: {
        item: {
          file: `plugin://plugin.video.xbmctorrent/play/${encodedMagnet}`
        }
      }
    };

    // todo configure url
    const response = await fetch('http://192.168.1.39/jsonrpc',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

    return await response.json();
  }

}

export default new Api()