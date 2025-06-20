import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import {
  RenderMenuItem,
  RenderRouteGroup,
} from "@/core/components/RenderSidebarGroup";
import { IAppRoute } from "@/core/types/routes";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { LucideProps } from "lucide-react";
import { forwardRef } from "react";

// Мокаем window.matchMedia
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// Mock client env
vi.mock("@/shared/data/env/client", () => ({
  useSession: () =>
    vi.fn(() => ({
      NEXT_PUBLIC_API_URL: "",
    })),
}));

// Mock server env
vi.mock("@/shared/data/env/server", () => ({
  useSession: () =>
    vi.fn(() => ({
      API_URL: "",
      AUTH_SECRET: "",
    })),
}));

// Mock usePathname
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

// eslint-disable-next-line react/display-name
const DummyIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <svg ref={ref} data-testid="icon" {...props} />
));

const singleRoute: IAppRoute = {
  url: "/dashboard",
  title: "Dashboard",
  icon: DummyIcon,
};

const nestedRoutes: IAppRoute[] = [
  {
    url: "/settings",
    title: "Settings",
    icon: DummyIcon,
    subRoutes: [
      { url: "/settings/profile", title: "Profile" },
      { url: "/settings/security", title: "Security" },
    ],
  },
];

function renderWithSidebar(ui: React.ReactNode) {
  return render(<SidebarProvider>{ui}</SidebarProvider>);
}

describe("RenderMenuItem", () => {
  afterEach(cleanup);

  it("renders a link with active class if current route matches", () => {
    (usePathname as Mock).mockReturnValue("/dashboard");

    renderWithSidebar(<RenderMenuItem route={singleRoute} />);
    const link = screen.getByRole("link", { name: /dashboard/i });
    expect(link).toHaveClass("text-sidebar-accent-foreground");
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders a link with inactive class if not current route", () => {
    (usePathname as Mock).mockReturnValue("/not-matching");

    renderWithSidebar(<RenderMenuItem route={singleRoute} />);
    const link = screen.getByRole("link", { name: /dashboard/i });
    expect(link).toHaveClass("text-sidebar-foreground");
  });
});

describe("RenderRouteGroup", () => {
  beforeEach(() => {
    (usePathname as Mock).mockReturnValue("/settings/profile");
  });

  afterEach(cleanup);

  it("renders nested routes correctly", () => {
    renderWithSidebar(<RenderRouteGroup routes={nestedRoutes} />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
  });
});
