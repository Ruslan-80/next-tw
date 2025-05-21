"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function Filters({ slug, searchParams, attributes }) {
    const router = useRouter();

    // Preserve the full set of attributes from the initial render
    const [allAttributes] = useState(attributes);

    // Initialize filters state: each attribute maps to an array of selected values
    const [filters, setFilters] = useState(() => {
        const init = {};
        for (const attr in allAttributes) {
            const param = searchParams[attr];
            if (Array.isArray(param)) {
                init[attr] = param;
            } else if (param) {
                // Разбиваем строку со слешами в массив
                init[attr] = param.split("-").filter(v => v.trim() !== "");
            } else {
                init[attr] = [];
            }
        }
        return init;
    });

    // Sync URL whenever filters change
    useEffect(() => {
        const params = new URLSearchParams();
        for (const key in filters) {
            if (filters[key].length > 0) {
                // Объединяем значения в строку со слешами
                params.set(key, filters[key].join("-"));
            }
        }

        const qs = params.toString();
        router.replace(`/catalog/${slug}${qs ? `?${qs}` : ""}`);
    }, [filters, slug, router]);

    // Toggle a checkbox value in state
    const toggleCheckbox = (attributeSlug, value) => {
        setFilters(prev => {
            const current = new Set(prev[attributeSlug]);
            if (current.has(value)) current.delete(value);
            else current.add(value);
            return { ...prev, [attributeSlug]: Array.from(current) };
        });
    };

    // Clear all filters
    const clearFilters = () => {
        const reset = {};
        for (const attr in allAttributes) {
            reset[attr] = [];
        }
        setFilters(reset);
    };

    if (!Object.keys(allAttributes).length) return null;

    return (
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Фильтры</h3>
            <div className="w-full space-y-4">
                <Accordion type="multiple">
                    {Object.entries(allAttributes).map(
                        ([attributeSlug, { name, values }]) => (
                            <AccordionItem
                                value={attributeSlug}
                                key={attributeSlug}
                            >
                                <AccordionTrigger>{name}</AccordionTrigger>
                                <AccordionContent className="space-y-2 pl-2">
                                    {values.map(option => (
                                        <div
                                            key={option}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={`${attributeSlug}-${option}`}
                                                checked={filters[
                                                    attributeSlug
                                                ].includes(option)}
                                                onCheckedChange={() =>
                                                    toggleCheckbox(
                                                        attributeSlug,
                                                        option
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor={`${attributeSlug}-${option}`}
                                                className="text-sm"
                                            >
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        )
                    )}
                </Accordion>
                <Button variant="outline" onClick={clearFilters}>
                    Сбросить фильтры
                </Button>
            </div>
        </div>
    );
}
