import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import CatalogProductCard from "../Components/CatalogProductCard";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

const sliderItems = [
    {
        title: "Luxury Apparel Presentation For Modern Brands",
        subtitle:
            "Premium custom T-shirts, elevated design direction, and disciplined production for launches, campaigns, teams, and retail-ready collections.",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1600&q=80",
    },
    {
        title: "Corporate Uniforms With A Polished Brand Finish",
        subtitle:
            "Professional pieces tailored for office teams, executive gifting, and high-visibility events where consistency matters.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80",
    },
    {
        title: "Fast Premium Merch For Product Launches And Events",
        subtitle:
            "From concept to dispatch, we shape apparel experiences that feel intentional, refined, and ready to represent your brand.",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=80",
    },
];

const trustStats = [
    { value: "10k+", label: "Satisfied Buyers" },
    { value: "180+", label: "Projects Delivered" },
    { value: "98%", label: "Repeat Satisfaction" },
    { value: "48 Hrs", label: "Quote Turnaround" },
];

const servicePillars = [
    {
        title: "Brand Consultation",
        description:
            "Collection direction, fit planning, and print strategy are carefully aligned to support your brand positioning—ensuring that every design decision, silhouette, and visual element works cohesively to reflect your identity, resonate with your target audience, and strengthen your overall market presence.",
    },
    {
        title: "Premium Production",
        description:
            "Fabric sourcing, sampling, and quality-controlled manufacturing are managed within a single, structured workflow to ensure consistency, efficiency, and reliable outcomes at every stage.",
    },
    {
        title: "Reliable Fulfilment",
        description:
            "Timely dispatch, defined packaging standards, and dedicated support for corporate or campaign-scale orders—ensuring smooth coordination, consistent presentation, and reliable delivery even at larger volumes.",
    },
];

const collections = [
    {
        title: "Oversized Fit",
        desc: "Heavy GSM silhouettes for bold, premium everyday streetwear drops.",
    },
    {
        title: "Corporate Essentials",
        desc: "Clean office and teamwear options designed for polished brand visibility.",
    },
    {
        title: "Event Merchandise",
        desc: "Fast-moving apparel for launches, festivals, campaigns, and communities.",
    },
    {
        title: "Eco Cotton",
        desc: "Softer sustainable choices with a refined hand-feel and long-wear comfort.",
    },
];

const materialHighlights = [
    "High-retention screen printing and DTF finishing",
    "Embroidery-ready garments for elevated branding",
    "Balanced quality control at every production step",
    "Luxury packaging support for premium presentations",
];

const processSteps = [
    {
        step: "01",
        title: "Discovery Brief",
        detail: "You share your audience, quantity, design idea, and timeline.",
    },
    {
        step: "02",
        title: "Concept Direction",
        detail: "We provide mockups, fabric suggestions, and print approach recommendations.",
    },
    {
        step: "03",
        title: "Production Control",
        detail: "We manage sampling, quality checks, and timeline updates to ensure a polished final product.",
    },
    {
        step: "04",
        title: "Dispatch & Support",
        detail: "We handle timely dispatch, packaging standards, and post-delivery support for a premium client experience.",
    },
];

const testimonials = [
    {
        quote: "PrintSyde ke sath kaam karna bohat seamless experience tha. Unki team ne meri vision ko samjha aur usko reality mein convert kiya with great attention to detail.",
        name: "Areeba Khan",
        role: "Brand Manager",
    },
    {
        quote: "Corporate team uniforms ke liye unka process bohat clear tha. Design approval se le kar final delivery tak har step professional raha.",
        name: "Hamza Waheed",
        role: "Operations Lead",
    },
];

