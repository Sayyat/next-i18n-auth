/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "./Header";
import { useSession } from "next-auth/react";

// Mock next-auth and custom hooks
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("@/shared/hooks/useTheme", () => ({
  useTheme: vi.fn(),
}));

vi.mock("@/locales/configs/server", () => ({
  getUserLocale: vi.fn(() => Promise.resolve("en")),
  setUserLocale: vi.fn(() => Promise.resolve()),
}));

function getLocaleMessages() {
  return {
    app: {
      "(ui)": {
        _components: {
          Header: {
            title: "Next i18n Auth Boilerplate",
            toggleTheme: "Toggle theme",
            unknownUser: "Unknown User",
            signOut: "Sign Out",
            user: "User",
            openMenu: "Menu",
            closeMenu: "Close",
          },
        },
      },
    },
    shared: {
      components: {
        LanguageSelect: {
          label: "Language",
          en: "English",
          ru: "Russian",
          kk: "Kazakh",
        },
      },
    },
  };
}

describe("Header Component", () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    // Mock useSession
    (useSession as any).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });

    vi.mock("next/navigation", () => ({
      useRouter: () => ({
        refresh: vi.fn(),
      }),
    }));

    vi.mock("next/cookies", () => ({
      getUserLocale: vi.fn(async () => "en"),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("toggles the mobile menu on button click", async () => {
    <Header />;

    const user = userEvent.setup();

    // Open the mobile menu
    const menuButton = screen.getByLabelText("Menu");
    await user.click(menuButton);

    // Narrow the search to the mobile menu container
    const mobileMenu = screen.getByRole("dialog"); // Use the correct role for the menu
    const signOutButtons = within(mobileMenu).getAllByText("Sign Out");

    expect(signOutButtons.length).toBe(1); // Ensure only one is visible in the menu
    expect(signOutButtons[0]).toBeVisible(); // Validate visibility

    // Close the mobile menu
    const closeButton = screen.getByLabelText("Close");
    await user.click(closeButton);

    // Assert that the mobile menu is no longer in the DOM
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("toggles the theme when the theme button is clicked", async () => {
    <Header />;

    const user = userEvent.setup();

    // Target the theme button for mobile or desktop
    const themeButtons = screen.getAllByLabelText("Toggle theme");

    // Click on the first theme button (e.g., mobile theme button)
    await user.click(themeButtons[0]);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);

    // Optionally test the second theme button (desktop)
    await user.click(themeButtons[1]);

    expect(mockToggleTheme).toHaveBeenCalledTimes(2);
  });

  it("signs out the user when the sign-out button is clicked", async () => {
    <Header />;

    const user = userEvent.setup();
    const signOutButton = screen.getByLabelText("Sign Out");
    await user.click(signOutButton);

    // Assert sign-out logic
    expect(useSession().data).toBeTruthy();
  });

  it("closes the menu on desktop screen resize", async () => {
    <Header />;

    const user = userEvent.setup();

    // Open the menu
    const menuButton = screen.getByLabelText("Menu");
    await user.click(menuButton);

    // Assert the menu is open
    const mobileMenu = screen.getByRole("dialog"); // Assuming the menu has a role="dialog"
    expect(mobileMenu).toBeInTheDocument();

    // Simulate resizing to desktop within act
    act(() => {
      window["innerWidth"] = 1024;
      window.dispatchEvent(new Event("resize"));
    });

    // Assert the menu is closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
