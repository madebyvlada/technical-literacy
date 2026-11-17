# «Можно» · учебный прототип

Основа из шаблона курса: https://github.com/arzghost/technical_literacy. На / показан первый блок «Счетов» с четырьмя учебными кармашками из lib/demo-pockets.ts. На /design-system находятся образцы перенесённой части ДС. Данные не сохраняются в базе, настоящие счета, авторизация и LLM пока не подключены. Для запуска ключи не нужны.

## Первые пять минут
Нужны Node 24.x, npm и Git. Склонируйте https://github.com/madebyvlada/technical-literacy.git, перейдите в папку репозитория:

```text
npm ci
npm run dev
```

Откройте адрес из терминала (обычно http://localhost:3000). PowerShell: при блокировке npm.ps1 используйте npm.cmd. Для Git откройте второй терминал. Главная страница называется «Счета». Учебная ручная правка Владой отдельно пока не выполнена; работу агента не считаем ручной работой пользователя.

## Проверки
```text
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

CI запускает эти же проверки на push/PR. E2E поднимает свой сервер на 3100. Перед запуском остановите npm run dev этого проекта через Ctrl+C: Next не допускает два dev-процесса для одной папки. После тестов снова запустите npm run dev. Smoke-тест — пример инструмента, не закрывает будущий сценарий КТ-4.

## Карта
- app/page.tsx — Счета и список данных; lib/demo-pockets.ts — учебные кармашки; components/pocket-card.tsx — их общий компонент.
- app/api/health/route.ts — серверный маршрут для Network.

- components/course-card.tsx — компонент с props для МЗ-2, не button.tsx.
- components/ui/button.tsx — локальная адаптация shadcn/ui на Radix с asChild.
- app/globals.css — токены Tailwind 4 через @theme.
- PRODUCT.md, CLAUDE.md, DESIGN.md, DECISIONS.md — заполнить под свой продукт.
- tests/unit и tests/e2e, .github/workflows/ci.yml — работающие примеры проверок.
- docs и supabase/migrations — заготовки следующей работы.

Не коммитить реальные .env, ключи и тестовые пароли. .env.example содержит только имена. Публикация репозитория на GitHub не заменяет деплой на Vercel. Баллы и сроки — по выданному силлабусу.

[Карта пяти пар](docs/course-map.md) · [Результат проверки исходной заготовки](docs/verification.md).

## Проверка 17 ноября 2026

macOS arm64, встроенный Node 24.22.3 и локальный npm 11.6.2 в родительской папке учебных материалов. npm ci, typecheck, Vitest 1/1, build и Chromium e2e 3/3 успешны. Эти локальные изменения пока не отправлены на GitHub; репозиторий по ссылке может содержать только заготовку. Полная проверка свежей копии после отправки ещё впереди.
