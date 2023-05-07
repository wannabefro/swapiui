import { Providers } from "@/src/redux/provider";
import SearchPage from "../page";
import { render } from "@testing-library/react";
import { useSearchParams } from "next/navigation";

jest.mock("next/navigation");

describe("SearchPage", () => {
  const PageWithProvider = () => (
    <Providers>
      <SearchPage />
    </Providers>
  );

  it("renders a loading skeleton on intial load", () => {
    const mockUseSearchParams = useSearchParams as jest.Mock;
    mockUseSearchParams.mockReturnValue(new Map());

    const { getAllByTestId } = render(<PageWithProvider />);
    expect(getAllByTestId("loading-skeleton").length).toBe(3);
  });

  it("renders the search results", async () => {
    const mockUseSearchParams = useSearchParams as jest.Mock;
    const mockSearchParams = new Map();
    mockSearchParams.set("q", "A New");
    mockUseSearchParams.mockReturnValue(mockSearchParams);

    const { findByText } = render(<PageWithProvider />);
    expect(await findByText("A New Hope")).toBeTruthy();
  });

  it("handles when there are no search results", async () => {
    const mockUseSearchParams = useSearchParams as jest.Mock;
    const mockSearchParams = new Map();
    mockSearchParams.set("q", "nope");
    mockUseSearchParams.mockReturnValue(mockSearchParams);

    const { findByText } = render(<PageWithProvider />);
    expect(await findByText("No results found.")).toBeTruthy();
  });
});
