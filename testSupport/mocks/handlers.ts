import { rest } from "msw";

const A_NEW_HOPE = {
  title: "A New Hope",
  episode_id: 4,
  opening_crawl: "It is a period of civil war.",
  director: "George Lucas",
  producer: "Gary Kurtz, Rick McCallum",
  release_date: "1977-05-25",
  characters: [],
  planets: [],
  starships: [],
  vehicles: [],
  satisfies: [],
  url: "https://swapi.dev/api/films/1/",
};

const handlers = [
  rest.get("https://swapi.dev/api/films", (req, res, ctx) => {
    if (req.url.searchParams.get("search")) {
      if (req.url.searchParams.get("search") === "nope") {
        return res(ctx.json({ count: 0, results: [] }));
      }

      return res(
        ctx.json({
          count: 1,
          next: null,
          previous: null,
          results: [A_NEW_HOPE],
        })
      );
    }

    return res(
      ctx.json({
        count: 6,
        next: null,
        previous: null,
        results: [A_NEW_HOPE],
      })
    );
  }),
  rest.get("https://swapi.dev/api/films/:id", (req, res, ctx) => {
    if (req.params.id === "999") {
      return res(ctx.status(404));
    }

    return res(ctx.json(A_NEW_HOPE));
  }),
];

export { handlers };
