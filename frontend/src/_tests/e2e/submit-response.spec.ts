import { test, expect } from "@playwright/test";

test("user is able to create a session and submit his response", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Get Started!" }).click();
	await page.getByRole("button", { name: "Create a Session" }).click();
	await page.getByRole("button", { name: "Submit" }).click();
	await page.getByRole("button", { name: "Start!" }).click();
	await page
		.locator("div")
		.filter({ hasText: /^Mediterranean$/ })
		.click();
	await page.getByRole("button", { name: "Next Question" }).click();
	await page
		.locator("div")
		.filter({ hasText: /^\$\$\$\$ - Fine dining$/ })
		.click();
	await page.getByRole("button", { name: "Next Question" }).click();
	await page
		.locator("div")
		.filter({ hasText: /^I'll go anywhere good!$/ })
		.click();
	await page.getByRole("button", { name: "Next Question" }).click();
	await page
		.locator("div")
		.filter({ hasText: /^A cozy dinner to wind down$/ })
		.click();
	await page.getByRole("button", { name: "Next Question" }).click();
	await page
		.locator("div")
		.filter({ hasText: /^A sports bar to catch the game$/ })
		.click();
	await page.getByRole("button", { name: "Next Question" }).click();
	await page
		.locator("div")
		.filter({ hasText: /^Good enough \(3\+ stars\)$/ })
		.click();
	await page.getByRole("button", { name: "Next Question" }).click();
	await page
		.locator("div")
		.filter({ hasText: /^Coffee & specialty drinks$/ })
		.click();
	await page.getByRole("button", { name: "Submit" }).click();

	await expect(
		page.getByRole("heading", { name: "Responses pending!" }),
	).toBeVisible();
});
