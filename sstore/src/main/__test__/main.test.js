import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Main from "../main";
import MicroserviceFetchUtil from "../../../common/microservice-fetch-util";
import { act } from "react-dom/test-utils";
import { StoreContext } from "../../ContextStore/StoreContextProvider";

// Mocking MicroserviceFetchUtil to return mock data for the API call
jest.mock("../../../common/microservice-fetch-util", () => ({
  post: jest.fn().mockResolvedValue({
    statusCode: 200,
    "response-data": {
      accessToUcube: "YES",
      accessToOperationalDashboards: "YES",
      userType: "admin",
    },
  }),
}));

// Mocking localStorage and getCookie for testing
const mockLocalStorage = {
  getItem: jest.fn(),
};
global.localStorage = mockLocalStorage;

// Mocking the StoreContext for testing
const mockContextValue = {
  userDetails: null,
  updateUserDetails: jest.fn(),
};
jest.mock("../../../ContextStore/StoreContextProvider", () => ({
  StoreContext: {
    Consumer: ({ children }) => children(mockContextValue),
  },
}));

// Utility function to render Main component with required dependencies
const renderMainComponent = () => {
  const history = createMemoryHistory();
  return render(
    <StoreContext.Provider value={mockContextValue}>
      <MemoryRouter>
        <Router history={history}>
          <Main />
        </Router>
      </MemoryRouter>
    </StoreContext.Provider>
  );
};

describe("Main Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders BrandingLoader when loading", async () => {
    renderMainComponent();
    expect(screen.getByTestId("branding-loader")).toBeInTheDocument();
  });

  test("Renders Header when logged in", async () => {
    mockLocalStorage.getItem.mockReturnValue("sample_idToken");
    renderMainComponent();
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("Renders LandingHeader when logged in and on UCUBE_ROUTES", async () => {
    mockLocalStorage.getItem.mockReturnValue("sample_idToken");
    renderMainComponent();
    expect(screen.getByTestId("landing-header")).toBeInTheDocument();
  });

  test("Redirects to /login when not logged in", async () => {
    renderMainComponent();
    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("landing-header")).not.toBeInTheDocument();
    expect(screen.getByTestId("branding-loader")).toBeInTheDocument();
  });

  test("Updates user details and renders correct headers on successful API call", async () => {
    mockLocalStorage.getItem.mockReturnValue("sample_idToken");
    await act(async () => {
      renderMainComponent();
    });
    expect(mockContextValue.updateUserDetails).toHaveBeenCalledWith({
      accessToUcube: "YES",
      accessToOperationalDashboards: "YES",
      userType: "admin",
    });
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("Renders correct headers based on user details from context", async () => {
    mockLocalStorage.getItem.mockReturnValue("sample_idToken");
    mockContextValue.userDetails = {
      accessToUcube: "NO",
      accessToOperationalDashboards: "YES",
      userType: "normal",
    };
    renderMainComponent();
    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
    expect(screen.getByTestId("landing-header")).toBeInTheDocument();
  });
});
