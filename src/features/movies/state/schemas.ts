import { normalize, schema } from 'normalizr';

export const movie = new schema.Entity('movie', {}, { idAttribute: 'imdb_id' });
export const movies = new schema.Array(movie);
