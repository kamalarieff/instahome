import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom";

import { Checkout } from "utils/engine";
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
  const spyAdd = jest.spyOn(Checkout, "add");
  const spyRemove = jest.spyOn(Checkout, "remove");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call Checkout with correct values when clicking on the buttons", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    // add and remove standard ads
    fireEvent.click(screen.getByText("add standard"));
    expect(spyAdd).toHaveBeenLastCalledWith("standard");

    fireEvent.click(screen.getByText("remove standard"));
    expect(spyRemove).toHaveBeenLastCalledWith("standard");

    // add and remove featured ads
    fireEvent.click(screen.getByText("add featured"));
    expect(spyAdd).toHaveBeenLastCalledWith("featured");

    fireEvent.click(screen.getByText("remove featured"));
    expect(spyRemove).toHaveBeenLastCalledWith("featured");

    // add and remove premium ads
    fireEvent.click(screen.getByText("add premium"));
    expect(spyAdd).toHaveBeenLastCalledWith("premium");

    fireEvent.click(screen.getByText("remove premium"));
    expect(spyRemove).toHaveBeenLastCalledWith("premium");
  });

  it("should call Checkout with correct values when clicking on the buttons for more than one value", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText("add standard"));
    expect(spyAdd).toHaveBeenLastCalledWith("standard");

    fireEvent.click(screen.getByText("add featured"));
    expect(spyAdd).toHaveBeenLastCalledWith("featured");

    fireEvent.click(screen.getByText("add premium"));
    expect(spyAdd).toHaveBeenLastCalledWith("premium");

    // remove them one by one again

    fireEvent.click(screen.getByText("remove standard"));
    expect(spyRemove).toHaveBeenLastCalledWith("standard");

    fireEvent.click(screen.getByText("remove featured"));
    expect(spyRemove).toHaveBeenLastCalledWith("featured");

    fireEvent.click(screen.getByText("remove premium"));
    expect(spyRemove).toHaveBeenLastCalledWith("premium");
  });

  it("should call Checkout with correct values when removing non existent values", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText("remove standard"));
    expect(spyRemove).toHaveBeenLastCalledWith("standard");
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
