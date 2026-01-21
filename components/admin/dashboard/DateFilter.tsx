"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { subDays, startOfMonth, subMonths, format } from "date-fns";

interface DateFilterProps {
    onFilterChange: (from: Date, to: Date) => void;
}

export const DateFilter = ({ onFilterChange }: DateFilterProps) => {
    const [preset, setPreset] = useState("thisMonth");
    const [customFrom, setCustomFrom] = useState("");
    const [customTo, setCustomTo] = useState("");

    const handlePresetChange = (value: string) => {
        setPreset(value);
        const now = new Date();
        let from = now;
        let to = now;

        switch (value) {
            case "today":
                from = new Date(now.setHours(0, 0, 0, 0));
                break;
            case "last7":
                from = subDays(now, 7);
                break;
            case "thisMonth":
                from = startOfMonth(now);
                break;
            case "last3Months":
                from = subMonths(now, 3);
                break;
            case "custom":
                return; // Do nothing, wait for manual input
        }

        if (value !== "custom") {
            // Reset custom inputs for clarity
            setCustomFrom(format(from, "yyyy-MM-dd"));
            setCustomTo(format(to, "yyyy-MM-dd"));
            onFilterChange(from, to);
        }
    };

    const handleCustomApply = () => {
        if (customFrom && customTo) {
            onFilterChange(new Date(customFrom), new Date(customTo));
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-background p-1 rounded-lg">
            <Select value={preset} onValueChange={handlePresetChange}>
                <SelectTrigger className="w-[180px]">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="last7">Last 7 Days</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="last3Months">Last 3 Months</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
            </Select>

            {preset === "custom" && (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4">
                    <Input
                        type="date"
                        value={customFrom}
                        onChange={(e) => setCustomFrom(e.target.value)}
                        className="w-auto"
                    />
                    <span className="text-muted-foreground text-sm">to</span>
                    <Input
                        type="date"
                        value={customTo}
                        onChange={(e) => setCustomTo(e.target.value)}
                        className="w-auto"
                    />
                    <Button variant="secondary" size="sm" onClick={handleCustomApply}>
                        Apply
                    </Button>
                </div>
            )}
        </div>
    );
};
