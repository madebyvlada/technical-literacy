"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { PocketCard } from "@/components/pocket-card";
import { type DemoPocket, formatRubles } from "@/lib/demo-pockets";

export function PocketCarousel({ pockets }: { pockets: readonly DemoPocket[] }) {
  const pages = [pockets.slice(0, 4), pockets.slice(4)];
  const [index, setIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      className="pocket-carousel"
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchCancel={() => { touchStart.current = null; }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - start.x;
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(touch.clientY - start.y)) {
          setIndex(deltaX > 0 ? 0 : 1);
        }
      }}
    >
      <ul className="accounts-pockets__grid" role="list" aria-label={`Страница кармашков ${index + 1} из 2`}>
        {pages[index].map((pocket) => (
          <li key={pocket.id}>
            <Link className="pocket-link" href={`/pockets/${pocket.id}`}>
              <PocketCard
                name={pocket.name}
                amount={formatRubles(pocket.amountRubles)}
                meta={pocket.meta}
                icon={`/accounts/${pocket.id}.svg`}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className="pocket-carousel__controls" role="group" aria-label="Страницы кармашков">
        {pages.map((_, pageIndex) => (
          <button
            key={pageIndex}
            type="button"
            aria-label={`Страница ${pageIndex + 1}`}
            aria-pressed={index === pageIndex}
            onClick={() => setIndex(pageIndex)}
          />
        ))}
      </div>
    </div>
  );
}
