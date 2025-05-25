import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { AppSidebar } from "./AppSidebar";
import { useSession } from "next-auth/react";
import { useProfile } from "@/features/authentication";
import { useRoutes } from "@/core/hooks/useRoutes";

// Mocks
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

vi.mock("@/features/authentication", () => ({
  useProfile: vi.fn(),
}));

vi.mock("@/core/hooks/useRoutes", () => ({
  useRoutes: vi.fn(),
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img alt="" {...props} />, // mock Image component
}));

vi.mock("@/shared/components/ui/sidebar", () => ({
  Sidebar: vi.fn(({ children, ...props }) => (
    <div data-testid="sidebar" {...props}>
      {children}
    </div>
  )),
  SidebarContent: vi.fn(({ children }) => (
    <div data-testid="sidebar-content">{children}</div>
  )),
  SidebarHeader: vi.fn(({ children }) => (
    <div data-testid="sidebar-header">{children}</div>
  )),
}));

vi.mock("./RenderSidebarGroup", () => ({
  RenderRouteGroup: vi.fn(({ routes }) => (
    <div data-testid={`render-routes-${routes[0]?.title}`}>
      {routes.map((r: any) => (
        <span key={r.url}>{r.title}</span>
      ))}
    </div>
  )),
}));

describe("AppSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useSession as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
    });

    (useProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
    });

    (useRoutes as ReturnType<typeof vi.fn>).mockReturnValue({
      COMMON_ROUTES: [
        { url: "/home", title: "Home" },
        { url: "/about", title: "About" },
      ],
      MANAGER_ROUTES: [
        { url: "/admin", title: "Admin Panel" },
        { url: "/stats", title: "Statistics" },
      ],
    });
  });

  afterEach(cleanup);

  it("renders logo and title", () => {
    render(<AppSidebar />);
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("Next i18n Auth")).toBeInTheDocument();
  });

  it("renders common routes", () => {
    render(<AppSidebar />);
    expect(screen.getByTestId("render-routes-Home")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders manager routes when session and is_superuser are present", () => {
    (useSession as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { user: { email: "admin@example.com" } },
    });

    (useProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { is_superuser: true },
    });

    render(<AppSidebar />);

    expect(screen.getByTestId("render-routes-Admin Panel")).toBeInTheDocument();
    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
    expect(screen.getByText("Statistics")).toBeInTheDocument();
  });

  it("does not render manager routes when user is not superuser", () => {
    (useSession as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { user: { email: "user@example.com" } },
    });

    (useProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { is_superuser: false },
    });

    render(<AppSidebar />);
    expect(
      screen.queryByTestId("render-routes-Admin Panel"),
    ).not.toBeInTheDocument();
  });
});
