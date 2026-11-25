import { test, expect } from "@playwright/test";

for (const width of [320, 360, 393]) {
  test(`кармашки одинаковой высоты и текст помещается при ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 852 });
    await page.goto("/");
    const cards = page.locator('[data-component="pocket-card"]:visible');
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

    const firstPageHeight = (await cards.first().boundingBox())!.height;
    const carouselHeight = (await page.locator(".pocket-carousel__pages").boundingBox())!.height;
    await page.getByRole("button", { name: "Страница 2" }).click();
    await expect(cards).toHaveCount(3);
    const pageTwoHeights = await cards.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().height)
    );
    for (const height of pageTwoHeights) expect(Math.abs(height - firstPageHeight)).toBeLessThan(1);
    expect((await page.locator(".pocket-carousel__pages").boundingBox())!.height).toBe(carouselHeight);
  });
}
