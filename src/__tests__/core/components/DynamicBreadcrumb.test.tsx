import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { DynamicBreadcrumb } from "@/core/components/DynamicBreadcrumb";
import { useDynamicBreadcrumb } from "@/core/hooks/useDynamicBreadcrumb";
import { LucideProps } from "lucide-react";

// Mock client environment
vi.mock("@/shared/data/env/client", () => ({
  useSession: () =>
    vi.fn(() => ({
      NEXT_PUBLIC_API_URL: "",
    })),
}));

// Mock server environment
vi.mock("@/shared/data/env/server", () => ({
  useSession: () =>
    vi.fn(() => ({
      API_URL: "",
      AUTH_SECRET: "",
    })),
}));

// Mock the dynamic breadcrumb hook
vi.mock("@/core/hooks/useDynamicBreadcrumb", () => ({
  useDynamicBreadcrumb: vi.fn(),
}));

// Dummy icon component for testing
const MockIcon = ({ className }: LucideProps) => (
  <svg data-testid="icon" className={className} />
);

describe("DynamicBreadcrumb", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders nothing if breadcrumbItems is empty", () => {
    (useDynamicBreadcrumb as ReturnType<typeof vi.fn>).mockReturnValue([]);

    render(<DynamicBreadcrumb />);
    expect(screen.getByTestId("dynamic-breadcrumb")).toBeInTheDocument();
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
  });

  it("renders breadcrumb items with icons and separators", () => {
    (useDynamicBreadcrumb as ReturnType<typeof vi.fn>).mockReturnValue([
      { name: "Home", icon: MockIcon },
      { name: "Dashboard", icon: MockIcon },
      { name: "Settings", icon: MockIcon },
    ]);

    render(<DynamicBreadcrumb />);

    // Check for text content
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();

    // Check for icons
    expect(screen.getAllByTestId("icon")).toHaveLength(3);

    // Check for separators (should be n-1 where n = item count)
    expect(screen.getAllByRole("presentation", { hidden: true })).toHaveLength(
      2,
    );
  });

  it("renders breadcrumb items without icons", () => {
    (useDynamicBreadcrumb as ReturnType<typeof vi.fn>).mockReturnValue([
      { name: "Level 1" },
      { name: "Level 2" },
    ]);

    render(<DynamicBreadcrumb />);
    expect(screen.getByText("Level 1")).toBeInTheDocument();
    expect(screen.getByText("Level 2")).toBeInTheDocument();
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
  });
});
