import { Providers } from "@/src/redux/provider";
import Home from "../page";
import userEvent from "@testing-library/user-event";
import { act, render, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock(
  "next/link",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children
);

describe("Home page", () => {
  const PageWithProvider = () => (
    <Providers>
      <Home />
    </Providers>
  );

  it("suggests films based on the users input", async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByText } = render(<PageWithProvider />);
    const input = getByPlaceholderText("Search by title...");
    input.focus();
    await user.keyboard("A N");

    expect(getByText("A New Hope")).toBeTruthy();
  });

  it("navigates to the film page when a film is clicked", async () => {
    const user = userEvent.setup();
    const mockPush = jest.fn();
    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });

    const { getByPlaceholderText, getByText } = render(<PageWithProvider />);
    const input = getByPlaceholderText("Search by title...");
    input.focus();
    await user.keyboard("A N");

    act(() => {
      user.click(getByText("A New Hope"));
    });

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/films/1"));
  });
});
