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
  { id: "vacation", name: "Ошибка", amountRubles: 6000, meta: "под 13%, пока ждёт" },
];
