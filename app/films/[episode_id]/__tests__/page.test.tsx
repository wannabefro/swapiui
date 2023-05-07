import { act, render, waitFor } from "@testing-library/react";
import Page from "../page";
import { Providers } from "@/src/redux/provider";
import { mockIntersectionObserver } from "jsdom-testing-mocks";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    episode_id: string;
  };
};

mockIntersectionObserver();
jest.mock("next/navigation");

describe("Page", () => {
  const PageWithProvider = (props: PageProps) => (
    <Providers>
      <Page {...props} />
    </Providers>
  );
  it("should render successfully", () => {
    expect(() => {
      render(<PageWithProvider params={{ episode_id: "1" }} />);
    }).not.toThrow();
  });

  it("shows the Long time ago text when the page loads", () => {
    const { getByText } = render(
      <PageWithProvider params={{ episode_id: "1" }} />
    );
    expect(
      getByText("A long time ago, in a galaxy far, far away...")
    ).toBeTruthy();
  });

  it("shows the remaining content after it has loaded in", async () => {
    const { getByText } = render(
      <PageWithProvider params={{ episode_id: "1" }} />
    );
    await waitFor(() => expect(getByText("A New Hope")).toBeTruthy());
  });

  it("gives the user the option to skip the text scroll", async () => {
    const { getByText } = render(
      <PageWithProvider params={{ episode_id: "1" }} />
    );
    await waitFor(() => expect(getByText("Skip")).toBeTruthy());
    const skipButton = getByText("Skip");
    act(() => {
      skipButton.click();
    });

    await waitFor(() =>
      expect(getByText("Director: George Lucas")).toBeTruthy()
    );
  });

  it("renders the 404 page when the episode id is invalid", async () => {
    render(<PageWithProvider params={{ episode_id: "999" }} />);
    await waitFor(() => expect(notFound).toHaveBeenCalled());
  });
});
