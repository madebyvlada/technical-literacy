# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: start.spec.ts >> четыре учебных кармашка доступны без входа и ключей
- Location: tests/e2e/start.spec.ts:3:1

# Error details

```
Test timeout of 5000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('region', { name: 'Кармашки · 4', exact: true }).getByRole('listitem').filter({ has: getByText('Отпуск', { exact: true }) }).getByText('6 000 ₽', { exact: true })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('region', { name: 'Кармашки · 4', exact: true }).getByRole('listitem').filter({ has: getByText('Отпуск', { exact: true }) }).getByText('6 000 ₽', { exact: true }) with timeout 5000ms
  - waiting for getByRole('region', { name: 'Кармашки · 4', exact: true }).getByRole('listitem').filter({ has: getByText('Отпуск', { exact: true }) }).getByText('6 000 ₽', { exact: true })
  - Test timeout of 5000ms exceeded.

```

```yaml
- main:
  - paragraph: Можно · учебный прототип
  - heading "Счета" [level=1]
  - region "Кармашки · 4":
    - heading "Кармашки · 4" [level=2]
    - list:
      - listitem:
        - paragraph: 18 000 ₽
        - paragraph: Свободно
        - paragraph: сегодня ~1 200
      - listitem:
        - paragraph: 2 000 ₽
        - paragraph: На себя
        - paragraph: до 1-го
      - listitem:
        - paragraph: 25 000 ₽
        - paragraph: Аренда
        - paragraph: под 13% до 1 ноября
      - listitem:
        - paragraph: 6 000 ₽
        - paragraph: Ошибка
        - paragraph: под 13%, пока ждёт
  - paragraph: Суммы и даты из макета. Настоящие счета не подключены.
- alert
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("четыре учебных кармашка доступны без входа и ключей", async ({ page }) => {
  4  |   await page.goto("/");
  5  |   await expect(page.getByRole("heading", { name: "Счета", exact: true })).toBeVisible();
  6  |   const pockets = page.getByRole("region", { name: "Кармашки · 4", exact: true });
  7  |   const cards = pockets.getByRole("listitem");
  8  |   await expect(cards).toHaveCount(4);
  9  |   // Independent expected examples catch wrong amounts or mismatched names.
  10 |   const expected = [
  11 |     { name: "Свободно", amount: "18 000 ₽" },
  12 |     { name: "На себя", amount: "2 000 ₽" },
  13 |     { name: "Аренда", amount: "25 000 ₽" },
  14 |     { name: "Отпуск", amount: "6 000 ₽" },
  15 |   ];
  16 |   for (const pocket of expected) {
  17 |     const card = cards.filter({ has: page.getByText(pocket.name, { exact: true }) });
> 18 |     await expect(card.getByText(pocket.amount, { exact: true })).toBeVisible();
     |                                                                  ^ Error: expect(locator).toBeVisible() failed
  19 |   }
  20 | });
  21 | 
  22 | test("серверный маршрут по-прежнему отвечает без ключей", async ({ request }) => {
  23 |   const response = await request.get("/api/health");
  24 |   expect(response.ok()).toBeTruthy();
  25 |   expect(await response.json()).toMatchObject({ ok: true, layer: "server" });
  26 | });
  27 | 
  28 | test("кармашки читаются на узком экране без горизонтального переполнения", async ({ page }) => {
  29 |   await page.setViewportSize({ width: 320, height: 700 });
  30 |   await page.goto("/");
  31 |   await expect(page.getByRole("listitem")).toHaveCount(4);
  32 |   await expect(page.getByText("25 000 ₽", { exact: true })).toBeVisible();
  33 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  34 | });
  35 | 
```