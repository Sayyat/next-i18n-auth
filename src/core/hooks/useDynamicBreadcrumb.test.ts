import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";

// Mock Next.js navigation
const mockUsePathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: mockUsePathname,
}));

// Mock translation hook
const mockT = vi.fn((key: string) => key);
const mockUseTranslation = vi.fn(() => ({
  t: mockT,
}));

// Mock useRoutes hook
const mockFlattenedRoutes = {
  "/": {
    title: "Home",
    url: "/",
    icon: "HomeIcon",
  },
  "/group-1": {
    title: "Group 1",
    url: "/group-1",
    icon: "GroupIcon",
  },
  "/group-1/about": {
    title: "About",
    url: "/group-1/about",
    icon: "InfoIcon",
  },
  "/group-1/profile": {
    title: "Profile",
    url: "/group-1/profile",
    icon: "UserIcon",
  },
  "/settings": {
    title: "Settings",
    url: "/settings",
    icon: "SettingsIcon",
  },
  "/group-2": {
    title: "Group 2",
    url: "/group-2",
    icon: "GroupIcon",
  },
  "/group-2/dashboard": {
    title: "Dashboard",
    url: "/group-2/dashboard",
    icon: "DashboardIcon",
  },
};

const mockUseRoutes = vi.fn(() => ({
  FLATTENED_ROUTES: mockFlattenedRoutes,
  COMMON_ROUTES: [],
  MANAGER_ROUTES: [],
  flattenRoutes: vi.fn(),
}));

// Мокаем модули перед импортом
vi.mock("../../i18n", () => ({
  useTranslation: mockUseTranslation,
}));

vi.mock("./useRoutes", () => ({
  useRoutes: mockUseRoutes,
}));

// Импортируем хук после настройки моков
const { useDynamicBreadcrumb } = await import("./useDynamicBreadcrumb");

describe("useDynamicBreadcrumb", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockT.mockImplementation((key: string) => key);
    mockUseTranslation.mockReturnValue({ t: mockT });
    mockUseRoutes.mockReturnValue({
      FLATTENED_ROUTES: mockFlattenedRoutes,
      COMMON_ROUTES: [],
      MANAGER_ROUTES: [],
      flattenRoutes: vi.fn(),
    });
  });

  it("should return home breadcrumb for root path", () => {
    mockUsePathname.mockReturnValue("/");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "Home",
        href: "/",
        icon: "HomeIcon",
      },
    ]);
  });

  it("should return home breadcrumb for empty pathname", () => {
    mockUsePathname.mockReturnValue("");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "Home",
        href: "/",
        icon: "HomeIcon",
      },
    ]);
  });

  it("should return home breadcrumb for null pathname", () => {
    mockUsePathname.mockReturnValue(null);

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "Home",
        href: "/",
        icon: "HomeIcon",
      },
    ]);
  });

  it("should generate breadcrumb for single level path", () => {
    mockUsePathname.mockReturnValue("/settings");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "Settings",
        href: "/settings",
        icon: "SettingsIcon",
      },
    ]);
  });

  it("should generate breadcrumb for nested path", () => {
    mockUsePathname.mockReturnValue("/group-1/about");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "Group 1",
        href: "/group-1",
        icon: "GroupIcon",
      },
      {
        name: "About",
        href: "/group-1/about",
        icon: "InfoIcon",
      },
    ]);
  });

  it("should generate breadcrumb for deeply nested path", () => {
    mockUsePathname.mockReturnValue("/group-2/dashboard");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "Group 2",
        href: "/group-2",
        icon: "GroupIcon",
      },
      {
        name: "Dashboard",
        href: "/group-2/dashboard",
        icon: "DashboardIcon",
      },
    ]);
  });

  it("should handle unknown routes by using segment name", () => {
    mockUsePathname.mockReturnValue("/unknown/path");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "unknown",
        href: "/unknown",
      },
      {
        name: "path",
        href: "/unknown/path",
      },
    ]);
  });

  it("should handle mixed known and unknown routes", () => {
    mockUsePathname.mockReturnValue("/group-1/unknown/segment");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "Group 1",
        href: "/group-1",
        icon: "GroupIcon",
      },
      {
        name: "unknown",
        href: "/group-1/unknown",
      },
      {
        name: "segment",
        href: "/group-1/unknown/segment",
      },
    ]);
  });

  it("should handle paths with trailing slash", () => {
    mockUsePathname.mockReturnValue("/group-1/about/");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "Group 1",
        href: "/group-1",
        icon: "GroupIcon",
      },
      {
        name: "About",
        href: "/group-1/about",
        icon: "InfoIcon",
      },
    ]);
  });

  it("should handle paths with multiple slashes", () => {
    mockUsePathname.mockReturnValue("//group-1//about//");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "Group 1",
        href: "/group-1",
        icon: "GroupIcon",
      },
      {
        name: "About",
        href: "/group-1/about",
        icon: "InfoIcon",
      },
    ]);
  });

  it("should use translation function for home route", () => {
    mockUsePathname.mockReturnValue("/");
    mockT.mockReturnValue("Главная");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(mockUseTranslation).toHaveBeenCalledWith(
      "core.hooks.useDynamicBreadcrumb",
    );
    expect(mockT).toHaveBeenCalledWith("Home");
    expect(result.current[0].name).toBe("Главная");
  });

  it("should build correct path segments progressively", () => {
    mockUsePathname.mockReturnValue("/a/b/c");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "a",
        href: "/a",
      },
      {
        name: "b",
        href: "/a/b",
      },
      {
        name: "c",
        href: "/a/b/c",
      },
    ]);
  });

  it("should handle route without icon", () => {
    const routesWithoutIcon = {
      ...mockFlattenedRoutes,
      "/no-icon": {
        title: "No Icon Route",
        url: "/no-icon",
      },
    };

    mockUseRoutes.mockReturnValue({
      FLATTENED_ROUTES: routesWithoutIcon,
      COMMON_ROUTES: [],
      MANAGER_ROUTES: [],
      flattenRoutes: vi.fn(),
    });

    mockUsePathname.mockReturnValue("/no-icon");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "No Icon Route",
        href: "/no-icon",
        icon: undefined,
      },
    ]);
  });

  it("should handle empty segments correctly", () => {
    mockUsePathname.mockReturnValue("/group-1//about");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    // Empty segments should be filtered out
    expect(result.current).toEqual([
      {
        name: "Group 1",
        href: "/group-1",
        icon: "GroupIcon",
      },
      {
        name: "About",
        href: "/group-1/about",
        icon: "InfoIcon",
      },
    ]);
  });

  it("should handle special characters in path segments", () => {
    mockUsePathname.mockReturnValue("/group-1/special%20chars");

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "Group 1",
        href: "/group-1",
        icon: "GroupIcon",
      },
      {
        name: "special%20chars",
        href: "/group-1/special%20chars",
      },
    ]);
  });

  it("should handle undefined pathname", () => {
    mockUsePathname.mockReturnValue(undefined);

    const { result } = renderHook(() => useDynamicBreadcrumb());

    expect(result.current).toEqual([
      {
        name: "Home",
        href: "/",
        icon: "HomeIcon",
      },
    ]);
  });
});
