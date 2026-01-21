'use client';

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-black text-slate-900 mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', value: '...', color: 'bg-blue-50 text-blue-600' },
                    { label: 'Total Sales', value: '...', color: 'bg-green-50 text-green-600' },
                    { label: 'Total Products', value: '...', color: 'bg-purple-50 text-purple-600' },
                    { label: 'Pending Orders', value: '...', color: 'bg-orange-50 text-orange-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
                        <p className={`text-3xl font-black ${stat.color.split(' ')[1]}`}>{stat.value}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
                <div className="h-48 flex items-center justify-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    Chart Placeholder
                </div>
            </div>
        </div>
    );
}
