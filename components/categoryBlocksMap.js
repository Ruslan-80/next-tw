import dynamic from "next/dynamic";

const UstrojstvaEtazhnyepodeznyeTop = dynamic(() =>
  import("./shared/UstrojstvaEtazhnyepodeznye").then(
    (mod) => mod.UstrojstvaEtazhnyepodeznyeTop
  )
);
const UstrojstvaEtazhnyepodeznyeBottom = dynamic(() =>
  import("./shared/UstrojstvaEtazhnyepodeznye").then(
    (mod) => mod.UstrojstvaEtazhnyepodeznyeBottom
  )
);

const ShityEtazhnyeTop = dynamic(() =>
  import("./shared/shity-etazhnye-she").then((mod) => mod.ShityEtazhnyeTop)
);
const ShityEtazhnyeBottom = dynamic(() =>
  import("./shared/shity-etazhnye-she").then((mod) => mod.ShityEtazhnyeBottom)
);
const UstroystvaEtazhnyeTop = dynamic(() =>
  import("./shared/ustroystva-etazhnye").then(
    (mod) => mod.UstroystvaEtazhnyeTop
  )
);
const UstroystvaEtazhnyeBottom = dynamic(() =>
  import("./shared/ustroystva-etazhnye").then(
    (mod) => mod.UstroystvaEtazhnyeBottom
  )
);
const uervTop = dynamic(() =>
  import("./shared/uerv").then((mod) => mod.uervTop)
);
const uervBottom = dynamic(() =>
  import("./shared/uerv").then((mod) => mod.uervBottom)
);
const KozhukhTop = dynamic(() =>
  import("./shared/kozhuh-she-dlya-etazhnogo-shita").then(
    (mod) => mod.KozhukhTop
  )
);
const KozhukhBottom = dynamic(() =>
  import("./shared/kozhuh-she-dlya-etazhnogo-shita").then(
    (mod) => mod.KozhukhBottom
  )
);

const categoryComponents = {
  "schity-etazhnye-i-ustroystva-podezdnye": {
    top: UstrojstvaEtazhnyepodeznyeTop,
    bottom: UstrojstvaEtazhnyepodeznyeBottom,
  },
  "shity-etazhnye-she": {
    top: ShityEtazhnyeTop,
    bottom: ShityEtazhnyeBottom,
  },
  "ustroystva-etazhnye": {
    top: UstroystvaEtazhnyeTop,
    bottom: UstroystvaEtazhnyeBottom,
  },
  uerv: {
    top: uervTop,
    bottom: uervBottom,
  },
  "kozhuh-she-dlya-etazhnogo-shita": {
    top: KozhukhTop,
    bottom: KozhukhBottom,
  },
};

export default categoryComponents;
