/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { test, expect } from "@playwright/test";

test("homepage has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Next i18n Auth/);
});
