"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useSearchParams } from "next/navigation";
import { useGetFilmsByTitleQuery } from "@/src/redux/services/swapiApi";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const { data, isLoading, error } = useGetFilmsByTitleQuery({ title: q });

  if (error) {
    return null;
  }

  const renderSkeleton = () => (
    <li className="p-6" data-testid="loading-skeleton">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </li>
  );

  const renderNoResults = () => (
    <li className="p-6">
      <p className="text-xl text-starwars">No results found.</p>
    </li>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Showing Results for {q || "all"}
        </h1>
        <div className="bg-black shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {isLoading && (
              <>
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <Fragment key={index}>{renderSkeleton()}</Fragment>
                  ))}
              </>
            )}
            {!!data?.length &&
              data.map((film) => (
                <li key={film.episode_id} className="p-6">
                  <Link
                    href={`/films/${film.url.split("/")[5]}`}
                    className="text-2xl font-semibold text-starwars hover:text-starwarsBlue"
                  >
                    {film.title}
                  </Link>
                  <p className="text-white mt-2">{film.release_date}</p>
                </li>
              ))}
            {!isLoading && !data?.length && renderNoResults()}
          </ul>
        </div>
      </div>
    </div>
  );
}
