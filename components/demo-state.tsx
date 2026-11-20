import Link from "next/link";

type DemoState = "loading" | "empty" | "error";

type DemoStateProps = {
  state: DemoState;
  subject: { loading: string; empty: string; error: string };
  retryHref: string;
};

export function getDemoState(state: string | string[] | undefined) {
  if (state === "loading" || state === "empty" || state === "error") return state;
}

export function DemoStateView({ state, subject, retryHref }: DemoStateProps) {
  return (
    <section className="product-panel demo-state" role={state === "loading" ? "status" : undefined}>
      <h2 className="type-title-s">{subject[state]}</h2>
      {state === "loading" && <div className="demo-state__placeholder" aria-hidden="true" />}
      {state === "error" && <Link className="product-button" href={retryHref}>Повторить</Link>}
    </section>
  );
}
