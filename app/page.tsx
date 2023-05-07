"use client";

import { Search } from "@/components/Search";
import { useGetFilmsQuery } from "@/src/redux/services/swapiApi";
import { useMemo } from "react";

export default function HomePage() {
  const { data, isLoading, error } = useGetFilmsQuery(null);
  const movieTitleSuggestions = useMemo(() => {
    if (isLoading || !data || error) return [];

    return data?.map((film) => ({
      name: film.title,
      url: `/films/${film.url.split("/")[5]}`,
    }));
  }, [data]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative gap-8">
      <h1 className=" text-starwars font-dela text-3xl md:text-5xl uppercase">
        Star Wars
      </h1>
      <Search suggestions={movieTitleSuggestions} />
    </main>
  );
}
