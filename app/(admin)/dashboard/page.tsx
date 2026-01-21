"use client";

import { useEffect, useState } from "react";
import { DateFilter } from "@/components/admin/dashboard/DateFilter";
import { StatCard } from "@/components/admin/dashboard/StatCard";

import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { StatusChart, CategoryChart } from "@/components/admin/dashboard/OtherCharts";
import { analysisService, AnalysisData } from "@/services/analysisService";
import { DollarSign, ShoppingBag, Users, Percent, Loader2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { toast } from "sonner";
import { startOfMonth } from "date-fns";

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<AnalysisData | null>(null);
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: startOfMonth(new Date()),
        to: new Date(),
    });

    const fetchData = async (from: Date, to: Date) => {
        setLoading(true);
        try {
            const result = await analysisService.getDashboardAnalysis(from, to);
            setData(result);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
            toast.error("Failed to update dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(dateRange.from, dateRange.to);
    }, [dateRange]);

    const handleFilterChange = (from: Date, to: Date) => {
        setDateRange({ from, to });
    };

    if (!data && loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Real-time business analytics and performance metrics</p>
                </div>
                <DateFilter onFilterChange={handleFilterChange} />
            </div>

            {/* Big Four Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Net Revenue"
                    value={`₹${data?.stats.totalRevenue.toLocaleString() || 0}`}
                    icon={DollarSign}
                    description="Total earnings in period"
                    className="border-blue-100 bg-blue-50/50"
                />
                <StatCard
                    title="Order Volume"
                    value={data?.stats.orderVolume || 0}
                    icon={ShoppingBag}
                    description="Total orders placed"
                    className="border-green-100 bg-green-50/50"
                />
                <StatCard
                    title="Active Customers"
                    value={data?.stats.activeUsers || 0}
                    icon={Users}
                    description="Unique buyers in period"
                    className="border-purple-100 bg-purple-50/50"
                />
                <StatCard
                    title="Conversion Rate"
                    value={`${data?.stats.conversionRate || 0}%`}
                    icon={Percent}
                    description="Orders / Total Visitors (N/A)"
                    className="border-orange-100 bg-orange-50/50"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">

                {/* Revenue vs Cancellations (Main Chart) - Spans 4 columns */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="mb-6">
                        <h3 className="font-bold text-lg text-slate-900">Revenue Analysis</h3>
                        <p className="text-sm text-slate-500">Sales vs Cancellations over time</p>
                    </div>
                    {loading ? (
                        <div className="h-[300px] flex items-center justify-center text-muted-foreground"><Loader2 className="animate-spin" /></div>
                    ) : (data?.revenueGraph && data.revenueGraph.length > 0) ? (
                        <RevenueChart data={data.revenueGraph} />
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                            No data available for this range
                        </div>
                    )}
                </div>

                {/* Status Distribution - Spans 3 columns */}
                <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="mb-6">
                        <h3 className="font-bold text-lg text-slate-900">Order Status</h3>
                        <p className="text-sm text-slate-500">Distribution of order stages</p>
                    </div>
                    {loading ? (
                        <div className="h-[300px] flex items-center justify-center text-muted-foreground"><Loader2 className="animate-spin" /></div>
                    ) : (data?.orderStatus && data.orderStatus.length > 0) ? (
                        <StatusChart data={data.orderStatus} />
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                            No orders found
                        </div>
                    )}
                </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg text-slate-900">Category Performance</h3>
                        <p className="text-sm text-slate-500">Top selling categories by revenue</p>
                    </div>
                </div>
                {loading ? (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground"><Loader2 className="animate-spin" /></div>
                ) : (data?.categoryPerformance && data.categoryPerformance.length > 0) ? (
                    <CategoryChart data={data.categoryPerformance} />
                ) : (
                    <div className="h-[300px] flex items-center justify-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                        No category data available
                    </div>
                )}
            </div>
        </div>
    );
}
