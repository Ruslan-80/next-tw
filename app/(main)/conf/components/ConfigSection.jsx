"use client";

import { useId } from "react";
import { Plus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useConfiguratorStore from "@/lib/store/useConfiguratorStore";
import SortableRow from "./SortableRow";

// ─── Цвета секций (перенесено из configurator.jsx) ───────────────────────────
export const SECTIONS = {
  inputs: {
    label: "Ввод",
    color: "#3b82f6",
    btnColor: "bg-blue-700 hover:bg-blue-600",
  },
  meters: {
    label: "Учет электроэнергии",
    color: "#a855f7",
    btnColor: "bg-purple-700 hover:bg-purple-600",
  },
  lines: {
    label: "Отходящие линии",
    color: "#22c55e",
    btnColor: "bg-green-700 hover:bg-green-600",
  },
};

// ─── Секция конфигуратора с DnD-сортировкой ──────────────────────────────────
// Раньше был вложен в ShieldConfigurator (антипаттерн — пересоздавался каждый
// рендер). Теперь — модульный компонент, читающий store напрямую.
export default function ConfigSection({
  sectionKey,
  type,
  deviceType,
  addLabel,
  extra,
}) {
  const cfg = SECTIONS[sectionKey];
  const items = useConfiguratorStore((s) => s.shield[sectionKey]);
  const moveItem = useConfiguratorStore((s) => s.moveItem);
  const shield = useConfiguratorStore((s) => s.shield);
  const dndId = useId();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    moveItem(sectionKey, active.id, over.id);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div
          className="w-1 h-6 rounded-full flex-shrink-0"
          style={{ backgroundColor: cfg.color }}
        />
        <h2 className="text-base font-semibold" style={{ color: cfg.color }}>
          {cfg.label}
        </h2>
        {extra}
      </div>

      <DndContext
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {items.map((item, idx) => (
              <SortableRow
                key={item.id}
                item={item}
                rowNumber={idx + 1}
                sectionKey={sectionKey}
                canRemove={shield[sectionKey].length > 1}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <AddButton sectionKey={sectionKey} type={type} deviceType={deviceType} addLabel={addLabel} cfg={cfg} />
    </div>
  );
}

// Кнопка добавления элемента — отдельный компонент, чтобы не пересоздавать
function AddButton({ sectionKey, type, deviceType, addLabel, cfg }) {
  const add = useConfiguratorStore((s) => s.add);
  return (
    <button
      onClick={() => add(sectionKey, type, deviceType)}
      className={`flex items-center gap-1.5 ${cfg.btnColor} transition-colors px-3 py-1.5 rounded text-xs`}
    >
      <Plus size={13} /> {addLabel}
    </button>
  );
}
