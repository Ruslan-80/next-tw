// ─── Расчёт спецификации (чистые функции, вынесены из configurator.jsx) ──────

// Преобразование массива элементов щита в строки спецификации
export function toSpec(items) {
  return items
    .filter((i) => i.product)
    .map((i) => ({
      label: i.label || "",
      name: i.product.header,
      articul: i.product.articul,
      qty: i.qty || 1,
      price: i.product.price,
      total: (i.qty || 1) * i.product.price,
      stock: i.product.stock_total,
    }));
}

// Итог по разделу
export function secTotal(items) {
  return items.reduce((acc, i) => acc + i.total, 0);
}

// Общий итог по всем разделам
export function grandTotal(sections) {
  return sections.reduce((acc, items) => acc + secTotal(items), 0);
}

// Сумма номиналов отходящих линий (для расчёта тока ввода)
export function totalLineCurrent(lines) {
  return lines.reduce(
    (acc, l) => acc + Number(l.params?.rating || 0) * Number(l.qty || 1),
    0,
  );
}

// ─── Формирование текста спецификации для буфера обмена ─────────────────────
export function buildSpecText(shieldName, sections) {
  const LABELS = {
    inputs: "ВВОД",
    meters: "УЧЕТ ЭЛЕКТРОЭНЕРГИИ",
    lines: "ОТХОДЯЩИЕ ЛИНИИ",
  };

  let text = `Спецификация: ${shieldName}\n${"─".repeat(60)}\n`;
  let idx = 1;

  const allSpec = [
    ...sections.inputs,
    ...sections.meters,
    ...sections.lines,
  ];

  Object.keys(LABELS).forEach((key) => {
    const items = sections[key];
    if (!items.length) return;
    text += `\n${LABELS[key]}\n`;
    items.forEach((s) => {
      text += `  ${idx++}. ${s.name} | ${s.qty} шт. | ${Math.round(s.price).toLocaleString("ru-RU")} ₽ | ${Math.round(s.total).toLocaleString("ru-RU")} ₽\n`;
    });
    text += `  Итого: ${Math.round(secTotal(items)).toLocaleString("ru-RU")} ₽\n`;
  });

  const total = grandTotal([sections.inputs, sections.meters, sections.lines]);
  text += `\n${"─".repeat(60)}\nВСЕГО: ${Math.round(total).toLocaleString("ru-RU")} ₽\n`;
  return { text, allSpec, total };
}
