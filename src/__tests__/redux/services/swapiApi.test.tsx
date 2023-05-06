import {
  useGetFilmByIdQuery,
  useGetFilmsByTitleQuery,
  useGetFilmsQuery,
} from "@/src/redux/services/swapiApi";
import { Providers } from "@/src/redux/provider";
import { renderHook, waitFor } from "@testing-library/react";

describe("swapiApi", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Providers>{children}</Providers>
  );

  test("should fetch all films", async () => {
    const { result } = await renderHook(() => useGetFilmsQuery(null), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess));
    const { currentData: data } = result.current;
    expect(data).toBeDefined();
    expect(data!.count).toBeGreaterThan(0);
  });

  test("should fetch film by id", async () => {
    const { result } = await renderHook(
      () => useGetFilmByIdQuery({ id: "4" }),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current.isSuccess));
    const { currentData: data } = result.current;
    expect(data).toBeDefined();
    expect(data!.title).toBe("A New Hope");
  });

  test("should fetch films by title", async () => {
    const { result } = await renderHook(
      () => useGetFilmsByTitleQuery({ title: "new" }),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current.isSuccess));
    const { currentData: data } = result.current;
    expect(data).toBeDefined();
    expect(data!.results.length).toBeGreaterThan(0);
    expect(data!.results[0].title).toContain("New");
  });
});
