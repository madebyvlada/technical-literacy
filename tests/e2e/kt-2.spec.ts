import { test, expect } from "@playwright/test";

const scenarios = [
  ["accounts", "/", "Кармашки · 7"],
  ["accounts-loading", "/?state=loading", "Загружаем счета"],
  ["accounts-empty", "/?state=empty", "Кармашков пока нет"],
  ["accounts-error", "/?state=error", "Не удалось загрузить счета"],
  ["pocket", "/pockets/food", "Еда"],
  ["pocket-loading", "/pockets/food?state=loading", "Загружаем кармашек"],
  ["pocket-empty", "/pockets/food?state=empty", "Кармашек не найден"],
  ["pocket-error", "/pockets/food?state=error", "Не удалось загрузить кармашек"],
] as const;

for (const width of [375, 768, 1440]) {
  test(`экраны КТ-2 и состояния помещаются при ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const [id, url, heading] of scenarios) {
      await page.goto(url);
      await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
      await expect.poll(() => page.locator("main img").evaluateAll((icons) =>
        icons.every((icon) => icon instanceof HTMLImageElement && icon.complete && icon.naturalWidth > 0)
      )).toBe(true);
      if (process.env.KT2_SCREENSHOTS) {
        await page.screenshot({ path: `${process.env.KT2_SCREENSHOTS}/${width}-${id}.png`, fullPage: true });
      }
    }
  });
}

test("переход в кармашек, возврат, отсутствующий кармашек и повтор после ошибки", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("region", { name: "Баланс" })).toContainText("63 190");
  await page.getByRole("button", { name: "Страница 2" }).click();
  await page.getByRole("link", { name: /Еда/ }).press("Enter");
  await expect(page.getByRole("heading", { name: "Еда", exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: "Баланс" })).toContainText("7 300 ₽");
  await expect(page.getByRole("button", { name: "Пополнить" })).toBeDisabled();
  await page.getByRole("link", { name: "Назад к счетам" }).click();
  await expect(page.getByRole("heading", { name: "Счета", exact: true })).toBeVisible();

  await page.goto("/pockets/unknown");
  await expect(page.getByRole("heading", { name: "Кармашек не найден" })).toBeVisible();

  for (const url of ["/", "/pockets/food"]) {
    await page.goto(`${url}?state=error`);
    await page.getByRole("link", { name: "Повторить" }).press("Enter");
    await expect.poll(() => new URL(page.url()).pathname + new URL(page.url()).search).toBe(url);
    await expect(page.getByRole("link", { name: "Повторить" })).toHaveCount(0);
  }
});

test("нижняя панель оставляет последние списания видимыми после прокрутки", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const lastCharge = await page.getByRole("region", { name: "Скоро спишется" }).getByRole("listitem").last().boundingBox();
  const navigation = await page.getByRole("navigation").boundingBox();
  expect(lastCharge!.y + lastCharge!.height).toBeLessThanOrEqual(navigation!.y);
});
