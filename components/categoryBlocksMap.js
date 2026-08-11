import dynamic from "next/dynamic";

const UstrojstvaEtazhnyepodeznyeTop = dynamic(() =>
  import("./shared/UstrojstvaEtazhnyepodeznye").then(
    (mod) => mod.UstrojstvaEtazhnyepodeznyeTop,
  ),
);
const UstrojstvaEtazhnyepodeznyeBottom = dynamic(() =>
  import("./shared/UstrojstvaEtazhnyepodeznye").then(
    (mod) => mod.UstrojstvaEtazhnyepodeznyeBottom,
  ),
);

const ShityEtazhnyeTop = dynamic(() =>
  import("./shared/ShityEtazhnyeShe").then((mod) => mod.ShityEtazhnyeTop),
);
const ShityEtazhnyeBottom = dynamic(() =>
  import("./shared/ShityEtazhnyeShe").then((mod) => mod.ShityEtazhnyeBottom),
);
const NakladkyEtazhnyeTop = dynamic(() =>
  import("./shared/NakladkyEtazgnyeSen").then((mod) => mod.NakladkyEtazhnyeTop),
);
const NakladkyEtazhnyeBottom = dynamic(() =>
  import("./shared/NakladkyEtazgnyeSen").then(
    (mod) => mod.NakladkyEtazhnyeBottom,
  ),
);
const UstroystvaEtazhnyeTop = dynamic(() =>
  import("./shared/ustroystva-etazhnye").then(
    (mod) => mod.UstroystvaEtazhnyeTop,
  ),
);
const UstroystvaEtazhnyeBottom = dynamic(() =>
  import("./shared/ustroystva-etazhnye").then(
    (mod) => mod.UstroystvaEtazhnyeBottom,
  ),
);
const vru1Top = dynamic(() =>
  import("./shared/vru-1").then((mod) => mod.vru1Top),
);
const vru1Bottom = dynamic(() =>
  import("./shared/vru-1").then((mod) => mod.vru1Bottom),
);
const vruTop = dynamic(() => import("./shared/vru").then((mod) => mod.vruTop));
const vruBottom = dynamic(() =>
  import("./shared/vru").then((mod) => mod.vruBottom),
);
const uervTop = dynamic(() =>
  import("./shared/uerv").then((mod) => mod.uervTop),
);
const uervBottom = dynamic(() =>
  import("./shared/uerv").then((mod) => mod.uervBottom),
);
const uermTop = dynamic(() =>
  import("./shared/uerm").then((mod) => mod.uermTop),
);
const uermBottom = dynamic(() =>
  import("./shared/uerm").then((mod) => mod.uermBottom),
);
const KozhukhTop = dynamic(() =>
  import("./shared/kozhuh-she-dlya-etazhnogo-shita").then(
    (mod) => mod.KozhukhTop,
  ),
);
const KozhukhBottom = dynamic(() =>
  import("./shared/kozhuh-she-dlya-etazhnogo-shita").then(
    (mod) => mod.KozhukhBottom,
  ),
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
  "vvodno-raspredelitelnye-ustrojstva-vru": {
    top: vruTop,
    bottom: vruBottom,
  },
  "vru-1": {
    top: vru1Top,
    bottom: vru1Bottom,
  },
  "nakladki-shitov-etazhnyh-she": {
    top: NakladkyEtazhnyeTop,
    bottom: NakladkyEtazhnyeBottom,
  },
  "ustroystva-etazhnye": {
    top: UstroystvaEtazhnyeTop,
    bottom: UstroystvaEtazhnyeBottom,
  },
  uerv: {
    top: uervTop,
    bottom: uervBottom,
  },
  uerm: {
    top: uermTop,
    bottom: uermBottom,
  },
  "kozhuh-she-dlya-etazhnogo-shita": {
    top: KozhukhTop,
    bottom: KozhukhBottom,
  },
};

export default categoryComponents;
