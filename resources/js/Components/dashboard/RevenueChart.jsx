import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export default function RevenueChart({ data }) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4">
                <h3 className="text-lg font-black text-slate-900">Revenue and User Trend</h3>
                <p className="text-sm text-slate-500">Sample monthly performance data</p>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 12, right: 8, left: -16, bottom: 0 }}>
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.38} />
                                <stop offset="95%" stopColor="#0891b2" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.34} />
                                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.04} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{
                                borderRadius: 12,
                                borderColor: '#e2e8f0',
                                fontSize: 12,
                            }}
                        />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Area type="monotone" dataKey="revenue" stroke="#0891b2" fill="url(#revenueGradient)" strokeWidth={2.4} />
                        <Area type="monotone" dataKey="users" stroke="#7c3aed" fill="url(#usersGradient)" strokeWidth={2.4} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
