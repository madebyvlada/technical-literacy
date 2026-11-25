/** Учебные данные из макета «Счета» 941:5801, не реальные счета. */
export type DemoPocket = {
  id: string;
  name: string;
  amountRubles: number;
  meta: string;
};

export const demoPockets: readonly DemoPocket[] = [
  { id: "free", name: "Свободно", amountRubles: 18000, meta: "сегодня ~1 200" },
  { id: "personal", name: "На себя", amountRubles: 2000, meta: "до 1-го" },
  { id: "rent", name: "Аренда", amountRubles: 25000, meta: "под 13% до 1 ноября" },
  { id: "vacation", name: "Отпуск", amountRubles: 6000, meta: "под 13%, пока ждёт" },
  { id: "food", name: "Еда", amountRubles: 7300, meta: "До 1 ноября" },
  { id: "gifts", name: "Подарки", amountRubles: 3600, meta: "к 20 декабря" },
  { id: "subscriptions", name: "Подписки", amountRubles: 1290, meta: "спишутся 5-го" },
];

const rubles = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export function formatRubles(amount: number) {
  return `${rubles.format(amount)} ₽`;
}
