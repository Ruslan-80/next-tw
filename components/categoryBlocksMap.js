import dynamic from "next/dynamic";

// Ленивый импорт (подгрузится только когда нужно)
const UstrojstvaEtazhnye = dynamic(() =>
  import("./shared/UstrojstvaEtazhnye").then((mod) => mod.UstrojstvaEtazhnye)
);
const TitleHead = dynamic(() =>
  import("./shared/UstrojstvaEtazhnye").then((mod) => mod.TitleHead)
);

const ShityEtazhnyeBottom = dynamic(() =>
  import("./shared/shity-etazhnye-she").then((mod) => mod.ShityEtazhnyeBottom)
);
const ShityEtazhnyeTop = dynamic(() =>
  import("./shared/shity-etazhnye-she").then((mod) => mod.ShityEtazhnyeTop)
);

// Добавляешь сюда другие категории по мере необходимости
const categoryComponents = {
  "schity-etazhnye-i-ustroystva-podezdnye": {
    top: TitleHead,
    bottom: UstrojstvaEtazhnye,
  },
  "shity-etazhnye-she": {
    top: ShityEtazhnyeTop,
    bottom: ShityEtazhnyeBottom,
  },
  // "drugoi-slug": { top: AnotherComponent, bottom: AnotherBottom },
};

export default categoryComponents;
