import { useEffect, useMemo, useState } from "react";

export default function CatalogProductCard({
    product,
    actionLabel = "Request Quote",
    actionHref = "mailto:support@printsyde.com",
    className = "",
}) {
    const images = useMemo(() => {
        if (product.images?.length) {
            return product.images;
        }

        return product.image ? [product.image] : [];
    }, [product.image, product.images]);

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        setActiveImageIndex(0);
    }, [product.id]);

    const activeImage = images[activeImageIndex] ?? product.image;

    return (
        <article
            className={`overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white/90 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.13)] ${className}`}
        >
            <div className="relative">
                <img
                    src={activeImage}
                    alt={product.name}
                    className="h-72 w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/85 px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-slate-800 uppercase shadow-sm backdrop-blur">
                    {product.category}
                </span>

                {images.length > 1 && (
                    <div className="absolute inset-x-0 bottom-4 flex items-center justify-between gap-3 px-4">
                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/55 px-3 py-2 text-[0.68rem] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur">
                            <span>{activeImageIndex + 1}</span>
                            <span>/</span>
                            <span>{images.length}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/55 px-3 py-2 backdrop-blur">
                            {images.map((image, index) => (
                                <button
                                    key={`${product.id}-${image}-${index}`}
                                    type="button"
                                    onClick={() => setActiveImageIndex(index)}
                                    className={`h-2.5 rounded-full transition ${
                                        activeImageIndex === index
                                            ? "w-8 bg-amber-300"
                                            : "w-2.5 bg-white/65"
                                    }`}
                                    aria-label={`Show product image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-amber-700 uppercase">
                            {product.brand}
                        </p>
                        <h3 className="mt-3 text-xl font-black text-slate-950">
                            {product.name}
                        </h3>
                    </div>
                    <p className="text-lg font-black text-slate-950">
                        {product.price}
                    </p>
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                    {product.detail}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3">
                        <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-slate-500 uppercase">
                            Minimum Order
                        </p>
                        <p className="mt-2 text-sm font-black text-slate-900">
                            {product.minOrder}
                        </p>
                    </div>
                    <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3">
                        <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-slate-500 uppercase">
                            Decoration
                        </p>
                        <p className="mt-2 text-sm font-black text-slate-900">
                            {product.badge}
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                        <span
                            key={`${product.id}-${size}`}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-slate-700 uppercase"
                        >
                            {size}
                        </span>
                    ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        {product.colors.map((color) => (
                            <span
                                key={`${product.id}-${color}`}
                                className={`h-4 w-4 rounded-full border border-black/10 ${colorSwatchClass(
                                    color,
                                )}`}
                                title={color}
                            />
                        ))}
                    </div>
                    <a
                        href={actionHref}
                        className="lux-button-secondary px-5 py-2.5 text-[0.72rem]"
                    >
                        {actionLabel}
                    </a>
                </div>
            </div>
        </article>
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
