import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Film = {
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
    getFilms: builder.query<AllFilms, null>({
      query: () => "films",
    }),
    getFilmById: builder.query<Film, { id: string }>({
      query: ({ id }) => `films/${id}`,
    }),
    getFilmsByTitle: builder.query<AllFilms, { title: string }>({
      query: ({ title }) => `films?search=${title}`,
    }),
  }),
});

export const {
  useGetFilmByIdQuery,
  useGetFilmsByTitleQuery,
  useGetFilmsQuery,
} = swapiApi;
