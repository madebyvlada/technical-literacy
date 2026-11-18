import { PocketCard } from "@/components/pocket-card";
import { demoPockets } from "@/lib/demo-pockets";

const rubles = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export default function AccountsPage() {
  return (
    <main className="accounts-page">
      <header className="accounts-page__header">
        <p className="type-caption accounts-page__note">Можно · учебный прототип</p>
        <h1 className="type-title-l">Мои счета</h1>
      </header>
      <section className="accounts-pockets" aria-labelledby="pockets-heading">
        <h2 id="pockets-heading" className="type-title-s">Кармашки · {demoPockets.length}</h2>
        <ul className="accounts-pockets__grid" role="list">
          {demoPockets.map((pocket) => (
            <li key={pocket.id}>
              <PocketCard
                name={pocket.name}
                amount={`${rubles.format(pocket.amountRubles)} ₽`}
                meta={pocket.meta}
              />
            </li>
          ))}
        </ul>
      </section>
      <p className="type-caption accounts-page__note">Суммы и даты из макета. Настоящие счета не подключены.</p>
    </main>
  );
}
