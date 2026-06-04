import { Head } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import CatalogProductCard from "../../Components/CatalogProductCard";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";

const ITEMS_PER_PAGE = 6;

const categoryBrandMap = {
    Trending: "PrintSyde Studio",
    Corporate: "Executive Line",
    Sports: "Motion Works",
    Events: "Campaign House",
};

const categorySizeMap = {
    Trending: ["S-XL", "2XL+"],
    Corporate: ["M-XL", "2XL+"],
    Sports: ["S-XL", "Team Fit"],
    Events: ["One Fit", "S-XL"],
};

const categoryColorMap = {
    Trending: ["Black", "Stone", "Olive"],
    Corporate: ["Navy", "White", "Charcoal"],
    Sports: ["Blue", "Red", "Black"],
    Events: ["White", "Gold", "Black"],
};

const priceRanges = [
    {
        id: "all",
        label: "All Prices",
        min: 0,
        max: Number.POSITIVE_INFINITY,
    },
    {
        id: "under-1200",
        label: "Under PKR 1,200",
        min: 0,
        max: 1199,
    },
    {
        id: "1200-1399",
        label: "PKR 1,200 - 1,399",
        min: 1200,
        max: 1399,
    },
    {
        id: "1400-plus",
        label: "PKR 1,400+",
        min: 1400,
        max: Number.POSITIVE_INFINITY,
    },
];

const sortOptions = {
    featured: "Featured",
    priceAsc: "Price: Low to High",
    priceDesc: "Price: High to Low",
    minimumOrder: "MOQ: Low to High",
};

function enrichCatalogItem(item, index) {
    const category = item.category ?? item.tab;
    const availableSizes = categorySizeMap[category] ?? ["S-XL"];
    const availableColors = categoryColorMap[category] ?? ["Black", "White"];

    return {
        ...item,
        id: `${category}-${item.name}-${index}`,
        category,
        brand: categoryBrandMap[category] ?? "PrintSyde Premium",
        sizes: availableSizes,
        colors: availableColors,
        badge: item.printType,
        detail: `${item.printType} finish`,
    };
}

function formatCurrency(value) {
    return `PKR ${value.toLocaleString()}`;
}

