import { cn } from "@/lib/utils";

type PocketCardProps = {
  amount: string;
  name: string;
  meta?: string;
  className?: string;
  icon?: string;
};

/** Figma PocketCard 938:3682. Navigation is provided by the caller. */
export function PocketCard({ amount, name, meta, className, icon }: PocketCardProps) {
  return (
    <div className={cn("pocket-card", className)} data-component="pocket-card">
      <div className="pocket-card__amount">
        <p className="type-title-m">{amount}</p>
        {icon && <img src={icon} alt="" />}
      </div>
      <p className="type-label-l">{name}</p>
      {meta ? <p className="type-caption pocket-card__meta">{meta}</p> : null}
    </div>
  );
}
