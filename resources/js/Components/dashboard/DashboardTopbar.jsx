import { Link } from '@inertiajs/react';

export default function DashboardTopbar({ user, searchTerm, onSearchChange, onToggleSidebar }) {
    return (
        <header className="sticky top-0 z-20 border-b border-white/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 px-4 py-3 shadow-sm sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-[1850px] items-center gap-3">
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    className="rounded-lg border border-white/20 p-2 text-white lg:hidden"
                    aria-label="Toggle menu"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
                        <path d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                </button>

                <div className="relative flex-1">
                    <svg viewBox="0 0 24 24" className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.2-3.2" />
                    </svg>
                    <input
                        value={searchTerm}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Search users, transactions, metrics"
                        className="w-full rounded-xl border border-white/20 bg-white/10 py-2 pr-3 pl-9 text-sm text-white placeholder:text-slate-300 focus:border-cyan-300 focus:ring-cyan-300"
                    />
                </div>

                <button
                    type="button"
                    className="relative rounded-xl border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
                    aria-label="Notifications"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V10a6 6 0 1 0-12 0v4.2a2 2 0 0 1-.6 1.4L4 17h5" />
                        <path d="M9.8 17a2.2 2.2 0 0 0 4.4 0" />
                    </svg>
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-400" />
                </button>

                <div className="group relative">
                    <button type="button" className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-2.5 py-1.5 text-white">
                        <img
                            alt="User avatar"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                            className="h-7 w-7 rounded-full object-cover ring-2 ring-cyan-300/60"
                        />
                        <span className="hidden text-sm font-semibold sm:inline">{user?.name ?? 'Admin'}</span>
                    </button>

                    <div className="invisible absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1.5 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                        <Link href={route('profile.edit')} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                            Profile
                        </Link>
                        <Link href={route('logout')} method="post" as="button" className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 hover:bg-rose-50">
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
