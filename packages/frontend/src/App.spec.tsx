import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom";

import * as engine from "utils/engine";
import { fetchCompanies, fetchCompanyById } from "apis/companies";

jest.mock("apis/companies");

import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // by disabling query retries, it makes your life so
      // much easier when testing
      retry: false,
    },
  },
});

describe("App", () => {
  const spy = jest.spyOn(engine, "calculateTotalByRules");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call calculateTotalByRules with correct values when clicking on the buttons", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    // add and remove standard ads
    fireEvent.click(screen.getByText("add standard"));
    // I don't really care what is passed on the 2nd argument
    expect(spy).toHaveBeenLastCalledWith(["standard"], expect.anything());

    fireEvent.click(screen.getByText("remove standard"));
    expect(spy).toHaveBeenLastCalledWith([], expect.anything());

    // add and remove featured ads
    fireEvent.click(screen.getByText("add featured"));
    expect(spy).toHaveBeenLastCalledWith(["featured"], expect.anything());

    fireEvent.click(screen.getByText("remove featured"));
    expect(spy).toHaveBeenLastCalledWith([], expect.anything());

    // add and remove premium ads
    fireEvent.click(screen.getByText("add premium"));
    expect(spy).toHaveBeenLastCalledWith(["premium"], expect.anything());

    fireEvent.click(screen.getByText("remove premium"));
    expect(spy).toHaveBeenLastCalledWith([], expect.anything());
  });

  it("should call calculateTotalByRules with correct values when clicking on the buttons for more than one value", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText("add standard"));
    // I don't really care what is passed on the 2nd argument
    expect(spy).toHaveBeenLastCalledWith(["standard"], expect.anything());

    fireEvent.click(screen.getByText("add featured"));
    expect(spy).toHaveBeenLastCalledWith(
      ["standard", "featured"],
      expect.anything()
    );

    fireEvent.click(screen.getByText("add premium"));
    expect(spy).toHaveBeenLastCalledWith(
      ["standard", "featured", "premium"],
      expect.anything()
    );

    // remove them one by one again

    fireEvent.click(screen.getByText("remove standard"));
    expect(spy).toHaveBeenLastCalledWith(
      ["featured", "premium"],
      expect.anything()
    );

    fireEvent.click(screen.getByText("remove featured"));
    expect(spy).toHaveBeenLastCalledWith(["premium"], expect.anything());

    fireEvent.click(screen.getByText("remove premium"));
    expect(spy).toHaveBeenLastCalledWith([], expect.anything());
  });

  it("should call calculateTotalByRules with correct values when removing non existent values", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    expect(spy).toHaveBeenLastCalledWith([], expect.anything());

    fireEvent.click(screen.getByText("remove standard"));
    expect(spy).toHaveBeenLastCalledWith([], expect.anything());
  });
});

describe("App dropdown", () => {
  it("should show correct total when choosing a value from the dropdown", async () => {
    (fetchCompanies as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: "fake company" }]),
      })
    );

    (fetchCompanyById as jest.Mock).mockResolvedValue(
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { adId: "standard", type: "discount", newPrice: 1 },
          ]),
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText("add standard"));
    expect(screen.getByText("Total is: 269.99")).toBeInTheDocument();

    await waitFor(() => {
      userEvent.selectOptions(screen.getByTestId("select-option"), ["1"]);
    });

    await waitFor(() => {
      expect(
        (
          screen.getByRole("option", {
            name: "fake company",
          }) as HTMLOptionElement
        ).selected
      ).toBe(true);
      expect(screen.getByText("Total is: 1")).toBeInTheDocument();
    });
  });
});
