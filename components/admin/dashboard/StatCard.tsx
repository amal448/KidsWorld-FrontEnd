"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    description: string;
    className?: string;
}

export const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendUp,
    description,
    className,
}: StatCardProps) => {
    return (
        <div className={cn("rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6", className)}>
            <div className="flex items-center justify-between pb-2">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
    );
};
