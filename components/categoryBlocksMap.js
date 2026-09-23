import dynamic from "next/dynamic";

const lazyPair = (loader, topName, bottomName) => ({
  top: dynamic(() => loader().then((m) => m[topName])),
  bottom: dynamic(() => loader().then((m) => m[bottomName])),
});

const categoryComponents = {
  "schity-etazhnye-i-ustroystva-podezdnye": lazyPair(
    () => import("./shared/UstrojstvaEtazhnyepodeznye"),
    "UstrojstvaEtazhnyepodeznyeTop",
    "UstrojstvaEtazhnyepodeznyeBottom",
  ),
  "shity-etazhnye-she": lazyPair(
    () => import("./shared/ShityEtazhnyeShe"),
    "ShityEtazhnyeTop",
    "ShityEtazhnyeBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru": lazyPair(
    () => import("./shared/vru"),
    "vruTop",
    "vruBottom",
  ),
  "vru-1": lazyPair(() => import("./shared/vru-1"), "vru1Top", "vru1Bottom"),
  "vru-3": lazyPair(() => import("./shared/vru-3"), "vru3Top", "vru3Bottom"),
  "vru-4": lazyPair(() => import("./shared/vru-4"), "vru4Top", "vru4Bottom"),
  "vru-8504": lazyPair(
    () => import("./shared/vru-8504"),
    "vru8504Top",
    "vru8504Bottom",
  ),
  "vru-8505": lazyPair(
    () => import("./shared/vru-8505"),
    "vru8505Top",
    "vru8505Bottom",
  ),
  "vru-21": lazyPair(
    () => import("./shared/vru-21"),
    "vru21Top",
    "vru21Bottom",
  ),
  "vru-1-15-kvt-380v-trehfaznyj": lazyPair(
    () => import("./shared/vru-1-15-kvt-380v-trehfaznyj"),
    "vru15kvtTop",
    "vru15kvtBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-so-schetchikami": lazyPair(
    () =>
      import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-so-schetchikami"),
    "VruSoSchetchikamiTop",
    "VruSoSchetchikamiBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-paneli-pvr": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-paneli-pvr"),
    "VruPaneliPvrTop",
    "VruPaneliPvrBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-vvodnye-paneli-vp": lazyPair(
    () =>
      import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-vvodnye-paneli-vp"),
    "VruPaneliVpTop",
    "VruPaneliVpBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-paneli-rp": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-paneli-rp"),
    "VruPaneliRpTop",
    "VruPaneliRpBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-1-vvod": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-1-vvod"),
    "Vru1VvodTop",
    "Vru1VvodBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-2-vvoda": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-2-vvoda"),
    "vruTwoInputsTop",
    "vruTwoInputsBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-32a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-32a"),
    "vru32ATop",
    "vru32ABottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-40a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-40a"),
    "vru40ATop",
    "vru40ABottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-63a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-63a"),
    "vru63Top",
    "vru63Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-100a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-100a"),
    "vru100Top",
    "vru100Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-125a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-125a"),
    "vru125Top",
    "vru125Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-250a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-250a"),
    "vru250Top",
    "vru250Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-400a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-400a"),
    "vru400Top",
    "vru400Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-500a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-500a"),
    "vru500Top",
    "vru500Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-630a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-630a"),
    "vru630Top",
    "vru630Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-800a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-800a"),
    "vru800Top",
    "vru800Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-1000a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-1000a"),
    "vru1000Top",
    "vru1000Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-1600a": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-1600a"),
    "vru1600Top",
    "vru1600Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-ip-55": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-ip-55"),
    "vruIp55Top",
    "vruIp55Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-ip-65": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-ip-65"),
    "vruIp65Top",
    "vruIp65Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-ip-31": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-ip-31"),
    "vruIp31Top",
    "vruIp31Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-ip-66": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-ip-66"),
    "vruIp66Top",
    "vruIp66Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-bez-schetchika": lazyPair(
    () =>
      import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-bez-schetchika"),
    "vruBezSchetchikaTop",
    "vruBezSchetchikaBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-na-kontaktorakh": lazyPair(
    () =>
      import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-na-kontaktorakh"),
    "vruNaKontaktorakhTop",
    "vruNaKontaktorakhBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-avtomaticheskij-vyklyuchatel":
    lazyPair(
      () =>
        import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-avtomaticheskij-vyklyuchatel"),
      "vruAvtomaticheskijVyklyuchatelTop",
      "vruAvtomaticheskijVyklyuchatelBottom",
    ),
  "vvodno-raspredelitelnye-ustrojstva-vru-navesnye": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-navesnye"),
    "vruNavesnyeTop",
    "vruNavesnyeBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-napolnye": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-napolnye"),
    "vruNapolnyeTop",
    "vruNapolnyeBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-s-avr": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-s-avr"),
    "vruAvrTop",
    "vruAvrBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-transformator-toka": lazyPair(
    () =>
      import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-transformator-toka"),
    "vruTransformatorTokaTop",
    "vruTransformatorTokaBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-ukhl1": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-ukhl1"),
    "vruUkhl1Top",
    "vruUkhl1Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-ukhl4": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-ukhl4"),
    "vruUkhl4Top",
    "vruUkhl4Bottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-63a-s-avr": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-63a-s-avr"),
    "vru63aSAvrTop",
    "vru63aSAvrBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-250a-1-vvod": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-250a-1-vvod"),
    "vru250a1VvodTop",
    "vru250a1VvodBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-250a-s-avr": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-250a-s-avr"),
    "vru250aSAvrTop",
    "vru250aSAvrBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-400a-1-vvod": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-400a-1-vvod"),
    "vru400a1VvodTop",
    "vru400a1VvodBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-400a-2-vvoda": lazyPair(
    () =>
      import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-400a-2-vvoda"),
    "vru400a2VvodaTop",
    "vru400a2VvodaBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-400a-s-avr": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-400a-s-avr"),
    "vru400aSavrTop",
    "vru400aSavrBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-630a-2-vvoda": lazyPair(
    () =>
      import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-630a-2-vvoda"),
    "vru630a2VvodaTop",
    "vru630a2VvodaBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-630a-s-avr": lazyPair(
    () => import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-630a-s-avr"),
    "vru630aSavrTop",
    "vru630aSavrBottom",
  ),
  "vvodno-raspredelitelnye-ustrojstva-vru-800a-2-vvoda": lazyPair(
    () =>
      import("./shared/vvodno-raspredelitelnye-ustrojstva-vru-800a-2-vvoda"),
    "vru800a2VvodaTop",
    "vru800a2VvodaBottom",
  ),

  "nakladki-shitov-etazhnyh-she": lazyPair(
    () => import("./shared/NakladkyEtazgnyeSen"),
    "NakladkyEtazhnyeTop",
    "NakladkyEtazhnyeBottom",
  ),
  "ustroystva-etazhnye": lazyPair(
    () => import("./shared/ustroystva-etazhnye"),
    "UstroystvaEtazhnyeTop",
    "UstroystvaEtazhnyeBottom",
  ),
  uerv: lazyPair(() => import("./shared/uerv"), "uervTop", "uervBottom"),
  uerm: lazyPair(() => import("./shared/uerm"), "uermTop", "uermBottom"),
  "kozhuh-she-dlya-etazhnogo-shita": lazyPair(
    () => import("./shared/kozhuh-she-dlya-etazhnogo-shita"),
    "KozhukhTop",
    "KozhukhBottom",
  ),
};

export default categoryComponents;
