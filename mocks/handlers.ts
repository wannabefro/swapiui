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
};

const handlers = [
  rest.get("https://swapi.dev/api/films", (req, res, ctx) => {
    if (req.params.search) {
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
    return res(ctx.json(A_NEW_HOPE));
  }),
];

export { handlers };
