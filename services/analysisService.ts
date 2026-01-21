import { apiFetch } from "./api";

export interface AnalysisData {
    stats: {
        totalRevenue: number;
        orderVolume: number;
        activeUsers: number;
        conversionRate: number;
    };
    revenueGraph: {
        _id: string; // Date "YYYY-MM-DD"
        sales: number;
        cancellations: number;
    }[];
    orderStatus: {
        name: string;
        value: number;
    }[];
    categoryPerformance: {
        name: string;
        value: number;
        revenue: number;
    }[];
}

export const analysisService = {
    getDashboardAnalysis: async (from?: Date | string, to?: Date | string): Promise<AnalysisData> => {
        const queryParams = new URLSearchParams();
        if (from) queryParams.append("from", new Date(from).toISOString());
        if (to) queryParams.append("to", new Date(to).toISOString());

        const res = await apiFetch(`/user/analysis?${queryParams.toString()}`);
        if (!res.ok) {
            throw new Error('Failed to fetch dashboard analysis');
        }
        return res.json();
    }
};
