import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
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
    images: [],
    retained_image_paths: [],
    sort_order: "0",
    is_active: true,
};

const catalogFieldConfig = [
    { key: "name", label: "Item Name", type: "text" },
    { key: "category", label: "Category", type: "select" },
    { key: "print_type", label: "Print Type", type: "text" },
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

function CatalogSelect({ id, label, options = [], value, onChange }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="text-xs font-bold tracking-[0.14em] text-slate-500 uppercase"
            >
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="mt-1.5 w-full rounded-xl border-slate-200 bg-white/80 text-sm text-slate-800 shadow-sm transition focus:border-cyan-500 focus:ring-cyan-500"
            >
                <option value="">Select category</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

function useFilePreviews(files) {
    const previews = useMemo(
        () =>
            files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            })),
        [files],
    );

    useEffect(() => {
        return () => {
            previews.forEach((preview) => URL.revokeObjectURL(preview.preview));
        };
    }, [previews]);

    return previews;
}

function CatalogImageUploader({
    title,
    helper,
    existingImages = [],
    retainedImagePaths = [],
    newFiles = [],
    onFilesAdd,
    onExistingRemove,
    onNewFileRemove,
    error,
}) {
    const newFilePreviews = useFilePreviews(newFiles);

    return (
        <section className="rounded-[1.8rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold tracking-[0.18em] text-amber-700 uppercase">
                        Product Gallery
                    </p>
                    <h4 className="mt-2 text-xl font-black text-slate-950">
                        {title}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                        {helper}
                    </p>
                </div>

                <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-900/10 bg-gradient-to-r from-slate-950 via-slate-800 to-cyan-900 px-5 py-3 text-xs font-semibold tracking-[0.18em] text-white uppercase shadow-[0_14px_30px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5">
                    Upload Images
                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        multiple
                        className="hidden"
                        onChange={(event) => {
                            const selectedFiles = Array.from(
                                event.target.files ?? [],
                            );
                            if (selectedFiles.length > 0) {
                                onFilesAdd(selectedFiles);
                            }
                            event.target.value = "";
                        }}
                    />
                </label>
            </div>

            <CatalogInputError message={error} />

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50/80 p-4">
                    <div className="flex items-center justify-between gap-3">
                        <h5 className="text-sm font-black text-slate-900">
                            Existing Images
                        </h5>
                        <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-semibold tracking-[0.16em] text-slate-600 uppercase">
                            {retainedImagePaths.length} kept
                        </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {existingImages.length > 0 ? (
                            existingImages.map((imagePath, index) => {
                                const isRetained =
                                    retainedImagePaths.includes(imagePath);

                                return (
                                    <article
                                        key={`${imagePath}-${index}`}
                                        className={`overflow-hidden rounded-[1.3rem] border transition ${
                                            isRetained
                                                ? "border-slate-200 bg-white shadow-sm"
                                                : "border-rose-200 bg-rose-50/70 opacity-75"
                                        }`}
                                    >
                                        <img
                                            src={imagePath}
                                            alt={`Existing catalog image ${index + 1}`}
                                            className="h-36 w-full object-cover"
                                        />
                                        <div className="flex items-center justify-between gap-3 p-3">
                                            <span className="text-[0.68rem] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                                                {index === 0
                                                    ? "Cover Image"
                                                    : `Gallery ${index + 1}`}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onExistingRemove(imagePath)
                                                }
                                                className={`rounded-full px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] uppercase transition ${
                                                    isRetained
                                                        ? "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                                                        : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                                }`}
                                            >
                                                {isRetained ? "Remove" : "Keep"}
                                            </button>
                                        </div>
                                    </article>
                                );
                            })
                        ) : (
                            <div className="sm:col-span-2 rounded-[1.3rem] border border-dashed border-slate-300 bg-white/80 p-6 text-center text-sm text-slate-500">
                                No saved images yet.
                            </div>
                        )}
                    </div>
                </div>

                <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50/80 p-4">
                    <div className="flex items-center justify-between gap-3">
                        <h5 className="text-sm font-black text-slate-900">
                            New Uploads
                        </h5>
                        <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-semibold tracking-[0.16em] text-slate-600 uppercase">
                            {newFilePreviews.length} selected
                        </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {newFilePreviews.length > 0 ? (
                            newFilePreviews.map((preview, index) => (
                                <article
                                    key={`${preview.file.name}-${index}`}
                                    className="overflow-hidden rounded-[1.3rem] border border-slate-200 bg-white shadow-sm"
                                >
                                    <img
                                        src={preview.preview}
                                        alt={preview.file.name}
                                        className="h-36 w-full object-cover"
                                    />
                                    <div className="p-3">
                                        <p className="truncate text-sm font-semibold text-slate-800">
                                            {preview.file.name}
                                        </p>
                                        <div className="mt-3 flex items-center justify-between gap-3">
                                            <span className="text-[0.68rem] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                                                {formatFileSize(
                                                    preview.file.size,
                                                )}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onNewFileRemove(index)
                                                }
                                                className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-rose-700 uppercase transition hover:bg-rose-100"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="sm:col-span-2 rounded-[1.3rem] border border-dashed border-slate-300 bg-white/80 p-6 text-center text-sm text-slate-500">
                                Upload one image for a single-card product, or
                                upload multiple images for a luxury gallery
                                preview.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CatalogCardGallery({ images, title }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const galleryImages = images.length > 0 ? images : [];

    useEffect(() => {
        setActiveIndex(0);
    }, [title]);

    const activeImage =
        galleryImages[activeIndex] ??
        "https://placehold.co/800x600/f8fafc/1e293b?text=Catalog+Image";

    return (
        <div className="relative">
            <img
                src={activeImage}
                alt={title}
                className="h-48 w-full object-cover"
            />
            {galleryImages.length > 1 && (
                <div className="absolute inset-x-0 bottom-3 flex items-center justify-between gap-3 px-3">
                    <span className="rounded-full border border-white/20 bg-slate-950/60 px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur">
                        {activeIndex + 1} / {galleryImages.length}
                    </span>
                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-3 py-2 backdrop-blur">
                        {galleryImages.map((image, index) => (
                            <button
                                key={`${title}-${image}-${index}`}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className={`h-2.5 rounded-full transition ${
                                    activeIndex === index
                                        ? "w-7 bg-amber-300"
                                        : "w-2.5 bg-white/70"
                                }`}
                                aria-label={`Show admin catalog image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function formatFileSize(size) {
    if (size < 1024 * 1024) {
        return `${Math.max(1, Math.round(size / 1024))} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getInitialDashboardView() {
    if (typeof window === "undefined") {
        return {
            activeModule: "dashboard",
            catalogTab: "add",
            isCatalogOpen: false,
        };
    }

    const queryParams = new URLSearchParams(window.location.search);
    const shouldOpenCatalogList =
        queryParams.get("module") === "catalog" &&
        queryParams.get("tab") === "list";

    return {
        activeModule: shouldOpenCatalogList ? "catalog" : "dashboard",
        catalogTab: shouldOpenCatalogList ? "list" : "add",
        isCatalogOpen: shouldOpenCatalogList,
    };
}

export default function Dashboard({
    catalogItems = [],
    catalogCategories = [],
    adminMetrics = [],
    userRows = activityRows,
}) {
    const { auth, flash } = usePage().props;
    const initialDashboardView = useMemo(() => getInitialDashboardView(), []);
    const [activeModule, setActiveModule] = useState(
        initialDashboardView.activeModule,
    );
    const [catalogTab, setCatalogTab] = useState(
        initialDashboardView.catalogTab,
    );
    const [isCatalogOpen, setIsCatalogOpen] = useState(
        initialDashboardView.isCatalogOpen,
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [editingCatalogId, setEditingCatalogId] = useState(null);
    const [togglingCatalogId, setTogglingCatalogId] = useState(null);
    const catalogForm = useForm(initialCatalogData);
    const editCatalogForm = useForm(initialCatalogData);
    const deleteCatalogForm = useForm({});
    const resolvedMetrics =
        adminMetrics.length > 0 ? adminMetrics : metricCards;
    const categoryOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    [
                        ...catalogCategories,
                        ...catalogItems.map((item) => item.category),
                    ].filter(Boolean),
                ),
            ),
        [catalogCategories, catalogItems],
    );

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

    const editingCatalogItem = useMemo(
        () => catalogItems.find((item) => item.id === editingCatalogId) ?? null,
        [catalogItems, editingCatalogId],
    );

    const appendFiles = (form, files) => {
        form.setData("images", [...form.data.images, ...files]);
    };

    const removePendingFile = (form, fileIndex) => {
        form.setData(
            "images",
            form.data.images.filter((_, index) => index !== fileIndex),
        );
    };

    const toggleRetainedImage = (imagePath) => {
        const currentPaths = editCatalogForm.data.retained_image_paths;

        if (currentPaths.includes(imagePath)) {
            editCatalogForm.setData(
                "retained_image_paths",
                currentPaths.filter((currentPath) => currentPath !== imagePath),
            );

            return;
        }

        editCatalogForm.setData("retained_image_paths", [
            ...currentPaths,
            imagePath,
        ]);
    };

    const showCatalogList = () => {
        setActiveModule("catalog");
        setIsCatalogOpen(true);
        setCatalogTab("list");
        setSearchTerm("");
    };

    const reloadCatalogList = () => {
        showCatalogList();
        router.reload({
            only: ["catalogItems", "catalogCategories", "adminMetrics"],
            preserveScroll: true,
            onSuccess: showCatalogList,
        });
    };

    const handleCatalogCreate = (event) => {
        event.preventDefault();

        catalogForm.post(route("dashboard.catalog-items.store"), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                catalogForm.reset();
                catalogForm.setData("sort_order", "0");
                catalogForm.setData("is_active", true);
                catalogForm.setData("images", []);
                reloadCatalogList();
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
            images: [],
            retained_image_paths: item.image_urls ?? [],
            sort_order: String(item.sort_order ?? 0),
            is_active: Boolean(item.is_active),
        });
    };

    const handleCatalogUpdate = (event) => {
        event.preventDefault();

        if (!editingCatalogId) {
            return;
        }

        editCatalogForm.transform((data) => ({
            ...data,
            _method: "put",
        }));

        editCatalogForm.post(
            route("dashboard.catalog-items.update", editingCatalogId),
            {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    setEditingCatalogId(null);
                    editCatalogForm.reset();
                    reloadCatalogList();
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
                    reloadCatalogList();
                },
            },
        );
    };

    const handleCatalogToggleActive = (item) => {
        setTogglingCatalogId(item.id);

        router.put(
            route("dashboard.catalog-items.toggle-active", item.id),
            {
                is_active: !item.is_active,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => reloadCatalogList(),
                onFinish: () => setTogglingCatalogId(null),
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
                Create a premium catalog product with single or multiple gallery
                images.
            </p>

            <form onSubmit={handleCatalogCreate} className="mt-5 space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                    {catalogFieldConfig.map((field) => (
                        <div key={field.key}>
                            {field.type === "select" ? (
                                <CatalogSelect
                                    id={field.key}
                                    label={field.label}
                                    options={categoryOptions}
                                    value={catalogForm.data[field.key]}
                                    onChange={(event) =>
                                        catalogForm.setData(
                                            field.key,
                                            event.target.value,
                                        )
                                    }
                                />
                            ) : (
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
                            )}
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

                <CatalogImageUploader
                    title="Upload your catalog visuals"
                    helper="Use one image for a simple product card, or upload multiple images to create a richer product gallery for luxury presentation."
                    existingImages={[]}
                    retainedImagePaths={[]}
                    newFiles={catalogForm.data.images}
                    onFilesAdd={(files) => appendFiles(catalogForm, files)}
                    onExistingRemove={() => {}}
                    onNewFileRemove={(index) =>
                        removePendingFile(catalogForm, index)
                    }
                    error={catalogForm.errors.images}
                />

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
                            <CatalogCardGallery
                                images={item.image_urls ?? []}
                                title={item.name}
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
                                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                            item.is_active
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-slate-200 text-slate-600"
                                        }`}
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
                                <div className="mt-3 flex items-center justify-between text-[0.68rem] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                                    <span>
                                        {item.image_urls?.length ?? 0} image
                                        {(item.image_urls?.length ?? 0) === 1
                                            ? ""
                                            : "s"}
                                    </span>
                                    <span>Sort {item.sort_order}</span>
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
                                            handleCatalogToggleActive(item)
                                        }
                                        disabled={togglingCatalogId === item.id}
                                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {item.is_active
                                            ? "Deactivate"
                                            : "Activate"}
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
                        className="mt-5 space-y-5"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            {catalogFieldConfig.map((field) => (
                                <div key={`edit-${field.key}`}>
                                    {field.type === "select" ? (
                                        <CatalogSelect
                                            id={`edit-${field.key}`}
                                            label={field.label}
                                            options={categoryOptions}
                                            value={
                                                editCatalogForm.data[field.key]
                                            }
                                            onChange={(event) =>
                                                editCatalogForm.setData(
                                                    field.key,
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    ) : (
                                        <CatalogInput
                                            id={`edit-${field.key}`}
                                            label={field.label}
                                            type={field.type}
                                            min={field.min}
                                            value={
                                                editCatalogForm.data[field.key]
                                            }
                                            onChange={(event) =>
                                                editCatalogForm.setData(
                                                    field.key,
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    )}
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

                        <CatalogImageUploader
                            title="Refine your product gallery"
                            helper="Keep the current luxury shots you still want, remove the weaker ones, and upload fresh visuals to strengthen the card presentation."
                            existingImages={editingCatalogItem.image_urls ?? []}
                            retainedImagePaths={
                                editCatalogForm.data.retained_image_paths
                            }
                            newFiles={editCatalogForm.data.images}
                            onFilesAdd={(files) =>
                                appendFiles(editCatalogForm, files)
                            }
                            onExistingRemove={toggleRetainedImage}
                            onNewFileRemove={(index) =>
                                removePendingFile(editCatalogForm, index)
                            }
                            error={editCatalogForm.errors.images}
                        />

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
                                        Add single or multiple product images
                                        for a more premium catalog presentation
                                        across admin and storefront cards.
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
