"use client";

import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import RowEditor from "../RowEditor";
import useConfiguratorStore from "@/lib/store/useConfiguratorStore";

// ─── Sortable-обёртка для строки редактора ───────────────────────────────────
export default function SortableRow({ item, rowNumber, sectionKey, canRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const update = useConfiguratorStore((s) => s.update);
  const updateParams = useConfiguratorStore((s) => s.updateParams);
  const remove = useConfiguratorStore((s) => s.remove);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-2 items-start group">
      <button
        {...attributes}
        {...listeners}
        className="mt-3 text-slate-600 hover:text-slate-400 cursor-grab active:cursor-grabbing flex-shrink-0 touch-none"
      >
        <GripVertical size={16} />
      </button>
      <div className="flex-1">
        <RowEditor
          item={item}
          rowNumber={rowNumber}
          onParamsChange={(f, v) => updateParams(sectionKey, item.id, f, v)}
          onChange={(f, v) => update(sectionKey, item.id, f, v)}
          onRemove={canRemove ? () => remove(sectionKey, item.id) : undefined}
        />
      </div>
    </div>
  );
}