export default function Collections({
    title = "PrintSyde Collections | Luxury Apparel Lines",
    catalogItems = [],
}) {
    const products = useMemo(
        () => catalogItems.map((item, index) => enrichCatalogItem(item, index)),
        [catalogItems],
    );

    const categories = useMemo(
        () => [...new Set(products.map((item) => item.category))],
        [products],
    );

    const brands = useMemo(
        () => [...new Set(products.map((item) => item.brand))],
        [products],
    );

    const sizes = useMemo(
        () => [...new Set(products.flatMap((item) => item.sizes))],
        [products],
    );

    const colors = useMemo(
        () => [...new Set(products.flatMap((item) => item.colors))],
        [products],
    );

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState("all");
    const [sortBy, setSortBy] = useState("featured");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = useMemo(() => {
        const activePriceRange =
            priceRanges.find((range) => range.id === selectedPriceRange) ??
            priceRanges[0];

        const filtered = products.filter((product) => {
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category);
            const matchesBrand =
                selectedBrands.length === 0 ||
                selectedBrands.includes(product.brand);
            const matchesSize =
                selectedSizes.length === 0 ||
                product.sizes.some((size) => selectedSizes.includes(size));
            const matchesColor =
                selectedColors.length === 0 ||
                product.colors.some((color) => selectedColors.includes(color));
            const matchesPrice =
                product.startingPrice >= activePriceRange.min &&
                product.startingPrice <= activePriceRange.max;

            return (
                matchesCategory &&
                matchesBrand &&
                matchesSize &&
                matchesColor &&
                matchesPrice
            );
        });

        return [...filtered].sort((firstProduct, secondProduct) => {
            if (sortBy === "priceAsc") {
                return firstProduct.startingPrice - secondProduct.startingPrice;
            }

            if (sortBy === "priceDesc") {
                return secondProduct.startingPrice - firstProduct.startingPrice;
            }

            if (sortBy === "minimumOrder") {
                return (
                    firstProduct.minimumOrderQuantity -
                    secondProduct.minimumOrderQuantity
                );
            }

            return 0;
        });
    }, [
        products,
        selectedCategories,
        selectedBrands,
        selectedSizes,
        selectedColors,
        selectedPriceRange,
        sortBy,
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
    );

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

        return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, filteredProducts]);

    const activeFilterCount =
        selectedCategories.length +
        selectedBrands.length +
        selectedSizes.length +
        selectedColors.length +
        (selectedPriceRange === "all" ? 0 : 1);

    useEffect(() => {
        setCurrentPage(1);
    }, [
        selectedCategories,
        selectedBrands,
        selectedSizes,
        selectedColors,
        selectedPriceRange,
        sortBy,
    ]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedSizes([]);
        setSelectedColors([]);
        setSelectedPriceRange("all");
        setSortBy("featured");
        setCurrentPage(1);
    };

    const toggleSelection = (value, setSelection) => {
        setSelection((currentSelection) => {
            if (currentSelection.includes(value)) {
                return currentSelection.filter(
                    (selectedValue) => selectedValue !== value,
                );
            }

            return [...currentSelection, value];
        });
    };

    const paginationRange = Array.from(
        { length: totalPages },
        (_, index) => index + 1,
    );
    const featuredCategories = categories.slice(0, 3).join(" / ");
    const minimumPrice =
        products.length > 0
            ? Math.min(...products.map((product) => product.startingPrice))
            : 0;

    return (
        <>
            <Head title={title} />

            <div className="min-h-screen text-slate-800">
                <Header />
                <Navbar />

                {/* <section className="lux-shell py-8 sm:py-12">
                    <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
                        <div className="lux-panel-dark px-6 py-8 sm:px-8 sm:py-10">
                            <p className="lux-kicker border-amber-400/30 bg-white/5 text-amber-300">
                                Collection Catalog
                            </p>
                            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                                Browse premium apparel options with a cleaner
                                buying flow.
                            </h1>
                            <p className="mt-5 text-sm leading-8 text-slate-300 sm:text-base">
                                PrintSyde ki collection page ko ab catalog
                                experience ki tarah redesign kiya gaya hai,
                                jahan aap categories, pricing, finishes, aur
                                presentation options ko quickly compare kar
                                saktay hain.
                            </p>
                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-5">
                                    <p className="text-3xl font-black text-white">
                                        {products.length}
                                    </p>
                                    <p className="mt-2 text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">
                                        Total Styles
                                    </p>
                                </div>
                                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-5">
                                    <p className="text-3xl font-black text-white">
                                        {categories.length}
                                    </p>
                                    <p className="mt-2 text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">
                                        Shop Categories
                                    </p>
                                </div>
                                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-5">
                                    <p className="text-3xl font-black text-white">
                                        {formatCurrency(minimumPrice)}
                                    </p>
                                    <p className="mt-2 text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">
                                        Starting From
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lux-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
                            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                                <div>
                                    <p className="lux-kicker">
                                        Curated Selection
                                    </p>
                                    <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                        A storefront-style layout built for
                                        comparing styles at a glance.
                                    </h2>
                                    <p className="mt-4 lux-copy">
                                        Filter combinations update the grid
                                        instantly, so the page feels more like a
                                        live catalog than a static showcase. The
                                        same warm palette, rounded panels, and
                                        premium contrast are carried through
                                        from the rest of the site.
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {[
                                            featuredCategories,
                                            "Responsive grid",
                                            "Live filters",
                                            "Paged browsing",
                                        ]
                                            .filter(Boolean)
                                            .map((item) => (
                                                <span
                                                    key={item}
                                                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-slate-700 uppercase"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-[1.85rem] border border-amber-100 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(120,53,15,0.82))] p-6 text-white shadow-[0_22px_40px_rgba(15,23,42,0.16)]">
                                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                                    <div className="absolute -bottom-16 left-0 h-32 w-32 rounded-full bg-amber-300/20 blur-2xl" />
                                    <div className="relative">
                                        <p className="text-xs font-semibold tracking-[0.18em] text-amber-200 uppercase">
                                            Catalog Snapshot
                                        </p>
                                        <div className="mt-6 grid gap-4">
                                            <div className="rounded-[1.4rem] border border-white/10 bg-white/10 px-4 py-4">
                                                <p className="text-sm text-slate-200">
                                                    Most flexible filter
                                                </p>
                                                <p className="mt-2 text-xl font-black">
                                                    Category + Price Range
                                                </p>
                                            </div>
                                            <div className="rounded-[1.4rem] border border-white/10 bg-white/10 px-4 py-4">
                                                <p className="text-sm text-slate-200">
                                                    Common finishes
                                                </p>
                                                <p className="mt-2 text-xl font-black">
                                                    DTF, Screen, Embroidery
                                                </p>
                                            </div>
                                            <div className="rounded-[1.4rem] border border-white/10 bg-white/10 px-4 py-4">
                                                <p className="text-sm text-slate-200">
                                                    Browsing mode
                                                </p>
                                                <p className="mt-2 text-xl font-black">
                                                    Mobile to Desktop Ready
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                <section className="lux-shell pb-10 sm:pb-14">
                    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                        <aside className="lux-panel h-fit px-5 py-6 sm:px-6 sm:py-7 lg:sticky lg:top-32">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="lux-kicker">Filters</p>
                                    <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
                                        Narrow the catalog
                                    </h2>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        Pick the product direction that fits
                                        your collection goals.
                                    </p>
                                </div>
                                {activeFilterCount > 0 && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[0.72rem] font-semibold tracking-[0.16em] text-slate-700 uppercase transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>

                            <div className="mt-6 space-y-6">
                                <FilterSection title="Category">
                                    {categories.map((category) => (
                                        <CheckboxPill
                                            key={category}
                                            label={category}
                                            checked={selectedCategories.includes(
                                                category,
                                            )}
                                            onChange={() =>
                                                toggleSelection(
                                                    category,
                                                    setSelectedCategories,
                                                )
                                            }
                                        />
                                    ))}
                                </FilterSection>

                                <FilterSection title="Price Range">
                                    {priceRanges.map((range) => (
                                        <RadioPill
                                            key={range.id}
                                            label={range.label}
                                            checked={
                                                selectedPriceRange === range.id
                                            }
                                            onChange={() =>
                                                setSelectedPriceRange(range.id)
                                            }
                                        />
                                    ))}
                                </FilterSection>

                                <FilterSection title="Brand">
                                    {brands.map((brand) => (
                                        <CheckboxPill
                                            key={brand}
                                            label={brand}
                                            checked={selectedBrands.includes(
                                                brand,
                                            )}
                                            onChange={() =>
                                                toggleSelection(
                                                    brand,
                                                    setSelectedBrands,
                                                )
                                            }
                                        />
                                    ))}
                                </FilterSection>

                                <FilterSection title="Size">
                                    {sizes.map((size) => (
                                        <CheckboxPill
                                            key={size}
                                            label={size}
                                            checked={selectedSizes.includes(
                                                size,
                                            )}
                                            onChange={() =>
                                                toggleSelection(
                                                    size,
                                                    setSelectedSizes,
                                                )
                                            }
                                        />
                                    ))}
                                </FilterSection>

                                <FilterSection title="Color">
                                    <div className="grid grid-cols-2 gap-3">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() =>
                                                    toggleSelection(
                                                        color,
                                                        setSelectedColors,
                                                    )
                                                }
                                                className={`flex items-center gap-3 rounded-[1.1rem] border px-3 py-3 text-left text-xs font-semibold tracking-[0.12em] uppercase transition ${
                                                    selectedColors.includes(
                                                        color,
                                                    )
                                                        ? "border-slate-900 bg-slate-950 text-white shadow-lg"
                                                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                                }`}
                                            >
                                                <span
                                                    className={`h-3.5 w-3.5 rounded-full border border-black/10 ${colorSwatchClass(
                                                        color,
                                                    )}`}
                                                />
                                                <span>{color}</span>
                                            </button>
                                        ))}
                                    </div>
                                </FilterSection>
                            </div>
                        </aside>

                        <div className="space-y-6">
                            <div className="lux-panel px-5 py-5 sm:px-6">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold tracking-[0.18em] text-amber-700 uppercase">
                                            Catalog Results
                                        </p>
                                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                            {filteredProducts.length} style
                                            {filteredProducts.length === 1
                                                ? ""
                                                : "s"}{" "}
                                            matched
                                        </h2>
                                        <p className="mt-2 text-sm text-slate-600">
                                            Page {currentPage} of {totalPages}{" "}
                                            with live filters applied.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-slate-600 uppercase">
                                            {activeFilterCount} active filter
                                            {activeFilterCount === 1 ? "" : "s"}
                                        </div>
                                        <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold tracking-[0.16em] text-slate-600 uppercase">
                                            <span>Sort</span>
                                            <select
                                                value={sortBy}
                                                onChange={(event) =>
                                                    setSortBy(
                                                        event.target.value,
                                                    )
                                                }
                                                className="bg-transparent text-slate-950 outline-none"
                                            >
                                                {Object.entries(
                                                    sortOptions,
                                                ).map(([value, label]) => (
                                                    <option
                                                        key={value}
                                                        value={value}
                                                    >
                                                        {label}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
                                {paginatedProducts.map((product) => (
                                    <CatalogProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}

                                {filteredProducts.length === 0 && (
                                    <article className="md:col-span-2 2xl:col-span-3">
                                        <div className="lux-panel px-8 py-14 text-center">
                                            <p className="lux-kicker">
                                                No Matches
                                            </p>
                                            <h3 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
                                                No catalog styles matched these
                                                filters.
                                            </h3>
                                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
                                                Try clearing one or two filters
                                                to explore more options across
                                                the current collection range.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={clearFilters}
                                                className="lux-button-primary mt-8"
                                            >
                                                Clear All Filters
                                            </button>
                                        </div>
                                    </article>
                                )}
                            </div>

                            {filteredProducts.length > 0 && (
                                <div className="lux-panel px-5 py-5 sm:px-6">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm text-slate-600">
                                            Showing {paginatedProducts.length}{" "}
                                            of {filteredProducts.length}{" "}
                                            filtered styles.
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setCurrentPage((page) =>
                                                        Math.max(1, page - 1),
                                                    )
                                                }
                                                disabled={currentPage === 1}
                                                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold tracking-[0.16em] text-slate-700 uppercase transition disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                Previous
                                            </button>
                                            {paginationRange.map((page) => (
                                                <button
                                                    key={page}
                                                    type="button"
                                                    onClick={() =>
                                                        setCurrentPage(page)
                                                    }
                                                    className={`h-11 min-w-11 rounded-full px-4 text-xs font-semibold tracking-[0.16em] uppercase transition ${
                                                        currentPage === page
                                                            ? "bg-slate-950 text-white shadow-lg"
                                                            : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setCurrentPage((page) =>
                                                        Math.min(
                                                            totalPages,
                                                            page + 1,
                                                        ),
                                                    )
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold tracking-[0.16em] text-slate-700 uppercase transition disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}

function FilterSection({ title, children }) {
    return (
        <section>
            <h3 className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                {title}
            </h3>
            <div className="mt-3 space-y-3">{children}</div>
        </section>
    );
}

function CheckboxPill({ label, checked, onChange }) {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`flex w-full items-center justify-between rounded-[1.2rem] border px-4 py-3 text-left text-xs font-semibold tracking-[0.14em] uppercase transition ${
                checked
                    ? "border-slate-900 bg-slate-950 text-white shadow-lg"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
        >
            <span>{label}</span>
            <span
                className={`h-2.5 w-2.5 rounded-full ${
                    checked ? "bg-amber-300" : "bg-slate-300"
                }`}
            />
        </button>
    );
}

function RadioPill({ label, checked, onChange }) {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`flex w-full items-center justify-between rounded-[1.2rem] border px-4 py-3 text-left text-xs font-semibold tracking-[0.14em] uppercase transition ${
                checked
                    ? "border-amber-400/60 bg-amber-50 text-slate-950 shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
        >
            <span>{label}</span>
            <span
                className={`h-4 w-4 rounded-full border ${
                    checked
                        ? "border-amber-500 bg-amber-500"
                        : "border-slate-300 bg-white"
                }`}
            />
        </button>
    );
}

function colorSwatchClass(color) {
    const swatches = {
        Black: "bg-slate-950",
        Stone: "bg-stone-300",
        Olive: "bg-[#66754a]",
        Navy: "bg-slate-800",
        White: "bg-white",
        Charcoal: "bg-neutral-700",
        Blue: "bg-blue-600",
        Red: "bg-red-500",
        Gold: "bg-amber-400",
    };

    return swatches[color] ?? "bg-slate-200";
}
