import { test, expect } from "@playwright/test";

let sessionId: string;

test.beforeAll(async ({ request }) => {
	const res = await request.post(
		"https://letusdine.jorgebuenrostro.com/api/sessions",
		{
			data: { totalParticipants: 2 },
		},
	);
	const data = await res.json();
	sessionId = data.data.uuid;
});

test("user can join a session", async ({ page }) => {
	await page.goto("/setup");
	await page.getByRole("button", { name: "Join a Session" }).click();
	await page.getByRole("textbox").fill(sessionId);
	await page.getByRole("button", { name: "Join", exact: true }).click();

	await expect(
		page.getByRole("heading", { name: "What cuisine are you craving?" }),
	).toBeVisible();
});
