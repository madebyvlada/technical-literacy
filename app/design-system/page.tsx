import { PocketCard } from "@/components/pocket-card";

const colors = [
  { label: "Фон приложения", value: "#F3F3F4", name: "app" },
  { label: "Поверхность", value: "#FFFFFF", name: "surface" },
  { label: "Основной текст", value: "#111111", name: "text" },
  { label: "Вторичный текст", value: "#6E6E73", name: "secondary" },
];

export default function DesignSystemPage() {
  return (
    <main className="ds-preview">
      <header className="ds-preview__header">
        <p className="type-caption ds-preview__note">Можно · дизайн-система</p>
        <h1 className="type-title-l">Основа «Можно»</h1>
        <p className="type-body-m ds-preview__note">Первые стили и карточка кармашка из твоей Figma.</p>
        <a className="type-caption ds-preview__link" href="https://www.figma.com/design/cpfQkvSnkrRnbJ2SOYXLoE?node-id=938-3682">Открыть исходный компонент в Figma</a>
      </header>
      <section className="ds-preview__section" aria-labelledby="palette-heading">
        <h2 id="palette-heading" className="type-title-m">Палитра</h2>
        <div className="ds-palette">{colors.map((color) => (
          <div key={color.name} className="ds-swatch">
            <div aria-hidden="true" className={`ds-swatch__color ds-swatch__color--${color.name}`} />
            <p className="type-label-l">{color.label}</p>
            <p className="type-caption ds-preview__note">{color.value}</p>
          </div>
        ))}</div>
      </section>
      <section className="ds-preview__section" aria-labelledby="type-heading">
        <h2 id="type-heading" className="type-title-m">Типографика · Manrope</h2>
        <div className="ds-type-samples">
          <p className="type-title-l">Счета</p>
          <p className="type-title-m">18 000 ₽</p>
          <p className="type-label-l">Свободно</p>
          <p className="type-body-m">Деньги на то, что важно тебе</p>
          <p className="type-caption ds-preview__note">Подпись · 13 px</p>
        </div>
      </section>
      <section className="ds-preview__section" aria-labelledby="card-heading">
        <h2 id="card-heading" className="type-title-m">Карточка кармашка</h2>
        <p className="type-caption ds-preview__note">Исходный размер · 172 px</p>
        <div className="ds-pocket-reference">
          <PocketCard amount="18 000 ₽" name="Свободно" meta="сегодня ~1 200" />
        </div>
      </section>
      <section className="ds-preview__section" aria-labelledby="content-heading">
        <h2 id="content-heading" className="type-title-m">Разное содержимое</h2>
        <p className="type-caption ds-preview__note">Проверяем длинное название и карточку без подписи. Суммы учебные.</p>
        <div className="ds-pocket-grid">
          <PocketCard amount="25 000 ₽" name="На большую поездку к морю" meta="Подпись переносится вместе с содержимым" />
          <PocketCard amount="6 000 ₽" name="Отпуск" />
        </div>
      </section>
    </main>
  );
}
