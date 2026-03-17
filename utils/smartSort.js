export default function smartSort(a, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  // 1. Чисто числовые значения
  if (
    !isNaN(numA) &&
    !isNaN(numB) &&
    /^\d+(\.\d+)?$/.test(a) &&
    /^\d+(\.\d+)?$/.test(b)
  ) {
    return numA - numB;
  }

  // 2. IP значения (IP31, IP65)
  if (a.startsWith("IP") && b.startsWith("IP")) {
    return parseInt(a.replace("IP", "")) - parseInt(b.replace("IP", ""));
  }

  // 3. Буквы + число (УХЛ1)
  const mixedA = a.match(/\d+/);
  const mixedB = b.match(/\d+/);
  if (mixedA && mixedB) {
    return parseInt(mixedA[0]) - parseInt(mixedB[0]);
  }

  // 4. Дроби 380/220
  if (a.includes("/") && b.includes("/")) {
    return parseInt(a.split("/")[0]) - parseInt(b.split("/")[0]);
  }

  // 5. Обычный текст
  return a.localeCompare(b, "ru");
}
