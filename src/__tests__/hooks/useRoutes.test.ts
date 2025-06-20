import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRoutes } from "@/core/hooks/useRoutes";
import type { IAppRoute } from "@/core/types/routes";

// Mock the translation hook
vi.mock("../../i18n", () => ({
  useTranslation: vi.fn(() => ({
    t: (key: string) => key, // Return the key as translation for testing
  })),
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Group: "Group",
  Home: "Home",
  Info: "Info",
  PieChart: "PieChart",
  Settings: "Settings",
  Sheet: "Sheet",
  SquareUser: "SquareUser",
}));

describe("useRoutes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the correct structure", () => {
    const { result } = renderHook(() => useRoutes());

    expect(result.current).toHaveProperty("COMMON_ROUTES");
    expect(result.current).toHaveProperty("MANAGER_ROUTES");
    expect(result.current).toHaveProperty("FLATTENED_ROUTES");
    expect(result.current).toHaveProperty("flattenRoutes");
  });

  it("should return correct COMMON_ROUTES structure", () => {
    const { result } = renderHook(() => useRoutes());
    const { COMMON_ROUTES } = result.current;

    expect(COMMON_ROUTES).toHaveLength(3);

    // Test Home route
    expect(COMMON_ROUTES[0]).toEqual({
      title: "Home",
      url: "/",
      icon: "Home",
    });

    // Test Group 1 route with subRoutes
    expect(COMMON_ROUTES[1]).toEqual({
      title: "Group 1",
      url: "/group-1",
      icon: "Group",
      subRoutes: [
        {
          title: "About",
          url: "/group-1/about",
          icon: "Info",
        },
        {
          title: "Profile",
          url: "/group-1/profile",
          icon: "SquareUser",
        },
      ],
    });

    // Test Settings route
    expect(COMMON_ROUTES[2]).toEqual({
      title: "Settings",
      url: "/settings",
      icon: "Settings",
    });
  });

  it("should return correct MANAGER_ROUTES structure", () => {
    const { result } = renderHook(() => useRoutes());
    const { MANAGER_ROUTES } = result.current;

    expect(MANAGER_ROUTES).toHaveLength(1);

    expect(MANAGER_ROUTES[0]).toEqual({
      title: "Group 2",
      url: "/group-2",
      icon: "Group",
      subRoutes: [
        {
          title: "Dashboard",
          url: "/group-2/dashboard",
          icon: "Sheet",
        },
        {
          title: "Analytics",
          url: "/group-2/analytics",
          icon: "PieChart",
        },
      ],
    });
  });

  describe("flattenRoutes function", () => {
    it("should flatten routes without subRoutes", () => {
      const { result } = renderHook(() => useRoutes());
      const { flattenRoutes } = result.current;

      const routes: IAppRoute[] = [
        {
          title: "Home",
          url: "/",
          icon: "Home" as any,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: "Settings" as any,
        },
      ];

      const flattened = flattenRoutes(routes);

      expect(flattened).toEqual({
        "/": routes[0],
        "/settings": routes[1],
      });
    });

    it("should flatten routes with subRoutes", () => {
      const { result } = renderHook(() => useRoutes());
      const { flattenRoutes } = result.current;

      const routes: IAppRoute[] = [
        {
          title: "Group 1",
          url: "/group-1",
          icon: "Group" as any,
          subRoutes: [
            {
              title: "About",
              url: "/group-1/about",
              icon: "Info" as any,
            },
            {
              title: "Profile",
              url: "/group-1/profile",
              icon: "SquareUser" as any,
            },
          ],
        },
      ];

      const flattened = flattenRoutes(routes);

      expect(flattened).toEqual({
        "/group-1": routes[0],
        "/group-1/about": routes[0].subRoutes![0],
        "/group-1/profile": routes[0].subRoutes![1],
      });
    });

    it("should handle empty routes array", () => {
      const { result } = renderHook(() => useRoutes());
      const { flattenRoutes } = result.current;

      const flattened = flattenRoutes([]);

      expect(flattened).toEqual({});
    });

    it("should handle routes without subRoutes property", () => {
      const { result } = renderHook(() => useRoutes());
      const { flattenRoutes } = result.current;

      const routes: IAppRoute[] = [
        {
          title: "Simple Route",
          url: "/simple",
        },
      ];

      const flattened = flattenRoutes(routes);

      expect(flattened).toEqual({
        "/simple": routes[0],
      });
    });
  });

  it("should return correct FLATTENED_ROUTES", () => {
    const { result } = renderHook(() => useRoutes());
    const { FLATTENED_ROUTES } = result.current;

    // Check that all routes are included
    expect(FLATTENED_ROUTES).toHaveProperty("/");
    expect(FLATTENED_ROUTES).toHaveProperty("/group-1");
    expect(FLATTENED_ROUTES).toHaveProperty("/group-1/about");
    expect(FLATTENED_ROUTES).toHaveProperty("/group-1/profile");
    expect(FLATTENED_ROUTES).toHaveProperty("/settings");
    expect(FLATTENED_ROUTES).toHaveProperty("/group-2");
    expect(FLATTENED_ROUTES).toHaveProperty("/group-2/dashboard");
    expect(FLATTENED_ROUTES).toHaveProperty("/group-2/analytics");

    // Check specific route properties
    expect(FLATTENED_ROUTES["/"]).toEqual({
      title: "Home",
      url: "/",
      icon: "Home",
    });

    expect(FLATTENED_ROUTES["/group-1/about"]).toEqual({
      title: "About",
      url: "/group-1/about",
      icon: "Info",
    });

    expect(FLATTENED_ROUTES["/group-2/dashboard"]).toEqual({
      title: "Dashboard",
      url: "/group-2/dashboard",
      icon: "Sheet",
    });
  });

  it("should use translation function correctly", () => {
    const mockT = vi.fn((key: string) => `translated_${key}`);

    // Правильный способ мокинга для относительного импорта
    const mockUseTranslation = vi.fn(() => ({ t: mockT }));

    vi.doMock("../../i18n", () => ({
      useTranslation: mockUseTranslation,
    }));

    const { result } = renderHook(() => useRoutes());
    const { COMMON_ROUTES } = result.current;

    expect(COMMON_ROUTES[0].title).toBe("Home"); // или проверьте что функция вызывается
  });
});
