import { test, expect } from '@playwright/test';

// Basic sanity check to make sure server is running
// See playwright.config.ts for the webServer configuration
test('browser tab title is set', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle('Češi, kteří čtou E15');
});

test('filter is set to default value', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const button = page.getByLabel('ALL');

  // Check if the button is visible
  await expect(button).toBeVisible();

  // Check if the button is active by checking if it has the class Button_active (without hash)
  await expect(button).toHaveClass(/Button_active/);
});

// Checking that all buttons are clickable and selectable one by one
test('filters options can be switched', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const aboveButton = page.getByLabel('ABOVE');
  await expect(aboveButton).toBeVisible();
  await expect(aboveButton).not.toHaveClass(/Button_active/);

  await aboveButton.click();
  await expect(aboveButton).toHaveClass(/Button_active/);

  const belowButton = page.getByLabel('BELOW');
  await expect(belowButton).toBeVisible();
  await expect(belowButton).not.toHaveClass(/Button_active/);

  await belowButton.click();
  await expect(belowButton).toHaveClass(/Button_active/);

  const allButton = page.getByLabel('ALL');
  await expect(allButton).toBeVisible();
  await expect(allButton).not.toHaveClass(/Button_active/);

  await allButton.click();
  await expect(allButton).toHaveClass(/Button_active/);
});

// Checking that all buttons have icons and labels
test('filtr options have icons and labels', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const aboveButton = page.getByLabel('ABOVE');
  await expect(aboveButton).toHaveText('Nadprůměr');
  await expect(aboveButton.getByRole('img')).toBeVisible();

  const belowButton = page.getByLabel('BELOW');
  await expect(belowButton).toHaveText('Podprůměr');
  await expect(belowButton.getByRole('img')).toBeVisible();

  const allButton = page.getByLabel('ALL');
  await expect(allButton).toHaveText('Vše');
  await expect(allButton.getByRole('img')).toBeVisible();
});

// Checking that each card has correct data and green color
test('when filtr Nadprůměr is selected correct data is shown', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/');
  const button = page.getByLabel('ABOVE');
  await button.click();

  const cardItems = page.getByLabel('Card item');
  for (const cardItem of await cardItems.all()) {
    await expect(cardItem.locator('div')).toHaveClass(/cardItemValueGreen/);
  }
});

// Checking that each card has correct data and red color
test('when filtr Podprůměr is selected correct data is shown', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/');
  const button = page.getByLabel('BELOW');
  await button.click();

  const cardItems = page.getByLabel('Card item');
  for (const cardItem of await cardItems.all()) {
    await expect(cardItem.locator('div')).toHaveClass(/cardItemValueRed/);
  }
});

// Checking that each card has correct data
test('when filtr Vše is selected all data is shown', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const button = page.getByLabel('ALL');
  await button.click();

  const cardItems = page.getByLabel('Card item');
  for (const cardItem of await cardItems.all()) {
    await expect(cardItem.locator('div')).toHaveClass(/cardItemValue/);
  }
});
