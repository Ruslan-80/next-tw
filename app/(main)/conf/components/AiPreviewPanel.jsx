"use client";

import { useMemo } from "react";
import { Bot, Check, Plus, X } from "lucide-react";
import useConfiguratorStore from "@/lib/store/useConfiguratorStore";
import { aiComponentsToShield, parseRating } from "@/lib/conf/mappers";
import { SECTIONS } from "./ConfigSection";

// ─── Карточка одного распознанного компонента ────────────────────────────────
function ComponentCard({ comp, sectionKey }) {
  const cfg = SECTIONS[sectionKey];
  return (
    <div
      className="flex items-center gap-2 px-2 py-1.5 rounded text-xs border"
      style={{
        backgroundColor: cfg.color + "10",
        borderColor: cfg.color + "30",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: cfg.color }}
      />
      <span className="text-slate-300 font-mono flex-shrink-0">
        {comp.id || "—"}
      </span>
      {comp.model && (
        <span className="text-slate-100 truncate">{comp.model}</span>
      )}
      {comp.purpose && (
        <span className="text-slate-400 truncate italic">«{comp.purpose}»</span>
      )}
      <div className="ml-auto flex gap-2 text-slate-400 flex-shrink-0">
        {comp.rating_a && (
          <span title="Номинал">{parseRating(comp.rating_a, "—")} A</span>
        )}
        {comp.poles && <span title="Полюса">{comp.poles}П</span>}
        {comp.current_transformers && (
          <span title="Трансформатор тока">ТТ {comp.current_transformers}</span>
        )}
      </div>
    </div>
  );
}

// ─── Панель предпросмотра результатов AI-распознавания ───────────────────────
// Показывается, когда store.aiPreview не пустой.
// Пользователь может: Применить (заменить щит) / Добавить (дополнить) / Отклонить.
export default function AiPreviewPanel() {
  const aiPreview = useConfiguratorStore((s) => s.aiPreview);
  const loadProject = useConfiguratorStore((s) => s.loadProject);
  const setShield = useConfiguratorStore((s) => s.setShield);
  const shield = useConfiguratorStore((s) => s.shield);
  const clearAiPreview = useConfiguratorStore((s) => s.clearAiPreview);

  // Группируем распознанные компоненты по секциям конфигуратора
  const grouped = useMemo(() => {
    if (!aiPreview) return null;
    const mapped = aiComponentsToShield(aiPreview);
    // Сохраняем исходные AI-компоненты для отображения с их raw-параметрами
    const components = aiPreview.components || [];
    const bySection = { inputs: [], meters: [], lines: [] };
    const SECTION_OF = {
      breaker: "lines",
      disconnector: "inputs",
      meter: "meters",
      current_transformer: "meters",
    };
    components.forEach((comp) => {
      const section = SECTION_OF[comp.type] || "lines";
      bySection[section].push(comp);
    });
    return { bySection, mapped, total: components.length };
  }, [aiPreview]);

  if (!aiPreview || !grouped) return null;

  const handleApply = () => {
    loadProject(grouped.mapped);
  };

  const handleAppend = () => {
    // Добавляем распознанные элементы к существующим (не затирая ручной ввод)
    setShield({
      ...shield,
      inputs: [...shield.inputs, ...grouped.mapped.inputs.slice(0)],
      meters: [...shield.meters, ...grouped.mapped.meters.slice(0)],
      lines: [...shield.lines, ...grouped.mapped.lines.slice(0)],
    });
    clearAiPreview();
  };

  return (
    <div className="bg-cardBackground border border-indigo-700/50 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center">
            <Bot size={18} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-indigo-300">
              Распознано компонентов: {grouped.total}
            </h2>
            <p className="text-[11px] text-foreground">
              Проверьте распределение по секциям перед применением
            </p>
          </div>
        </div>
        <button
          onClick={clearAiPreview}
          className="text-foreground hover:text-red-400 p-1"
          title="Отклонить"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {Object.entries(grouped.bySection).map(([sectionKey, comps]) => {
          if (!comps.length) return null;
          const cfg = SECTIONS[sectionKey];
          return (
            <div key={sectionKey}>
              <div
                className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 pl-2 border-l-2"
                style={{ color: cfg.color, borderColor: cfg.color }}
              >
                {cfg.label} ({comps.length})
              </div>
              <div className="space-y-1">
                {comps.map((comp, i) => (
                  <ComponentCard
                    key={`${comp.id || i}-${i}`}
                    comp={comp}
                    sectionKey={sectionKey}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-800">
        <button
          onClick={handleApply}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-lg text-xs font-semibold text-white"
        >
          <Check size={14} /> Применить (заменить)
        </button>
        <button
          onClick={handleAppend}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 transition-colors px-4 py-2 rounded-lg text-xs font-medium text-slate-200"
        >
          <Plus size={14} /> Добавить к текущему
        </button>
      </div>
    </div>
  );
}
