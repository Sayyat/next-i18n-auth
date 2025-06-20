import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    // globals: true, // Enable global expect, describe, etc.
    environment: "jsdom", // Simulate browser environment
    include: ["**/*.test.?(c|m)[jt]s?(x)"],
    setupFiles: ["src/__tests__/vitest-setup.ts"],
  },
});
