import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

const sliderItems = [
    {
        title: "Streetwear Collection Design",
        subtitle: "Premium prints on oversized cotton tees for modern fashion brands.",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1600&q=80",
    },
    {
        title: "Corporate Team Uniforms",
        subtitle: "Clean, branded T-shirts for office teams, events, and company culture.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80",
    },
    {
        title: "Event and Campaign Merch",
        subtitle: "Fast-turnaround custom apparel for launches, campaigns, and communities.",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=80",
    },
];

const collections = [
    { title: "Oversized Fit", desc: "Trendy cuts with heavy GSM fabric for bold everyday style." },
    { title: "Performance Wear", desc: "Breathable moisture-control fabric for teams and active brands." },
    { title: "Eco Cotton", desc: "Sustainable options with soft finish and long-lasting prints." },
    { title: "Minimal Essentials", desc: "Classic colorways for clean, modern, and premium branding." },
];

const processSteps = [
    { step: "1. Share Brief", detail: "Aap idea, logo, quantity, aur deadline share karein." },
    { step: "2. Design Preview", detail: "Hamari team mockups aur color options send karti hai." },
    { step: "3. Production", detail: "Approved design ke baad quality-controlled printing start hoti hai." },
    { step: "4. Delivery", detail: "Time par safe packaging ke sath order dispatch hota hai." },
];

export default function Home({ catalogTabs = [], catalogItems = [] }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeCatalogTab, setActiveCatalogTab] = useState(catalogTabs[0] ?? "");

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((currentSlide) => (currentSlide + 1) % sliderItems.length);
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (!activeCatalogTab && catalogTabs.length > 0) {
            setActiveCatalogTab(catalogTabs[0]);
        }
    }, [activeCatalogTab, catalogTabs]);

    const filteredCatalogItems = catalogItems.filter((item) => item.tab === activeCatalogTab);

    return (
        <div id="top" className="min-h-screen bg-slate-50 text-slate-800">
            <Header />
            <Navbar />

            <section className="relative overflow-hidden">
                <div className="relative h-[65vh] min-h-[460px]">
                    {sliderItems.map((item, index) => (
                        <article
                            key={item.title}
                            className={`absolute inset-0 transition-opacity duration-700 ${
                                index === activeSlide ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/55 to-transparent" />
                            <div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-6">
                                <div className="max-w-xl text-white">
                                    <p className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase text-sky-300">
                                        Custom T-Shirt Business
                                    </p>
                                    <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">
                                        {item.title}
                                    </h1>
                                    <p className="mt-4 text-base leading-8 text-slate-200 sm:text-lg">
                                        {item.subtitle}
                                    </p>
                                    <div id="order" className="mt-8 flex flex-wrap gap-4">
                                        <a
                                            href="#collections"
                                            className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
                                        >
                                            Explore Styles
                                        </a>
                                        <a
                                            href="#how-it-works"
                                            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                                        >
                                            How We Work
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="absolute right-6 bottom-6 z-10 flex gap-2">
                    {sliderItems.map((item, index) => (
                        <button
                            key={item.title}
                            type="button"
                            onClick={() => setActiveSlide(index)}
                            className={`h-2.5 rounded-full transition ${
                                index === activeSlide ? "w-8 bg-white" : "w-2.5 bg-white/50"
                            }`}
                            aria-label={`Show slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            <section id="collections" className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-10 max-w-3xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Signature T-Shirt Collections</h2>
                    <p className="mt-4 text-base leading-8 text-slate-600">
                        Har business ke liye alag style needs hoti hain. Is liye hum fit, fabric, aur printing options
                        ko brand goals ke mutabiq customize karte hain.
                    </p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {collections.map((collection) => (
                        <article key={collection.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <h3 className="text-lg font-bold text-slate-900">{collection.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">{collection.desc}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-16">
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">T-Shirt Catalog</h2>
                            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                                4 popular categories mein sample designs dekh kar apne brand ke liye best option choose
                                karein.
                            </p>
                        </div>
                        <a
                            href="#order"
                            className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                        >
                            Get Custom Quote
                        </a>
                    </div>

                    {catalogTabs.length > 0 && (
                        <div className="mb-7 flex flex-wrap gap-3">
                            {catalogTabs.map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setActiveCatalogTab(tab)}
                                    className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                                        activeCatalogTab === tab
                                            ? "bg-slate-900 text-white"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {filteredCatalogItems.map((shirt) => (
                            <article
                                key={`${shirt.tab}-${shirt.name}`}
                                className="overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200"
                            >
                                <img src={shirt.image} alt={shirt.name} className="h-52 w-full object-cover" />
                                <div className="p-4">
                                    <h3 className="text-base font-bold text-slate-900">{shirt.name}</h3>
                                    <p className="mt-1 text-sm text-slate-600">{shirt.printType}</p>
                                    <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
                                        <span>{shirt.minOrder}</span>
                                        <span className="text-sky-700">{shirt.price}</span>
                                    </div>
                                </div>
                            </article>
                        ))}

                        {catalogItems.length === 0 && (
                            <article className="col-span-full rounded-2xl bg-slate-100 p-8 text-center text-sm font-medium text-slate-600">
                                Catalog items abhi available nahi hain.
                            </article>
                        )}
                    </div>
                </div>
            </section>

            <section id="about" className="bg-white py-16">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
                    <img
                        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
                        alt="Custom T-shirt printing process"
                        className="h-80 w-full rounded-3xl object-cover shadow-md"
                    />
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900">Why Businesses Choose TShirtCraft</h2>
                        <p className="mt-5 text-base leading-8 text-slate-600">
                            Hamari production workflow quality aur speed dono ko balance karti hai. Design consultation
                            se le kar final delivery tak dedicated support milta hai, taake aap ka brand har order mein
                            consistently professional nazar aaye.
                        </p>
                        <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700">
                            <li>Premium fabric sourcing with strict quality checks</li>
                            <li>Screen print, DTF, and embroidery options</li>
                            <li>Bulk order pricing for events and organizations</li>
                            <li>Reliable timelines with nationwide shipping support</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">How It Works</h2>
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {processSteps.map((item) => (
                        <article key={item.step} className="rounded-2xl bg-slate-900 p-6 text-slate-100">
                            <h3 className="text-base font-bold text-sky-300">{item.step}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-200">{item.detail}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="bg-sky-50 py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="rounded-3xl border border-sky-100 bg-white p-8 shadow-sm sm:p-10">
                        <p className="text-sm font-semibold tracking-wide text-sky-700 uppercase">Client Feedback</p>
                        <blockquote className="mt-5 text-xl leading-9 font-medium text-slate-900">
                            “Hamare startup launch ke liye TShirtCraft ne jis level ki quality aur fast delivery di,
                            usne team aur customers dono ko impress kar diya.”
                        </blockquote>
                        <p className="mt-4 text-sm font-semibold text-slate-600">Areeba Khan, Brand Manager</p>
                    </div>
                </div>
            </section>

            <section id="contact" className="mx-auto max-w-7xl px-6 py-16">
                <div className="rounded-3xl bg-slate-950 px-8 py-12 text-center text-white">
                    <h2 className="text-3xl font-extrabold sm:text-4xl">
                        Ready to launch your custom T-shirt collection?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
                        Aaj hi design brief share karein aur apne brand ke liye premium custom apparel solution start
                        karein.
                    </p>
                    <a
                        href="#contact"
                        className="mt-7 inline-flex rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
                    >
                        Contact Our Team
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
