// src/core/components/Footer.test.tsx
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

const mockT = vi.fn((key: string) => key);
const mockUseTranslation = vi.fn(() => ({
  t: mockT,
}));

// Mock i18n module
vi.mock("@/i18n", () => ({
  useTranslation: mockUseTranslation,
}));

let Footer: typeof import("./Footer").Footer;

describe("Footer", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mockT.mockImplementation((key) => key); // default passthrough
    Footer = (await import("./Footer")).Footer;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders translated text and current year", () => {
    render(<Footer />);

    expect(mockUseTranslation).toHaveBeenCalledWith("core.components.Footer");
    expect(mockT).toHaveBeenCalledWith("Created with ❤️");
    expect(mockT).toHaveBeenCalledWith("Sayat Raykul");

    // Check presence in document
    expect(screen.getByText("Created with ❤️")).toBeInTheDocument();
    expect(screen.getByText("Sayat Raykul")).toBeInTheDocument();

    // Check current year
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  it("renders separators", () => {
    render(<Footer />);
    const separators = screen.getAllByRole("separator", { hidden: true });
    expect(separators.length).toBe(2);
  });
});
