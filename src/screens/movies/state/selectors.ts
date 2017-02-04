import {fetchSelector} from "../../../state/selectors";

export const getMovies = fetchSelector(['movies', 'movies'], 'movie');