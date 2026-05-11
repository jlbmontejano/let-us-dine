import { test, expect } from "@playwright/test";

test("user can navigate to setup and back home", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Get Started!" }).click();

	await expect(
		page.getByRole("heading", { name: "Session Setup" }),
	).toBeVisible();

	await page.getByRole("button", { name: "Back" }).click();

	expect(
		page.getByRole("heading", { name: "Welcome to Let Us Dine!" }),
	).toBeVisible();
});
