import Link from "next/link";
import { DemoStateView, getDemoState } from "@/components/demo-state";
import { demoPockets, formatRubles } from "@/lib/demo-pockets";

const pocketStates = {
  loading: "Загружаем кармашек",
  empty: "Кармашек не найден",
  error: "Не удалось загрузить кармашек",
};

export default async function PocketPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ state?: string | string[] }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const pocket = demoPockets.find((entry) => entry.id === id);
  const state = getDemoState(query.state);

  return (
    <main className="accounts-page pocket-details">
      <div className="pocket-details__toolbar">
        <Link className="pocket-details__icon-button" href="/" aria-label="Назад к счетам">
          <img src="/accounts/back.svg" alt="" />
        </Link>
        {!state && pocket && (
          <button className="pocket-details__icon-button" type="button" aria-label="Настройки" disabled>
            <img src="/accounts/settings.svg" alt="" />
          </button>
        )}
      </div>
      {state || !pocket ? (
        <>
          <h1 className="type-title-l">Кармашек</h1>
          <DemoStateView state={state ?? "empty"} subject={pocketStates} retryHref={`/pockets/${encodeURIComponent(id)}`} />
        </>
      ) : (
        <>
          <header className="pocket-details__heading">
            <h1 className="type-title-l">{pocket.name}</h1>
            <img src={`/accounts/${pocket.id}.svg`} alt="" />
          </header>
          <section className="product-panel pocket-details__balance" aria-label="Баланс">
            <p className="type-caption accounts-page__note">В кармашке</p>
            <p className="pocket-details__amount">{formatRubles(pocket.amountRubles)}</p>
          </section>
          <div className="pocket-details__actions">
            <button className="product-button product-button--primary" type="button" disabled>Пополнить</button>
            <button className="product-button product-button--on-app" type="button" disabled>Переложить</button>
          </div>
          <section className="product-panel pocket-details__plan">
            <span className="accounts-schedule__icon"><img src="/accounts/plan.svg" alt="" /></span>
            <div><h2 className="type-title-s">{id === "food" ? "План на продукты" : "План"}</h2><p className="type-caption accounts-page__note">{pocket.meta}</p></div>
          </section>
          <section className="pocket-details__operations">
            <h2 className="type-title-s">История</h2>
            {id === "food" ? (
              <div className="product-panel pocket-details__history-row">
                <span className="accounts-schedule__icon"><img src="/accounts/history-purchase.svg" alt="" /></span>
                <div><p className="type-title-s">Пятёрочка</p><p className="type-caption accounts-page__note">Вчера · Продукты</p></div>
                <span className="type-label-l">−640 ₽</span>
              </div>
            ) : <p className="accounts-page__note">Пополнения и списания появятся здесь.</p>}
          </section>
        </>
      )}
    </main>
  );
}
