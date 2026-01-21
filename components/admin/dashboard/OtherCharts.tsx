"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis as BarXAxis, YAxis as BarYAxis, CartesianGrid as BarGrid } from 'recharts';

// --- Order Status Chart ---
const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#64748b']; // Success, Info, Warning, Error, Default

interface StatusChartProps {
    data: { name: string; value: number }[];
}

export const StatusChart = ({ data }: StatusChartProps) => {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

// --- Category Performance Chart ---
interface CategoryChartProps {
    data: { name: string; value: number; revenue: number }[];
}

export const CategoryChart = ({ data }: CategoryChartProps) => {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <BarGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                    <BarXAxis type="number" hide />
                    <BarYAxis
                        dataKey="name"
                        type="category"
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        width={80}
                    />
                    <RechartsTooltip
                        cursor={{ fill: 'transparent' }}
                    />
                    <Bar dataKey="revenue" fill="#8884d8" radius={[0, 4, 4, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
