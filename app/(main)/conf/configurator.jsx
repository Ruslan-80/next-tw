"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import useConfiguratorStore, {
  SECTION_KEYS,
} from "@/lib/store/useConfiguratorStore";
import { fetchDefaultProduct } from "@/lib/conf/api";
import { totalLineCurrent } from "@/lib/conf/spec";
import ConfigSection from "./components/ConfigSection";
import Specification from "./components/Specification";
import AiPreviewPanel from "./components/AiPreviewPanel";

// ─── Главный компонент конфигуратора ВРУ ─────────────────────────────────────
// Раньше содержал ~1000 строк с вложенными компонентами (SpecRow, SpecSection,
// ConfigSection), что вызывало их пересоздание на каждом рендере и потерю state.
// Теперь — тонкий оркестратор: стейт в zustand store, UI в отдельных модулях.
export default function ShieldConfigurator() {
  const shield = useConfiguratorStore((s) => s.shield);
  const demandFactor = useConfiguratorStore((s) => s.demandFactor);
  const setDemandFactor = useConfiguratorStore((s) => s.setDemandFactor);
  const setName = useConfiguratorStore((s) => s.setName);
  const setSectionProducts = useConfiguratorStore((s) => s.setSectionProducts);

  const [isBulkLoading, setIsBulkLoading] = useState(false);

  const calculatedCurrent = Math.round(
    totalLineCurrent(shield.lines) * demandFactor
  );

  // ─── «Подобрать всё»: параллельный подбор по всем секциям ──────────────────
  // Раньше секции обрабатывались последовательно в цикле. Теперь все запросы
  // запускаются параллельно. Используется общий хелпер fetchDefaultProduct.
  const handleBulkMatch = async () => {
    setIsBulkLoading(true);
    try {
      // Собираем все (section, item) пары для параллельного выполнения
      const tasks = SECTION_KEYS.flatMap((section) =>
        shield[section]
          .filter((item) => !item.product) // не перезаписываем ручной выбор
          .map(async (item) => ({
            section,
            itemId: item.id,
            product: await fetchDefaultProduct(item),
          }))
      );

      const results = await Promise.all(tasks);

      // Группируем результаты по секциям и обновляем store
      const bySection = {};
      results.forEach(({ section, itemId, product }) => {
        if (!bySection[section]) bySection[section] = {};
        bySection[section][itemId] = product;
      });

      SECTION_KEYS.forEach((section) => {
        if (bySection[section]) {
          setSectionProducts(section, bySection[section]);
        }
      });
    } catch (err) {
      console.error("Ошибка при массовом подборе:", err);
    } finally {
      setIsBulkLoading(false);
    }
  };

  const hasItems =
    shield.inputs.length > 0 ||
    shield.meters.length > 0 ||
    shield.lines.length > 0;

  return (
    <div className="p-6 border border-slate-800 rounded-xl min-h-screen text-white space-y-8">
      {/* Шапка */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl text-foreground font-bold">Конфигуратор ВРУ</h1>
        {hasItems && (
          <button
            onClick={handleBulkMatch}
            disabled={isBulkLoading}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-4 py-1.5 rounded-lg text-xs font-semibold text-white tracking-wide uppercase shadow-lg shadow-indigo-900/40"
          >
            <Wand2 size={14} className={isBulkLoading ? "animate-spin" : ""} />
            {isBulkLoading ? "Подбираем..." : "Подобрать всё"}
          </button>
        )}
        <input
          value={shield.name}
          onChange={(e) => setName(e.target.value)}
          className="bg-cardBackground border border-slate-700 text-foreground px-3 py-1.5 rounded text-sm"
          placeholder="Название щита"
          aria-label="Название щита"
        />
      </div>

      {/* Панель предпросмотра результатов AI-распознавания схемы */}
      <AiPreviewPanel />

      <ConfigSection
        sectionKey="inputs"
        type="input"
        deviceType="switch"
        addLabel="Добавить ввод"
      />
      <ConfigSection
        sectionKey="meters"
        type="meter"
        deviceType="meter"
        addLabel="Добавить прибор учёта"
      />
      <ConfigSection
        sectionKey="lines"
        type="line"
        deviceType="breaker"
        addLabel="Добавить линию"
        extra={
          <div className="flex items-center gap-2 text-xs text-foreground">
            <span>
              Σ {totalLineCurrent(shield.lines)} A → {calculatedCurrent} A
            </span>
            <span className="text-foreground">k=</span>
            <input
              type="number"
              min="0.1"
              max="1"
              step="0.05"
              value={demandFactor}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (!Number.isNaN(val) && val > 0 && val <= 1) {
                  setDemandFactor(val);
                }
              }}
              className="w-14 bg-cardBackground border border-slate-700 text-foreground px-1.5 py-0.5 rounded text-xs"
              title="Коэффициент спроса"
            />
          </div>
        }
      />

      <Specification />
    </div>
  );
}
