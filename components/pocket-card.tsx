import { cn } from "@/lib/utils";

type PocketCardProps = {
  amount: string;
  name: string;
  meta?: string;
  className?: string;
};

/** Figma PocketCard 938:3682. Display-only until an action is explicitly added. */
export function PocketCard({ amount, name, meta, className }: PocketCardProps) {
  return (
    <div className={cn("pocket-card", className)} data-component="pocket-card">
      <p className="type-title-m">{amount}</p>
      <p className="type-label-l">{name}</p>
      {meta ? <p className="type-caption pocket-card__meta">{meta}</p> : null}
    </div>
  );
}
