import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  url: string;
};

type AllFilms = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
};

export const swapiApi = createApi({
  reducerPath: "swapiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  endpoints: (builder) => ({
    getFilms: builder.query<Film[], null>({
      query: () => "films",
      transformResponse: (response: AllFilms) => {
        return response.results;
      },
    }),
    getFilmById: builder.query<Film, { id: string }>({
      query: ({ id }) => `films/${id}`,
    }),
    getFilmsByTitle: builder.query<Film[], { title: string }>({
      query: ({ title }) => `films?search=${title}`,
      transformResponse: (response: AllFilms) => {
        return response.results;
      },
    }),
  }),
});

export const {
  useGetFilmByIdQuery,
  useGetFilmsByTitleQuery,
  useGetFilmsQuery,
} = swapiApi;
