import { test, expect } from "@playwright/test";

for (const width of [320, 360, 393]) {
  test(`кармашки одинаковой высоты и текст помещается при ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 852 });
    await page.goto("/");
    const cards = page.locator('[data-component="pocket-card"]');
    await expect(cards).toHaveCount(4);
    await page.evaluate(() => document.fonts.ready);

    // Compare actual card surfaces, not their list wrappers.
    await expect.poll(async () => cards.evaluateAll((elements) => {
      const heights = elements.map((element) => element.getBoundingClientRect().height);
      return Math.max(...heights) - Math.min(...heights);
    })).toBeLessThan(1);

    const contentFits = await cards.evaluateAll((elements) => elements.every((element) => {
      const card = element.getBoundingClientRect();
      return element.clientHeight >= element.scrollHeight &&
        Array.from(element.querySelectorAll("p")).every((text) => {
          const bounds = text.getBoundingClientRect();
          return bounds.top >= card.top && bounds.bottom <= card.bottom &&
            bounds.left >= card.left && bounds.right <= card.right &&
            text.scrollWidth <= text.clientWidth;
        });
    }));
    expect(contentFits).toBeTruthy();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    await expect(page.getByText("под 13% до 1 ноября", { exact: true })).toBeVisible();
  });
}
