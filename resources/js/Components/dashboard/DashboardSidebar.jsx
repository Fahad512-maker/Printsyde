import ApplicationLogo from '@/Components/ApplicationLogo';

function NavIcon({ itemKey }) {
    if (itemKey === 'dashboard') {
        return (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6Zm10-10h8V3h-8v8Z" />
            </svg>
        );
    }

    if (itemKey === 'analytics') {
        return (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 19h16M7 16V8m5 8V5m5 11v-6" />
            </svg>
        );
    }

    if (itemKey === 'users') {
        return (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="9.5" cy="7" r="3" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
                <path d="M16 3.1a3 3 0 0 1 0 5.8" />
            </svg>
        );
    }

    if (itemKey === 'catalog') {
        return (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
                <path d="M3 12.5 12 17l9-4.5" />
                <path d="M3 17 12 21l9-4" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10.3 3.5h3.4l.4 2a6.9 6.9 0 0 1 1.6.9l1.9-.8 1.7 2.9-1.5 1.4c.1.4.1.8.1 1.2s0 .8-.1 1.2l1.5 1.4-1.7 2.9-1.9-.8a6.9 6.9 0 0 1-1.6.9l-.4 2h-3.4l-.4-2a6.9 6.9 0 0 1-1.6-.9l-1.9.8-1.7-2.9 1.5-1.4A6 6 0 0 1 6 12c0-.4 0-.8.1-1.2L4.6 9.4l1.7-2.9 1.9.8c.5-.4 1-.7 1.6-.9l.5-1.9Z" />
            <circle cx="12" cy="12" r="2.7" />
        </svg>
    );
}

export default function DashboardSidebar({
    navItems,
    activeModule,
    onSelect,
    mobileOpen,
    onClose,
    catalogTab,
    isCatalogOpen,
    onCatalogToggle,
    onCatalogTabChange,
}) {
    return (
        <>
            <div
                className={`fixed inset-0 z-30 bg-slate-900/45 transition lg:hidden ${mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={onClose}
            />

            <aside
                className={`fixed top-0 left-0 z-40 h-full w-72 border-r border-slate-200 bg-white p-4 shadow-xl transition-transform lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:translate-x-0 lg:self-start lg:overflow-y-auto lg:rounded-3xl lg:border lg:shadow-sm ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="mb-6 flex items-center gap-3">
                    <ApplicationLogo className="h-11 w-11 fill-current text-cyan-700" />
                    <div>
                        <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase">PrintSyde</p>
                        <h2 className="text-sm font-black text-slate-900">Operations Panel</h2>
                    </div>
                </div>

                <nav className="space-y-1.5">
                    {navItems.map((item) => {
                        if (item.key === 'catalog') {
                            const isActive = activeModule === 'catalog';

                            return (
                                <div key={item.key} className="space-y-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onSelect('catalog');
                                            onCatalogToggle();
                                        }}
                                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                                            isActive
                                                ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow'
                                                : 'text-slate-700 hover:bg-slate-100'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2.5">
                                            <NavIcon itemKey={item.key} />
                                            <span>{item.label}</span>
                                        </span>
                                        <span className="text-xs">{isCatalogOpen ? '-' : '+'}</span>
                                    </button>

                                    {isCatalogOpen && (
                                        <div className="space-y-1 pl-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onSelect('catalog');
                                                    onCatalogTabChange('add');
                                                    onClose();
                                                }}
                                                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                                                    isActive && catalogTab === 'add'
                                                        ? 'bg-cyan-100 text-cyan-800'
                                                        : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                            >
                                                Add Catalog
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onSelect('catalog');
                                                    onCatalogTabChange('list');
                                                    onClose();
                                                }}
                                                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                                                    isActive && catalogTab === 'list'
                                                        ? 'bg-cyan-100 text-cyan-800'
                                                        : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                            >
                                                List
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        const isActive = activeModule === item.key;

                        return (
                            <button
                                type="button"
                                key={item.key}
                                onClick={() => {
                                    onSelect(item.key);
                                    onClose();
                                }}
                                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                                    isActive
                                        ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow'
                                        : 'text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                <NavIcon itemKey={item.key} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
