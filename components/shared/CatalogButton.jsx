"use client";
import { ChevronRight, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../../components/ui/dropdown-menu";
import dataCategory from "../../app/data/proizvodstvo.json";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CatalogButton() {
  const { categories } = dataCategory;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleNavigate = (slug) => {
    router.push(`/catalog/${slug}`);
    setOpen(false); // Закрываем меню после перехода
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`
            inline-flex items-center justify-center 
            px-6 py-2.5 mr-4 outline-none
            rounded-full transition-all duration-300
            text-[13px] font-medium uppercase tracking-[0.1em]
            ${
              open
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            }
          `}
        >
          <div className="relative w-5 h-5 mr-2">
            <Menu
              className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${open ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100"}`}
            />
            <X
              className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${open ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"}`}
            />
          </div>
          Каталог
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="
          w-80 p-2 mt-2 z-[100]
          bg-white border border-slate-100 rounded-[24px] 
          shadow-2xl shadow-slate-900/10 
          animate-in fade-in zoom-in-95 duration-200
        "
        align="start"
        sideOffset={10}
      >
        {categories.map((category) =>
          category.child && category.child.length > 0 ? (
            <DropdownMenuSub key={category.id}>
              {/* Триггер подменю */}
              <DropdownMenuSubTrigger
                className="
                  flex items-center justify-between 
                  px-4 py-3 my-1 rounded-xl outline-none
                  text-sm font-light text-slate-700
                  data-[state=open]:bg-slate-50 data-[state=open]:text-blue-600
                  hover:bg-slate-50 hover:text-slate-900 transition-colors
                  cursor-pointer
                "
              >
                <span className="truncate">{category.name}</span>
                <ChevronRight size={14} className="ml-2 text-slate-400" />
              </DropdownMenuSubTrigger>

              {/* Контент подменю — ВАЖНО: sideOffset и z-index */}
              <DropdownMenuSubContent
                className="
                  z-[110] min-w-[280px] p-2 ml-1
                  bg-white border border-slate-100 
                  rounded-[20px] shadow-2xl shadow-slate-900/15
                  animate-in fade-in slide-in-from-left-2 duration-200
                "
                sideOffset={4}
              >
                {category.child.map((subcategory) => (
                  <DropdownMenuItem
                    key={subcategory.id}
                    onClick={() => handleNavigate(subcategory.slug)}
                    className="
                      px-4 py-2.5 my-0.5 rounded-lg outline-none
                      text-[13px] font-light text-slate-600
                      hover:bg-blue-50 hover:text-blue-700 
                      transition-colors cursor-pointer
                    "
                  >
                    {subcategory.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem
              key={category.id}
              onClick={() => handleNavigate(category.slug)}
              className="
                px-4 py-3 my-1 rounded-xl outline-none
                text-sm font-light text-slate-700
                hover:bg-slate-50 hover:text-slate-900
                transition-colors cursor-pointer
              "
            >
              {category.name}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
