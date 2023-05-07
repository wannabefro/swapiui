"use client";

import { useState } from "react";
import { TextScroll } from "@/components/TextScroll";
import { useGetFilmByIdQuery } from "@/src/redux/services/swapiApi";
import { notFound } from "next/navigation";
import { FilmCard } from "@/components/FilmCard";

type FilmPageProps = {
  params: {
    episode_id: string;
  };
};

export default function FilmPage({ params }: FilmPageProps) {
  const [textScrollComplete, setTextScrollComplete] = useState(false);
  const { data, error } = useGetFilmByIdQuery({
    id: params.episode_id,
  });
  const onScrollEnd = () => {
    setTextScrollComplete(true);
  };

  if (error) {
    return notFound();
  }

  if (textScrollComplete && data) {
    return <FilmCard film={data} />;
  }

  return <TextScroll film={data} onScrollEnd={onScrollEnd} />;
}
