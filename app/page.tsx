import Link from "next/link";
import { DemoStateView, getDemoState } from "@/components/demo-state";
import { PocketCarousel } from "@/components/pocket-carousel";
import { demoPockets, formatRubles } from "@/lib/demo-pockets";

const actions = [
  ["Оплатить", "pay"], ["QR", "qr"], ["Перевести", "send"], ["Добавить", "add"],
] as const;

const tabs = [
  ["Счета", "accounts"], ["Платежи", "payments"], ["Кэи", "kei"],
  ["История", "history"], ["Ещё", "more"],
] as const;

const [free, , rent, , , , subscriptions] = demoPockets;

const scheduled = [
  { name: "Подписки", icon: "music", meta: "5-го · музыка, кино, облако", pocket: subscriptions },
  { name: "Аренда", icon: "house", meta: "1 ноября · уже отложена", pocket: rent },
];

const numberFormat = new Intl.NumberFormat("ru-RU");

const accountsStates = {
  loading: "Загружаем счета",
  empty: "Кармашков пока нет",
  error: "Не удалось загрузить счета",
};

function AccountsNavigation() {
  return (
    <nav className="accounts-nav" aria-label="Основная навигация">
      {tabs.map(([name, icon]) => icon === "accounts" ? (
        <Link key={icon} href="/" aria-label={name} aria-current="page">
          <img src="/accounts/accounts.svg" alt="" />
        </Link>
      ) : (
        <button key={icon} type="button" aria-label={name} disabled>
          <img src={`/accounts/${icon}.svg`} alt="" />
          {icon === "kei" && <span>Кэи</span>}
        </button>
      ))}
    </nav>
  );
}

export default async function AccountsPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string | string[] }>;
}) {
  const state = getDemoState((await searchParams).state);
  const total = state === "empty" ? 0 : demoPockets.reduce((sum, pocket) => sum + pocket.amountRubles, 0);

  return (
    <main className="accounts-page">
      <h1 className="type-title-l">Счета</h1>
      {(!state || state === "empty") && (
        <section className="product-panel accounts-balance" aria-label="Баланс">
          <p className="type-caption accounts-page__note">Всего на счетах</p>
          <p className="type-display-amount">{numberFormat.format(total)} <span className="type-display-currency">₽</span></p>
          {!state && <p className="type-caption accounts-page__note">Карта •• 4417 · свободно {numberFormat.format(free.amountRubles)}, <span className="accounts-balance__estimate">{free.meta} ₽</span></p>}
        </section>
      )}
      {state ? <DemoStateView state={state} subject={accountsStates} retryHref="/" /> : (
        <>
          <div className="accounts-actions" aria-label="Быстрые действия">
            {actions.map(([name, icon]) => (
              <button key={icon} type="button" disabled>
                <span><img src={`/accounts/${icon}.svg`} alt="" /></span>{name}
              </button>
            ))}
          </div>
          <section className="accounts-pockets" aria-labelledby="pockets-heading">
            <header className="accounts-section-header">
              <h2 id="pockets-heading" className="type-title-s">Кармашки · {demoPockets.length}</h2>
              <button type="button" disabled>Новый <img src="/accounts/section-chevron.svg" alt="" /></button>
            </header>
            <PocketCarousel pockets={demoPockets} />
          </section>
          <section className="accounts-pockets" aria-labelledby="scheduled-heading">
            <header className="accounts-section-header">
              <h2 id="scheduled-heading" className="type-title-s">Скоро спишется</h2>
              <button type="button" disabled>Календарь <img src="/accounts/section-chevron.svg" alt="" /></button>
            </header>
            <ul className="product-panel accounts-schedule">
              {scheduled.map((item) => (
                <li key={item.icon}>
                  <span className="accounts-schedule__icon"><img src={`/accounts/${item.icon}.svg`} alt="" /></span>
                  <div><p className="type-label-l">{item.name}</p><p className="type-caption accounts-page__note">{item.meta}</p></div>
                  <span className="type-label-l">{formatRubles(item.pocket.amountRubles)}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
      <AccountsNavigation />
    </main>
  );
}
