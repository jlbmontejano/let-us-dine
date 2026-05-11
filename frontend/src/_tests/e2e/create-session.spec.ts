import { test, expect } from "@playwright/test";

test("user can create a session", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Get Started!" }).click();
	await page.goto("/setup");
	await page.getByRole("button", { name: "Create a Session" }).click();
	await page.getByRole("button", { name: "Submit" }).click();

	await expect(
		page
			.locator("li[role='status']")
			.filter({ hasText: "Session created successfully." }),
	).toBeVisible();
	await expect(page.getByRole("button", { name: "Start!" })).toBeVisible();
});
