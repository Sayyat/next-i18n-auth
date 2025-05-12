import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        globals: true, // Enable global expect, describe, etc.
        environment: "jsdom", // Simulate browser environment
        setupFiles: "./src/tests/setup.ts", // Point to the setup file
    },
})
