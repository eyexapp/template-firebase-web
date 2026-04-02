import { test, expect } from '@playwright/test';

test('home page renders welcome title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});

test('navigation to items page', async ({ page }) => {
  await page.goto('/items');
  await expect(page.locator('h1')).toContainText(/items|öğeler/i);
});

test('404 page for unknown routes', async ({ page }) => {
  await page.goto('/nonexistent-route');
  await expect(page.locator('h1')).toContainText('404');
});
