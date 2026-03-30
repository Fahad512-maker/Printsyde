import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";

export default function About() {
    const values = [
        {
            title: "Client-Centric Partnership",
            description:
                "Har engagement business goals se start hota hai taake strategy, design, aur delivery real outcomes drive kare.",
        },
        {
            title: "Quality by Standard",
            description:
                "Process ka har phase documented QA, code reviews, aur performance checks ke sath execute hota hai.",
        },
        {
            title: "Transparent Collaboration",
            description:
                "Weekly updates, clear timelines, aur open communication se stakeholders har step par aligned rehte hain.",
        },
    ];

    const capabilities = [
        "Brand-oriented apparel consultation and product direction",
        "Design-to-production workflow with quality checkpoints",
        "Bulk manufacturing support for campaigns and events",
        "Reliable fulfilment planning and delivery coordination",
    ];

    const milestones = [
        {
            year: "2021",
            detail: "Company foundation ke sath custom apparel consulting model establish kiya.",
        },
        {
            year: "2023",
            detail: "Regional clients ke liye large-scale uniform and merch programs launch kiye.",
        },
        {
            year: "2025",
            detail: "Operational team aur production network expand karke delivery capacity double ki.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50 to-white text-slate-800">
            <Header />
            <Navbar />

            <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <div className="space-y-6">
                        <p className="inline-flex rounded-full border border-sky-200 bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-700">
                            About PrintSyde
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            Your strategic partner for premium custom apparel and brand-ready production.
                        </h1>
                        <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                            PrintSyde businesses ko concept se delivery tak complete support deta hai. Hum design clarity,
                            production discipline, aur timeline commitment ke sath aisa apparel experience create karte
                            hain jo brand image ko consistently strong banaye.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#our-values"
                                className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                            >
                                Our Values
                            </a>
                            <a
                                href="#company-story"
                                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                            >
                                Our Journey
                            </a>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 md:p-8">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                            alt="Team collaborating in office"
                            className="h-64 w-full rounded-2xl object-cover md:h-80"
                        />
                        <div className="mt-6 grid grid-cols-3 gap-4">
                            <div className="rounded-xl bg-slate-50 p-4 text-center">
                                <p className="text-2xl font-bold text-slate-900">180+</p>
                                <p className="mt-1 text-xs font-medium text-slate-500">Projects Delivered</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 p-4 text-center">
                                <p className="text-2xl font-bold text-slate-900">60+</p>
                                <p className="mt-1 text-xs font-medium text-slate-500">Experts</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 p-4 text-center">
                                <p className="text-2xl font-bold text-slate-900">98%</p>
                                <p className="mt-1 text-xs font-medium text-slate-500">Client Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-14 md:px-10">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">What We Deliver</h2>
                            <p className="mt-4 leading-8 text-slate-600">
                                Har project structured framework par chalta hai, jahan planning se le kar final
                                delivery tak quality, communication, aur accountability clear hoti hai.
                            </p>
                        </div>
                        <ul className="space-y-3 text-sm leading-7 text-slate-700">
                            {capabilities.map((capability) => (
                                <li key={capability} className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                                    {capability}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section id="our-values" className="mx-auto max-w-6xl px-6 pb-14 md:px-10">
                <div className="rounded-3xl bg-slate-900 px-6 py-10 md:px-10 md:py-14">
                    <div className="mb-10 max-w-2xl">
                        <h2 className="text-3xl font-bold text-white md:text-4xl">Our Core Values</h2>
                        <p className="mt-3 text-slate-300">
                            Ye principles hamare decision-making ko guide karte hain aur every delivery me consistency
                            ensure karte hain.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {values.map((value) => (
                            <article key={value.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                                <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-300">{value.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="company-story" className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-3xl font-bold text-slate-900">Our Story</h2>
                        <p className="mt-4 leading-8 text-slate-600">
                            PrintSyde ki journey ek simple objective se shuru hui: custom apparel ko professional,
                            predictable, aur business-friendly banana. Humne process-led production model build kiya
                            jahan design quality aur execution speed dono equal priority hain.
                        </p>
                        <p className="mt-4 leading-8 text-slate-600">
                            Aaj hum startups se le kar enterprises tak multiple segments ko support karte hain aur
                            har order me consistency, premium finishing, aur dependable delivery experience provide
                            karte hain.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-3xl font-bold text-slate-900">Milestones</h2>
                        <div className="mt-6 space-y-5">
                            {milestones.map((milestone) => (
                                <div key={milestone.year} className="rounded-2xl bg-slate-50 p-5">
                                    <p className="text-sm font-bold tracking-widest text-sky-600 uppercase">
                                        {milestone.year}
                                    </p>
                                    <p className="mt-2 text-sm leading-7 text-slate-600">{milestone.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
                <div className="rounded-3xl bg-slate-950 px-8 py-12 text-center text-white">
                    <p className="text-sm font-semibold tracking-[0.2em] uppercase text-sky-300">Let us collaborate</p>
                    <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                        Ready to scale your brand with premium custom apparel?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                        Apna requirement brief share karein, hamari team aapko fabric options, production timeline,
                        aur best-fit package ke sath guide karegi.
                    </p>
                    <a
                        href="/#contact"
                        className="mt-7 inline-flex rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
                    >
                        Talk to Our Team
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
