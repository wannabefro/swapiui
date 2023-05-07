import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";
import { server } from "./testSupport/mocks/server";
import { store } from "./src/redux/store";
import { swapiApi } from "./src/redux/services/swapiApi";
import { act } from "react-dom/test-utils";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  act(() => {
    store.dispatch(swapiApi.util.resetApiState());
  });
});
afterAll(() => server.close());
