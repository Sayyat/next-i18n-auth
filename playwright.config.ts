import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests/e2e', // Directory for E2E tests
    timeout: 30000, // Timeout for each test in milliseconds
    expect: {
        timeout: 5000, // Timeout for assertions
    },
    use: {
        baseURL: 'http://localhost:3000', // URL of the app
        headless: true, // Run tests in headless mode
        screenshot: 'only-on-failure', // Take screenshots on test failures
        video: 'retain-on-failure', // Record video on test failures
    },
    reporter: [['html', { open: 'never' }]], // Generate HTML report
});
