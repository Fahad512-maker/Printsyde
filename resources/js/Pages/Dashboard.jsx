import { Head, useForm, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";
import ActivityTable from "@/Components/dashboard/ActivityTable";
import DashboardSidebar from "@/Components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/Components/dashboard/DashboardTopbar";
import LivePreview from "@/Components/dashboard/LivePreview";
import MetricCards from "@/Components/dashboard/MetricCards";
import RevenueChart from "@/Components/dashboard/RevenueChart";
import {
    activityRows,
    metricCards,
    navItems,
    previewCards,
    revenueChartData,
} from "@/Components/dashboard/dashboardData";

function ModulePlaceholder({ title, description }) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
                {description}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold tracking-[0.15em] text-slate-500 uppercase">
                        Quick Insight
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-700">
                        This panel can host your module-specific KPIs and
                        reports.
                    </p>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold tracking-[0.15em] text-slate-500 uppercase">
                        Actions
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-700">
                        Add forms, filters, and action buttons here as your
                        module grows.
                    </p>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2 xl:col-span-1">
                    <p className="text-xs font-semibold tracking-[0.15em] text-slate-500 uppercase">
                        Notes
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-700">
                        Responsive layout is already ready for desktop, tablet,
                        and mobile.
                    </p>
                </article>
            </div>
        </section>
    );
}

const initialCatalogData = {
    name: "",
    category: "",
    print_type: "",
    minimum_order_quantity: "",
    starting_price: "",
    image_url: "",
    sort_order: "0",
    is_active: true,
};

const catalogFieldConfig = [
    { key: "name", label: "Item Name", type: "text" },
    { key: "category", label: "Category", type: "text" },
    { key: "print_type", label: "Print Type", type: "text" },
    { key: "image_url", label: "Image URL", type: "url" },
    {
        key: "minimum_order_quantity",
        label: "Minimum Order Quantity",
        type: "number",
        min: "1",
    },
    {
        key: "starting_price",
        label: "Starting Price",
        type: "number",
        min: "0",
    },
    { key: "sort_order", label: "Sort Order", type: "number", min: "0" },
];

function CatalogInputError({ message }) {
    return message ? (
        <p className="mt-1 text-xs font-semibold text-rose-500">{message}</p>
    ) : null;
}

function CatalogInput({ id, label, ...props }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="text-xs font-bold tracking-[0.14em] text-slate-500 uppercase"
            >
                {label}
            </label>
            <input
                id={id}
                className="mt-1.5 w-full rounded-xl border-slate-200 bg-white/80 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                {...props}
            />
        </div>
    );
}

