function StatusBadge({ status }) {
    if (status === 'Completed') {
        return <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">Completed</span>;
    }

    if (status === 'Verified') {
        return <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700">Verified</span>;
    }

    if (status === 'Pending') {
        return <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">Pending</span>;
    }

    return <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">{status}</span>;
}

export default function ActivityTable({ rows }) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4">
                <h3 className="text-lg font-black text-slate-900">Recent Activity</h3>
                <p className="text-sm text-slate-500">Latest transactions and user actions</p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead>
                        <tr className="text-left text-xs font-semibold tracking-[0.1em] text-slate-500 uppercase">
                            <th className="px-3 py-2">ID</th>
                            <th className="px-3 py-2">Name</th>
                            <th className="px-3 py-2">Action</th>
                            <th className="px-3 py-2">Amount</th>
                            <th className="px-3 py-2">Status</th>
                            <th className="px-3 py-2">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        {rows.map((row) => (
                            <tr key={row.id} className="transition hover:bg-slate-50">
                                <td className="px-3 py-3 font-semibold text-slate-900">{row.id}</td>
                                <td className="px-3 py-3">{row.name}</td>
                                <td className="px-3 py-3">{row.action}</td>
                                <td className="px-3 py-3 font-semibold">{row.amount}</td>
                                <td className="px-3 py-3"><StatusBadge status={row.status} /></td>
                                <td className="px-3 py-3 text-slate-500">{row.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
