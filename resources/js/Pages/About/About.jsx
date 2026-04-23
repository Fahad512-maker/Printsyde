import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";

const values = [
    {
        title: "Client-Centric Partnership",
        description:
            "Har engagement business goals se start hota hai taake strategy, design, aur delivery measurable outcomes drive kare.",
    },
    {
        title: "Quality By Standard",
        description:
            "Documented QA, careful sampling, aur consistent finishing se hum premium perception ko protect karte hain.",
    },
    {
        title: "Transparent Collaboration",
        description:
            "Clear timelines, responsive communication, aur structured approvals ke sath project confidence maintain hota hai.",
    },
];

const capabilities = [
    "Brand-oriented apparel consultation and product direction",
    "Design-to-production workflow with quality checkpoints",
    "Bulk manufacturing support for campaigns and events",
    "Luxury packaging and fulfilment guidance for polished delivery",
];

const milestones = [
    {
        year: "2021",
        detail: "Company foundation ke sath custom apparel consulting model establish kiya gaya.",
    },
    {
        year: "2023",
        detail: "Regional clients ke liye large-scale uniform and merchandise programs execute kiye gaye.",
    },
    {
        year: "2025",
        detail: "Production network expand karke delivery capacity aur quality control standards scale kiye gaye.",
    },
];

const facts = [
    { value: "180+", label: "Projects Delivered" },
    { value: "60+", label: "Production Experts" },
    { value: "98%", label: "Client Satisfaction" },
];

export default function About() {
    return (
        <div className="min-h-screen text-slate-800">
            <Header />
            <Navbar />

            <section className="lux-shell py-8 sm:py-12">
                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="lux-panel-dark px-6 py-10 sm:px-8 sm:py-12">
                        <p className="lux-kicker border-amber-400/30 bg-white/5 text-amber-300">About PrintSyde</p>
                        <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                            Strategic apparel partner for brands that want premium presence.
                        </h1>
                        <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
                            PrintSyde concept se le kar delivery tak complete apparel workflow manage karta hai. Hum
                            design clarity, manufacturing discipline, aur client communication ko combine karke aisa
                            result create karte hain jo professional bhi lage aur commercially effective bhi ho.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a href="#our-values" className="lux-button-primary">
                                Our Values
                            </a>
                            <a href="#company-story" className="lux-button-secondary border-white/20 bg-white/5 text-white hover:border-white/30 hover:bg-white/10">
                                Our Journey
                            </a>
                        </div>
                    </div>

                    <div className="lux-panel overflow-hidden p-3">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                            alt="Team collaborating in office"
                            className="h-full min-h-[420px] w-full rounded-[1.6rem] object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="lux-shell py-6 sm:py-8">
                <div className="grid gap-6 md:grid-cols-3">
                    {facts.map((fact) => (
                        <div key={fact.label} className="lux-panel px-6 py-8 text-center">
                            <p className="text-4xl font-black text-slate-950">{fact.value}</p>
                            <p className="mt-2 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                                {fact.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="lux-shell py-10 sm:py-14">
                <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="lux-panel px-6 py-8 sm:px-8 sm:py-10">
                        <p className="lux-kicker">What We Deliver</p>
                        <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            Premium operations that support strong brand presentation.
                        </h2>
                        <p className="mt-5 lux-copy">
                            Har project ek structured framework ke through move karta hai jahan planning, approvals,
                            sampling, production, aur fulfilment clearly managed hotay hain.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {capabilities.map((capability) => (
                            <div
                                key={capability}
                                className="lux-panel px-6 py-5 text-sm leading-7 text-slate-700"
                            >
                                {capability}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="our-values" className="lux-shell py-10 sm:py-14">
                <div className="lux-panel-dark px-6 py-10 sm:px-8 sm:py-12">
                    <div className="mb-8 max-w-2xl">
                        <p className="lux-kicker border-amber-400/30 bg-white/5 text-amber-300">Core Values</p>
                        <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                            Principles that keep our work refined, reliable, and professional.
                        </h2>
                        <p className="mt-4 text-sm leading-8 text-slate-300 sm:text-base">
                            Ye values hamare internal standards aur client delivery experience dono ko shape karte hain.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {values.map((value) => (
                            <article key={value.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 px-6 py-8">
                                <h3 className="text-xl font-black text-white">{value.title}</h3>
                                <p className="mt-4 text-sm leading-7 text-slate-300">{value.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="company-story" className="lux-shell py-10 sm:py-14">
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="lux-panel px-6 py-8 sm:px-8 sm:py-10">
                        <p className="lux-kicker">Our Story</p>
                        <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            Built to make custom apparel more polished and predictable for businesses.
                        </h2>
                        <p className="mt-5 lux-copy">
                            PrintSyde ki journey ek simple objective se shuru hui: apparel ordering ko professional,
                            reliable, aur brand-friendly banana. Is liye humne process-led model build kiya jahan design
                            quality aur execution speed dono ko equal importance milti hai.
                        </p>
                        <p className="mt-4 lux-copy">
                            Aaj hum startups se le kar enterprises tak multiple segments ko support karte hain aur har
                            order mein premium finishing, clear communication, aur dependable delivery experience provide
                            karte hain.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {milestones.map((milestone) => (
                            <div key={milestone.year} className="lux-panel px-6 py-6">
                                <p className="text-sm font-black tracking-[0.2em] text-amber-700 uppercase">
                                    {milestone.year}
                                </p>
                                <p className="mt-3 text-sm leading-7 text-slate-600">{milestone.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="lux-shell py-10 sm:py-14">
                <div className="lux-panel-dark px-6 py-10 text-center sm:px-10 sm:py-14">
                    <p className="lux-kicker border-amber-400/30 bg-white/5 text-amber-300">Let Us Collaborate</p>
                    <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Ready to scale your brand with premium custom apparel?
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
                        Apna requirement brief share karein. Hamari team aapko fabric options, timeline, pricing
                        direction, aur best-fit production route ke sath guide karegi.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <a href="mailto:support@printsyde.com" className="lux-button-primary">
                            Talk To Our Team
                        </a>
                        <a href="/#catalog" className="lux-button-secondary border-white/20 bg-white/5 text-white hover:border-white/30 hover:bg-white/10">
                            View Catalog
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
