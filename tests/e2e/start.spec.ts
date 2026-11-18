import { test, expect } from "@playwright/test";

test("четыре учебных кармашка доступны без входа и ключей", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Мои счета", exact: true })).toBeVisible();
  const pockets = page.getByRole("region", { name: "Кармашки · 4", exact: true });
  const cards = pockets.getByRole("listitem");
  await expect(cards).toHaveCount(4);
  // Independent expected examples catch wrong amounts or mismatched names.
  const expected = [
    { name: "Свободно", amount: "18 000 ₽" },
    { name: "На себя", amount: "2 000 ₽" },
    { name: "Аренда", amount: "25 000 ₽" },
    { name: "Отпуск", amount: "6 000 ₽" },
  ];
  for (const pocket of expected) {
    const card = cards.filter({ has: page.getByText(pocket.name, { exact: true }) });
    await expect(card.getByText(pocket.amount, { exact: true })).toBeVisible();
  }
});

test("серверный маршрут по-прежнему отвечает без ключей", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toMatchObject({ ok: true, layer: "server" });
});

test("кармашки читаются на узком экране без горизонтального переполнения", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  await expect(page.getByRole("listitem")).toHaveCount(4);
  await expect(page.getByText("25 000 ₽", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
});