export default function Dashboard({
    catalogItems = [],
    adminMetrics = [],
    userRows = activityRows,
}) {
    const { auth, flash } = usePage().props;
    const [activeModule, setActiveModule] = useState("dashboard");
    const [catalogTab, setCatalogTab] = useState("add");
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [editingCatalogId, setEditingCatalogId] = useState(null);
    const catalogForm = useForm(initialCatalogData);
    const editCatalogForm = useForm(initialCatalogData);
    const deleteCatalogForm = useForm({});
    const resolvedMetrics =
        adminMetrics.length > 0 ? adminMetrics : metricCards;

    const filteredActivityRows = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) {
            return userRows;
        }

        return userRows.filter((row) => {
            const value =
                `${row.id} ${row.name} ${row.action} ${row.status} ${row.amount}`.toLowerCase();
            return value.includes(query);
        });
    }, [searchTerm, userRows]);

    const filteredCatalogItems = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) {
            return catalogItems;
        }

        return catalogItems.filter((item) => {
            const value =
                `${item.name} ${item.category} ${item.print_type} ${item.starting_price}`.toLowerCase();
            return value.includes(query);
        });
    }, [catalogItems, searchTerm]);

    const editingCatalogItem = useMemo(() => {
        return (
            catalogItems.find((item) => item.id === editingCatalogId) ?? null
        );
    }, [catalogItems, editingCatalogId]);

    const handleCatalogCreate = (event) => {
        event.preventDefault();

        catalogForm.post(route("dashboard.catalog-items.store"), {
            preserveScroll: true,
            onSuccess: () => {
                catalogForm.reset();
                catalogForm.setData("sort_order", "0");
                catalogForm.setData("is_active", true);
                setCatalogTab("list");
            },
        });
    };

    const handleCatalogEditStart = (item) => {
        setEditingCatalogId(item.id);
        editCatalogForm.setData({
            name: item.name ?? "",
            category: item.category ?? "",
            print_type: item.print_type ?? "",
            minimum_order_quantity: String(item.minimum_order_quantity ?? ""),
            starting_price: String(item.starting_price ?? ""),
            image_url: item.image_url ?? "",
            sort_order: String(item.sort_order ?? 0),
            is_active: Boolean(item.is_active),
        });
    };

    const handleCatalogUpdate = (event) => {
        event.preventDefault();

        if (!editingCatalogId) {
            return;
        }

        editCatalogForm.put(
            route("dashboard.catalog-items.update", editingCatalogId),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setEditingCatalogId(null);
                    editCatalogForm.reset();
                },
            },
        );
    };

    const handleCatalogDelete = (catalogItemId) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this catalog item?",
            )
        ) {
            return;
        }

        deleteCatalogForm.delete(
            route("dashboard.catalog-items.destroy", catalogItemId),
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (editingCatalogId === catalogItemId) {
                        setEditingCatalogId(null);
                        editCatalogForm.reset();
                    }
                },
            },
        );
    };

    const handleModuleSelect = (module) => {
        setActiveModule(module);
    };

    const renderCatalogForm = () => (
        <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-900">
                Add Catalog Item
            </h3>
            <p className="mt-1 text-sm text-slate-500">
                Create a new catalog product using the fields below.
            </p>

            <form onSubmit={handleCatalogCreate} className="mt-5 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    {catalogFieldConfig.map((field) => (
                        <div key={field.key}>
                            <CatalogInput
                                id={field.key}
                                label={field.label}
                                type={field.type}
                                min={field.min}
                                value={catalogForm.data[field.key]}
                                onChange={(event) =>
                                    catalogForm.setData(
                                        field.key,
                                        event.target.value,
                                    )
                                }
                            />
                            <CatalogInputError
                                message={catalogForm.errors[field.key]}
                            />
                        </div>
                    ))}
                    <div className="flex items-end pb-1">
                        <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                            <input
                                type="checkbox"
                                checked={catalogForm.data.is_active}
                                onChange={(event) =>
                                    catalogForm.setData(
                                        "is_active",
                                        event.target.checked,
                                    )
                                }
                                className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                            />
                            Active Item
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={catalogForm.processing}
                    className="rounded-xl bg-gradient-to-r from-slate-900 to-cyan-900 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {catalogForm.processing ? "Saving..." : "Add Catalog"}
                </button>
            </form>
        </section>
    );

    const renderCatalogList = () => (
        <section className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-black text-slate-900">
                        Catalog Items List
                    </h3>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                        {filteredCatalogItems.length} Items
                    </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredCatalogItems.map((item) => (
                        <article
                            key={item.id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="h-40 w-full object-cover"
                            />
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">
                                            {item.name}
                                        </h4>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {item.category} | {item.print_type}
                                        </p>
                                    </div>
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}
                                    >
                                        {item.is_active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-600">
                                    <span>
                                        MOQ {item.minimum_order_quantity}
                                    </span>
                                    <span>PKR {item.starting_price}</span>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleCatalogEditStart(item)
                                        }
                                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleCatalogDelete(item.id)
                                        }
                                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-rose-300 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}

                    {filteredCatalogItems.length === 0 && (
                        <article className="sm:col-span-2 xl:col-span-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                            <p className="text-sm font-semibold text-slate-600">
                                No catalog items found.
                            </p>
                        </article>
                    )}
                </div>
            </section>

            {editingCatalogItem && (
                <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-black text-slate-900">
                            Update Catalog: {editingCatalogItem.name}
                        </h3>
                        <button
                            type="button"
                            onClick={() => {
                                setEditingCatalogId(null);
                                editCatalogForm.reset();
                            }}
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Close
                        </button>
                    </div>

                    <form
                        onSubmit={handleCatalogUpdate}
                        className="mt-5 space-y-4"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            {catalogFieldConfig.map((field) => (
                                <div key={`edit-${field.key}`}>
                                    <CatalogInput
                                        id={`edit-${field.key}`}
                                        label={field.label}
                                        type={field.type}
                                        min={field.min}
                                        value={editCatalogForm.data[field.key]}
                                        onChange={(event) =>
                                            editCatalogForm.setData(
                                                field.key,
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <CatalogInputError
                                        message={
                                            editCatalogForm.errors[field.key]
                                        }
                                    />
                                </div>
                            ))}
                            <div className="flex items-end pb-1">
                                <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={editCatalogForm.data.is_active}
                                        onChange={(event) =>
                                            editCatalogForm.setData(
                                                "is_active",
                                                event.target.checked,
                                            )
                                        }
                                        className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                                    />
                                    Active Item
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={editCatalogForm.processing}
                                className="rounded-xl bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {editCatalogForm.processing
                                    ? "Updating..."
                                    : "Save Update"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingCatalogId(null);
                                    editCatalogForm.reset();
                                }}
                                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            )}
        </section>
    );

    return (
        <>
            <Head title="Modern Dashboard" />

            <div className="min-h-screen bg-gradient-to-b from-slate-100 via-cyan-50/50 to-slate-100 text-slate-800">
                <DashboardTopbar
                    user={auth?.user ?? { name: "Admin User" }}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onToggleSidebar={() => setSidebarOpen((value) => !value)}
                />

                <div className="mx-auto flex w-full max-w-[1850px] gap-6 px-4 py-6 sm:px-6 lg:px-8">
                    <DashboardSidebar
                        navItems={navItems}
                        activeModule={activeModule}
                        onSelect={handleModuleSelect}
                        mobileOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                        catalogTab={catalogTab}
                        isCatalogOpen={isCatalogOpen}
                        onCatalogToggle={() =>
                            setIsCatalogOpen((value) => !value)
                        }
                        onCatalogTabChange={setCatalogTab}
                    />

                    <main className="min-w-0 flex-1 space-y-6">
                        {flash?.success && (
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm">
                                {flash.success}
                            </div>
                        )}

                        {activeModule === "dashboard" && (
                            <>
                                <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-900 to-sky-900 p-6 text-white shadow-lg sm:p-8">
                                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-200">
                                        Modern Dashboard
                                    </p>
                                    <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                                        Business Analytics Overview
                                    </h1>
                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-cyan-100">
                                        A clean responsive dashboard with
                                        metrics, charts, activities, and a live
                                        preview panel.
                                    </p>
                                </section>

                                <MetricCards metrics={resolvedMetrics} />

                                <div className="grid gap-6 xl:grid-cols-5">
                                    <div className="xl:col-span-3">
                                        <RevenueChart data={revenueChartData} />
                                    </div>
                                    <div className="xl:col-span-2">
                                        <LivePreview cards={previewCards} />
                                    </div>
                                </div>

                                <ActivityTable rows={filteredActivityRows} />
                            </>
                        )}

                        {activeModule === "analytics" && (
                            <ModulePlaceholder
                                title="Analytics Module"
                                description="Detailed campaign analytics, funnel reports, and channel performance can be managed here."
                            />
                        )}

                        {activeModule === "catalog" && (
                            <>
                                <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-900 to-sky-900 p-6 text-white shadow-lg sm:p-8">
                                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-200">
                                        Catalog Module
                                    </p>
                                    <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                                        Manage Catalog Items
                                    </h2>
                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-cyan-100">
                                        Use the dropdown tabs in sidebar to
                                        quickly switch between adding and
                                        viewing catalog items.
                                    </p>
                                </section>

                                {catalogTab === "add"
                                    ? renderCatalogForm()
                                    : renderCatalogList()}
                            </>
                        )}

                        {activeModule === "users" && (
                            <ModulePlaceholder
                                title="Users Module"
                                description="User profiles, permissions, and account activity management can be configured in this section."
                            />
                        )}

                        {activeModule === "settings" && (
                            <ModulePlaceholder
                                title="Settings Module"
                                description="Application configurations, branding preferences, and integrations can be handled here."
                            />
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
