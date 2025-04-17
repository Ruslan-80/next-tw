"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductFilters({
    filters,
    defaultValues = {},
    onChange,
}) {
    const { register, watch, setValue } = useForm({
        defaultValues,
    });

    const watched = watch();

    useEffect(() => {
        if (onChange) {
            onChange(watched);
        }
    }, [watched, onChange]);

    const toggleCheckbox = (name, value) => {
        const currentValues = watch(name) || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        setValue(name, newValues);
    };

    return (
        <div className="w-full space-y-4">
            <Accordion type="multiple">
                {filters.map(filter => (
                    <AccordionItem value={filter.name} key={filter.name}>
                        <AccordionTrigger>{filter.name}</AccordionTrigger>
                        <AccordionContent className="space-y-2 pl-2">
                            {filter.options.map(option => (
                                <div
                                    key={option.value}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`${filter.name}-${option.value}`}
                                        checked={(
                                            watch(filter.name) || []
                                        ).includes(option.value)}
                                        onCheckedChange={() =>
                                            toggleCheckbox(
                                                filter.name,
                                                option.value
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor={`${filter.name}-${option.value}`}
                                        className="text-sm"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button
                variant="outline"
                onClick={() => {
                    filters.forEach(filter => setValue(filter.name, []));
                }}
            >
                Сбросить фильтры
            </Button>
        </div>
    );
}
