import { test, expect } from '@playwright/test';

test('Shows rate cards in English', async ({ page }) => {
  await page.goto('/en');

  await expect(page.getByRole('heading', { name: 'Best Fix' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Best Variable' })).toBeVisible();
});

test('French localization works', async ({ page }) => {
  await page.goto("/en");
  await page.getByRole('link', { name: 'Fr' }).click();
  await expect(page).toHaveURL(/\/fr$/);
  await expect(page.getByRole('heading', { name: 'Meilleur Fixe' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Meilleur Variable' })).toBeVisible();
});

test('Selected Product shows in application', async ({ page }) => {
  await page.goto("/en");
  await page.getByRole('button', { name: 'Select this product' }).first().click();

  await expect(page).toHaveURL(/.*\/apply/);
  await expect(page.getByRole('heading', { name: 'Product Selected' })).toBeVisible();
});