export default function Home({
    title = "PrintSyde | Premium Custom Apparel",
    catalogTabs = [],
    catalogItems = [],
}) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeCatalogTab, setActiveCatalogTab] = useState(
        catalogTabs[0] ?? "",
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide(
                (currentSlide) => (currentSlide + 1) % sliderItems.length,
            );
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (!activeCatalogTab && catalogTabs.length > 0) {
            setActiveCatalogTab(catalogTabs[0]);
        }
    }, [activeCatalogTab, catalogTabs]);

    const filteredCatalogItems = activeCatalogTab
        ? catalogItems.filter((item) => item.tab === activeCatalogTab)
        : catalogItems;

    return (
        <>
            <Head title={title} />

            <div id="top" className="min-h-screen text-slate-800">
                <Header />
                <Navbar />

                <section className="relative overflow-hidden px-3 pb-8 pt-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/60 shadow-[0_30px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/60">
                        <div className="relative min-h-[620px]">
                            {sliderItems.map((item, index) => (
                                <article
                                    key={item.title}
                                    className={`absolute inset-0 transition-opacity duration-700 ${
                                        index === activeSlide
                                            ? "opacity-100"
                                            : "pointer-events-none opacity-0"
                                    }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.90)_0%,rgba(15,23,42,0.76)_42%,rgba(15,23,42,0.24)_100%)]" />
                                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent" />
                                    <div className="lux-shell relative flex min-h-[620px] items-center py-16 sm:py-20">
                                        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                                            <div className="max-w-2xl text-white">
                                                <p className="lux-kicker border-amber-400/30 bg-white/10 text-amber-300">
                                                    Premium Custom Apparel
                                                    Studio
                                                </p>
                                                <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                                    {item.title}
                                                </h1>
                                                <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
                                                    {item.subtitle}
                                                </p>
                                                <div
                                                    id="order"
                                                    className="mt-8 flex flex-wrap gap-4"
                                                >
                                                    <a
                                                        href="#catalog"
                                                        className="lux-button-primary"
                                                    >
                                                        Explore Catalog
                                                    </a>
                                                    <a
                                                        href="#services"
                                                        className="lux-button-secondary border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/15"
                                                    >
                                                        View Services
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="hidden lg:flex lg:items-end lg:justify-end">
                                                <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-md">
                                                    <p className="text-xs font-semibold tracking-[0.2em] text-amber-300 uppercase">
                                                        Executive Summary
                                                    </p>
                                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                                        {trustStats.map(
                                                            (stat) => (
                                                                <div
                                                                    key={
                                                                        stat.label
                                                                    }
                                                                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-5"
                                                                >
                                                                    <p className="text-3xl font-black text-white">
                                                                        {
                                                                            stat.value
                                                                        }
                                                                    </p>
                                                                    <p className="mt-2 text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">
                                                                        {
                                                                            stat.label
                                                                        }
                                                                    </p>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="border-t border-white/10 bg-slate-950/95 px-6 py-5 text-white backdrop-blur-md">
                            <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                                    {trustStats.map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                                        >
                                            <p className="text-2xl font-black">
                                                {stat.value}
                                            </p>
                                            <p className="mt-1 text-[0.7rem] font-semibold tracking-[0.16em] text-slate-300 uppercase">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2 self-end lg:self-auto">
                                    {sliderItems.map((item, index) => (
                                        <button
                                            key={item.title}
                                            type="button"
                                            onClick={() =>
                                                setActiveSlide(index)
                                            }
                                            className={`h-2.5 rounded-full transition ${
                                                index === activeSlide
                                                    ? "w-10 bg-amber-300"
                                                    : "w-2.5 bg-white/40"
                                            }`}
                                            aria-label={`Show slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section id="services" className="lux-shell py-10 sm:py-14">
                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="lux-panel px-6 py-8 sm:px-8 sm:py-10">
                        <p className="lux-kicker">Signature Direction</p>
                        <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            Refined design method across strategy, production,
                            and presentation.
                        </h2>
                        <p className="mt-5 lux-copy">
                           We don’t just offer a printing service. PrintSyde plans apparel as a complete brand experience—ensuring that every section, every product, and every customer touchpoint feels polished, cohesive, and thoughtfully executed.
                        </p>
                        <div className="mt-8 grid gap-3">
                            {materialHighlights.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm font-medium text-slate-700"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {servicePillars.map((pillar) => (
                            <article
                                key={pillar.title}
                                className="lux-panel px-6 py-8"
                            >
                                <p className="text-xs font-semibold tracking-[0.18em] text-amber-700 uppercase">
                                    Service Pillar
                                </p>
                                <h3 className="mt-4 text-xl font-black text-slate-950">
                                    {pillar.title}
                                </h3>
                                <p className="mt-4 text-sm leading-7 text-slate-600">
                                    {pillar.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section> */}

                <section id="catalog" className="lux-shell py-10 sm:py-14">
                    <div className="lux-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
                        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                            <div className="max-w-2xl">
                                <p className="lux-kicker">Featured Catalog</p>
                                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                    Browse market-ready concepts before your
                                    custom order begins.
                                </h2>
                                <p className="mt-4 lux-copy">
                                    With the sample catalog, you can quickly
                                    compare styles, print types, and pricing
                                    directions.
                                </p>
                            </div>
                            <a href="#contact" className="lux-button-primary">
                                Get Custom Quote
                            </a>
                        </div>

                        {catalogTabs.length > 0 && (
                            <div className="mb-8 flex flex-wrap gap-3">
                                {catalogTabs.map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setActiveCatalogTab(tab)}
                                        className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase transition ${
                                            activeCatalogTab === tab
                                                ? "bg-slate-950 text-white shadow-lg"
                                                : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        )}

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {filteredCatalogItems.map((shirt, index) => (
                            <CatalogProductCard
                                key={`${shirt.tab}-${shirt.name}`}
                                product={{
                                    id: `${shirt.tab}-${shirt.name}-${index}`,
                                    ...shirt,
                                    category: shirt.category ?? shirt.tab,
                                    brand: shirt.tab,
                                    detail: shirt.printType,
                                    badge: shirt.printType,
                                    sizes: ["Custom Fit"],
                                    colors: ["Black", "White", "Gold"],
                                }}
                                actionLabel="Get Quote"
                                className="rounded-[1.75rem]"
                            />
                        ))}

                            {catalogItems.length === 0 && (
                                <article className="col-span-full rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50/70 p-10 text-center">
                                    <p className="text-sm font-semibold tracking-[0.1em] text-slate-600 uppercase">
                                        Catalog items abhi available nahi hain.
                                    </p>
                                </article>
                            )}
                        </div>
                    </div>
                </section>

                <section id="collections" className="lux-shell py-10 sm:py-14">
                    <div className="mb-8 max-w-3xl">
                        <p className="lux-kicker">Collection Types</p>
                        <h2 className="mt-5 lux-title">
                            Signature product categories built for premium brand
                            visibility.
                        </h2>
                        <p className="mt-5 lux-copy">
                            Each collection is developed according to a distinct
                            audience, usage, and price point, so that your
                            presentation is not just appealing, but also
                            strategically relevant.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {collections.map((collection) => (
                            <article
                                key={collection.title}
                                className="lux-panel px-6 py-8"
                            >
                                <div className="h-24 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(120,53,15,0.80))]" />
                                <h3 className="mt-6 text-xl font-black text-slate-950">
                                    {collection.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    {collection.desc}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="lux-shell py-10 sm:py-14">
                    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                        <div className="lux-panel overflow-hidden p-3">
                            <img
                                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
                                alt="Custom T-shirt printing process"
                                className="h-full min-h-[420px] w-full rounded-[1.6rem] object-cover"
                            />
                        </div>

                        <div className="lux-panel-dark px-6 py-8 sm:px-8 sm:py-10">
                            <p className="lux-kicker border-amber-400/30 bg-white/5 text-amber-300">
                                Why PrintSyde
                            </p>
                            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Built for businesses that want quality to look
                                as premium as the promise.
                            </h2>
                            <p className="mt-5 text-sm leading-8 text-slate-300 sm:text-base">
                                Our team does not treat production as merely an
                                operational task. In every order, product
                                quality, visual consistency, and the delivery
                                experience are managed at the level of brand
                                perception.
                            </p>
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {[
                                    "Premium fabric sourcing and finishing",
                                    "Screen print, DTF, and embroidery options",
                                    "Bulk program pricing for teams and events",
                                    "Reliable communication from briefing to dispatch",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-200"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="lux-shell py-10 sm:py-14">
                    <div className="mb-8 max-w-3xl">
                        <p className="lux-kicker">How It Works</p>
                        <h2 className="mt-5 lux-title">
                            A structured production journey with a luxury client
                            experience.
                        </h2>
                        <p className="mt-5 lux-copy">
                            The process from discovery to dispatch has been
                            designed in such a way that you experience clarity,
                            confidence, and a premium level of service.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {processSteps.map((item) => (
                            <article
                                key={item.step}
                                className="lux-panel-dark px-6 py-8"
                            >
                                <p className="text-sm font-black tracking-[0.2em] text-amber-300 uppercase">
                                    {item.step}
                                </p>
                                <h3 className="mt-5 text-xl font-black text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-4 text-sm leading-7 text-slate-300">
                                    {item.detail}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="lux-shell py-10 sm:py-14">
                    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="lux-panel px-6 py-8 sm:px-8 sm:py-10">
                            <p className="lux-kicker">Client Confidence</p>
                            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                The kind of presentation clients remember after
                                delivery.
                            </h2>
                            <p className="mt-5 lux-copy">
                                Premium apparel ka impact sirf product tak
                                limited nahi hota. Jab quality, packaging, aur
                                service aligned hotay hain to brand perception
                                naturally elevate hoti hai.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {testimonials.map((item) => (
                                <article
                                    key={item.name}
                                    className="lux-panel px-6 py-8"
                                >
                                    <p className="text-3xl leading-none text-amber-600">
                                        "
                                    </p>
                                    <p className="mt-4 text-sm leading-8 text-slate-700">
                                        {item.quote}
                                    </p>
                                    <p className="mt-6 text-base font-black text-slate-950">
                                        {item.name}
                                    </p>
                                    <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
                                        {item.role}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="lux-shell py-10 sm:py-14">
                    <div className="lux-panel-dark px-6 py-10 text-center sm:px-10 sm:py-14">
                        <p className="lux-kicker border-amber-400/30 bg-white/5 text-amber-300">
                            Ready To Begin
                        </p>
                        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Launch a custom apparel experience that looks
                            premium across every touchpoint.
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
                            Aaj hi apna brief share karein. Hum aapko fabric
                            options, design approach, pricing direction, aur
                            production timeline ke sath guide karenge.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="mailto:support@printsyde.com"
                                className="lux-button-primary"
                            >
                                Contact Our Team
                            </a>
                            <a
                                href="/about"
                                className="lux-button-secondary border-white/20 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                            >
                                About PrintSyde
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
