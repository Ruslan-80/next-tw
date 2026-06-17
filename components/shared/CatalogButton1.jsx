"use client";
import { ChevronRight, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../../components/ui/dropdown-menu";
import dataCategory from "../../app/data/catalogDropdown.json";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CatalogButton() {
  const { categories } = dataCategory; // Assume fixed to "child" in JSON
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleNavigate = (slug) => {
    setOpen(false);
    router.push(`/catalog/${slug}`);
  };
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="inline-flex items-center justify-center px-4 py-2 mr-2 btn-gold text-sm lg:text-xl rounded-md"
            aria-label="Open catalog menu"
          >
            <Menu
              className={`h-5 w-5 mr-2 transition-transform duration-300 ${
                open ? "rotate-90" : ""
              }`}
            />
            Каталог
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-full bg-card text-sm lg:text-xl border-none min-w-[var(--radix-dropdown-menu-trigger-width)]"
          align="start"
          sideOffset={5}
        >
          {categories.map((category) =>
            category.child?.length > 0 ? ( // Fixed typo
              <DropdownMenuSub key={category.id}>
                <DropdownMenuSubTrigger
                  className="flex text-sm lg:text-xl items-center my-2 justify-between  hover:bg-accent transition-colors"
                  onClick={() => handleNavigate(category.slug)}
                  aria-label={`Open ${category.name} submenu`}
                >
                  {category.name}
                  {/* <ChevronRight className="ml-2 h-4 w-4" /> */}
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent className="ml-1 bg-card border-none">
                  {category.child.map((subcategory) => (
                    <DropdownMenuItem
                      key={subcategory.id}
                      onClick={() => handleNavigate(subcategory.slug)}
                      className="flex text-sm lg:text-xl items-center my-2  hover:bg-accent transition-colors"
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
                className="flex text-sm lg:text-xl items-center my-2  hover:bg-blue-100 transition-colors"
              >
                {category.name}
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
