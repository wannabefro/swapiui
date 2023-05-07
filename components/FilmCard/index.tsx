import { Film } from "@/src/redux/services/swapiApi";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const FilmCard = ({ film }: { film: Film }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-base md:text-lg">
      <div className="text-starwars rounded-lg shadow-lg p-8 m-4 w-4/5 md:w-1/2 lg:w-1/3">
        <Link href="/" className="flex gap-4 my-4">
          <ArrowLeftIcon className="h-6 w-6 text-starwars" />
          Go Home
        </Link>
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">{film.title}</h2>
          <h3 className="text-xl font-semibold">Episode {film.episode_id}</h3>
        </div>
        <p className="mb-4">Director: {film.director}</p>
        <p className="mb-4">Producer: {film.producer}</p>
        <p className="mb-4">Release Date: {film.release_date}</p>
        <div className="border-t border-starwars pt-4">
          <h4 className="text-lg font-semibold mb-2">Opening Crawl:</h4>
          <p className="whitespace-pre-wrap">{film.opening_crawl}</p>
        </div>
      </div>
    </div>
  );
};
