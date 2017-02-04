import { normalize, schema } from 'normalizr';
export const movieDetails = new schema.Entity('movieDetails', {}, { idAttribute: 'imdb_id' });