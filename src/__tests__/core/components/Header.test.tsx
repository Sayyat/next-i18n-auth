import { describe, it, vi, beforeEach, expect, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import * as framerMotion from "framer-motion";

const mockUseSession = vi.fn();
const mockT = vi.fn((key: string) => key);
const mockI18n = { language: "en" };
const mockUseTranslation = vi.fn((namespace: string) => {
  console.log({ namespace });
  return {
    t: mockT,
    i18n: mockI18n,
  };
});
const mockUseProfile = vi.fn();

const mockControls = {
  set: vi.fn(),
  start: vi.fn(),
};

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

// Mock next-auth
vi.mock("next-auth/react", () => ({
  useSession: () => mockUseSession(),
}));

// Mock translation

// Используем относительный путь для мока
vi.mock("@/i18n", () => ({
  useTranslation: mockUseTranslation,
}));

// Mock profile hook
vi.mock("@/features/authentication", () => ({
  EmailSentDialog: vi.fn(({ open, children }) =>
    open ? <div data-testid="email-sent-dialog">{children}</div> : null,
  ),
  LoginDialog: vi.fn(({ open, children }) =>
    open ? <div data-testid="login-dialog">{children}</div> : null,
  ),
  ProfileDialog: vi.fn(({ open, children }) =>
    open ? <div data-testid="profile-dialog">{children}</div> : null,
  ),
  RegisterDialog: vi.fn(({ open, children }) =>
    open ? <div data-testid="register-dialog">{children}</div> : null,
  ),
  ResetDialog: vi.fn(({ open, children }) =>
    open ? <div data-testid="reset-dialog">{children}</div> : null,
  ),
  useProfile: () => mockUseProfile(),
}));

// Mock UI components
vi.mock("@/shared/components/ui/skeleton", () => ({
  Skeleton: vi.fn(({ children, className }) => (
    <div data-testid="skeleton" className={className}>
      {children}
    </div>
  )),
}));

vi.mock("@/shared/components/ui/button", () => ({
  Button: vi.fn(({ children, onClick, className, ...props }) => (
    <button
      data-testid="button"
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  )),
}));

vi.mock("@/shared/components/LanguageSelect", () => ({
  LanguageSelect: vi.fn(() => (
    <div data-testid="language-select">Language Select</div>
  )),
}));

vi.mock("@/shared/components/ThemeSelect", () => ({
  ThemeSelect: vi.fn(() => <div data-testid="theme-select">Theme Select</div>),
}));

vi.mock("@/shared/components/ui/sidebar", () => ({
  SidebarTrigger: vi.fn((props) => (
    <button data-testid="sidebar-trigger" {...props}>
      Sidebar Trigger
    </button>
  )),
}));

vi.mock("../DynamicBreadcrumb", () => ({
  DynamicBreadcrumb: vi.fn(() => (
    <div data-testid="dynamic-breadcrumb">Breadcrumb</div>
  )),
}));

// Mock framer-motion

vi.mock("framer-motion", () => ({
  motion: {
    div: vi.fn(({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    )),
  },
  useAnimation: vi.fn(() => mockControls),
}));

let Header: typeof import("@/core/components/Header").Header;

describe("Header", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mockT.mockImplementation((key: string) => key);
    mockUseProfile.mockReturnValue({ data: null });
    mockUseTranslation.mockClear();
    mockUseTranslation.mockReturnValue({
      t: mockT,
      i18n: mockI18n,
    });
    Header = (await import("@/core/components/Header")).Header;
  });

  afterEach(() => {
    cleanup();
  });

  it("should render loading state", () => {
    mockUseSession.mockReturnValue({ status: "loading" });

    render(<Header />);
    const skeleton = screen.getByTestId("skeleton");
    // console.log({ skeleton });
    expect(skeleton).toBeInTheDocument();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("should render unauthenticated state with login and register buttons", () => {
    mockUseSession.mockReturnValue({ status: "unauthenticated" });

    render(<Header />);

    const buttons = screen.getAllByTestId("button");
    expect(buttons).toHaveLength(2);
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("should render authenticated state with user profile", () => {
    mockUseSession.mockReturnValue({ status: "authenticated" });
    mockUseProfile.mockReturnValue({
      data: { firstname: "John", lastname: "Doe" },
    });

    render(<Header />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });

  it("should render common components", () => {
    mockUseSession.mockReturnValue({ status: "unauthenticated" });

    render(<Header />);

    expect(screen.getByTestId("sidebar-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("dynamic-breadcrumb")).toBeInTheDocument();
    expect(screen.getByTestId("language-select")).toBeInTheDocument();
    expect(screen.getByTestId("theme-select")).toBeInTheDocument();
  });

  it("should open login dialog when login button is clicked", () => {
    mockUseSession.mockReturnValue({ status: "unauthenticated" });

    render(<Header />);

    const loginButton = screen.getByText("Log in").closest("button");
    fireEvent.click(loginButton!);

    expect(screen.getByTestId("login-dialog")).toBeInTheDocument();
  });

  it("should open register dialog when register button is clicked", () => {
    mockUseSession.mockReturnValue({ status: "unauthenticated" });

    render(<Header />);

    const registerButton = screen.getByText("Sign up").closest("button");
    fireEvent.click(registerButton!);

    expect(screen.getByTestId("register-dialog")).toBeInTheDocument();
  });

  it("should open profile dialog when user name is clicked", () => {
    mockUseSession.mockReturnValue({ status: "authenticated" });
    mockUseProfile.mockReturnValue({
      data: { firstname: "John", lastname: "Doe" },
    });

    render(<Header />);

    const profileArea = screen.getByText("John").closest("div");
    fireEvent.click(profileArea!);

    expect(screen.getByTestId("profile-dialog")).toBeInTheDocument();
  });

  it("should trigger animation controls on language change", async () => {
    mockUseSession.mockReturnValue({ status: "unauthenticated" });

    const { rerender } = render(<Header />);

    // Change language
    mockI18n.language = "ru";
    mockUseTranslation.mockReturnValue({
      t: mockT,
      i18n: { language: "ru" },
    });

    rerender(<Header />);

    await waitFor(() => {
      expect(mockControls.set).toHaveBeenCalledWith({ opacity: 0, scale: 0 });
      expect(mockControls.start).toHaveBeenCalledWith({ opacity: 1, scale: 1 });
    });
  });

  it("should call translation function with correct namespace", () => {
    mockUseSession.mockReturnValue({ status: "loading" });

    render(<Header />);

    expect(mockUseTranslation).toHaveBeenCalledWith("core.components.Header");
  });

  it("should handle authenticated state without profile data", () => {
    mockUseSession.mockReturnValue({ status: "authenticated" });
    mockUseProfile.mockReturnValue({ data: null });

    render(<Header />);

    // Ищем элемент с курсором pointer, который является областью профиля
    const profileArea = screen
      .getByRole("banner")
      .querySelector(".cursor-pointer");
    expect(profileArea).toBeInTheDocument();

    // Проверяем, что span элементы существуют, но пустые
    const spans = profileArea?.querySelectorAll("span");
    expect(spans).toHaveLength(2);
  });

  it("should handle partial profile data", () => {
    mockUseSession.mockReturnValue({ status: "authenticated" });
    mockUseProfile.mockReturnValue({
      data: { firstname: "John" }, // missing lastname
    });

    render(<Header />);

    expect(screen.getByText("John")).toBeInTheDocument();

    // Проверяем, что второй span существует, но может быть пустым
    const profileArea = screen
      .getByRole("banner")
      .querySelector(".cursor-pointer");
    const spans = profileArea?.querySelectorAll("span");
    expect(spans).toHaveLength(2);
    expect(spans?.[0]).toHaveTextContent("John");
  });

  describe("Modal dialogs", () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({ status: "unauthenticated" });
    });

    it("should not render any dialog initially", () => {
      render(<Header />);

      expect(screen.queryByTestId("login-dialog")).not.toBeInTheDocument();
      expect(screen.queryByTestId("register-dialog")).not.toBeInTheDocument();
      expect(screen.queryByTestId("profile-dialog")).not.toBeInTheDocument();
      expect(screen.queryByTestId("reset-dialog")).not.toBeInTheDocument();
      expect(screen.queryByTestId("email-sent-dialog")).not.toBeInTheDocument();
    });

    it("should render only one dialog at a time", () => {
      render(<Header />);

      // Open login dialog
      const loginButton = screen.getByText("Log in").closest("button");
      fireEvent.click(loginButton!);

      expect(screen.getByTestId("login-dialog")).toBeInTheDocument();
      expect(screen.queryByTestId("register-dialog")).not.toBeInTheDocument();
    });
  });

  describe("Responsive layout", () => {
    it("should have correct grid layout classes", () => {
      mockUseSession.mockReturnValue({ status: "unauthenticated" });

      render(<Header />);

      const headerContent = screen.getByRole("banner")
        .firstChild as HTMLElement;
      expect(headerContent).toHaveClass("grid", "grid-cols-[1fr_1fr]");
    });

    it("should have proper flex layouts for sections", () => {
      mockUseSession.mockReturnValue({ status: "unauthenticated" });

      render(<Header />);

      // Check if elements have proper flex classes
      const header = screen.getByRole("banner");
      expect(header).toHaveClass("flex", "items-center", "justify-between");
    });
  });

  describe("Animation setup", () => {
    it("should initialize animation controls", () => {
      mockUseSession.mockReturnValue({ status: "unauthenticated" });

      render(<Header />);

      const mockedUseAnimation = vi.mocked(framerMotion.useAnimation);
      expect(mockedUseAnimation).toHaveBeenCalled();
    });

    it("should apply motion props to animated elements", () => {
      mockUseSession.mockReturnValue({ status: "unauthenticated" });

      render(<Header />);

      const mockedMotionDiv = vi.mocked(framerMotion.motion.div);
      expect(mockedMotionDiv).toHaveBeenCalled();

      const motionDivs = screen.getAllByTestId("motion-div");
      expect(motionDivs.length).toBeGreaterThan(0);
    });
  });

  describe("Profile area interactions", () => {
    it("should handle click on profile area when authenticated", () => {
      mockUseSession.mockReturnValue({ status: "authenticated" });
      mockUseProfile.mockReturnValue({
        data: { firstname: "John", lastname: "Doe" },
      });

      render(<Header />);

      const profileArea = screen
        .getByRole("banner")
        .querySelector(".cursor-pointer");
      expect(profileArea).toBeInTheDocument();

      fireEvent.click(profileArea!);
      expect(screen.getByTestId("profile-dialog")).toBeInTheDocument();
    });

    it("should render profile area even without profile data", () => {
      mockUseSession.mockReturnValue({ status: "authenticated" });
      mockUseProfile.mockReturnValue({ data: null });

      render(<Header />);

      const profileArea = screen
        .getByRole("banner")
        .querySelector(".cursor-pointer");
      expect(profileArea).toBeInTheDocument();
      expect(profileArea).toHaveClass("h-full", "flex", "cursor-pointer");
    });
  });

  describe("Translation integration", () => {
    it("should translate loading text", () => {
      mockUseSession.mockReturnValue({ status: "loading" });
      mockT.mockImplementation((key) => (key === "Loading" ? "Загрузка" : key));

      render(<Header />);

      expect(screen.getByText("Загрузка")).toBeInTheDocument();
    });

    it("should translate button texts", () => {
      mockUseSession.mockReturnValue({ status: "unauthenticated" });
      mockT.mockImplementation((key) => {
        if (key === "Log in") return "Войти";
        if (key === "Sign up") return "Регистрация";
        return key;
      });

      render(<Header />);

      expect(screen.getByText("Войти")).toBeInTheDocument();
      expect(screen.getByText("Регистрация")).toBeInTheDocument();
    });
  });
});
