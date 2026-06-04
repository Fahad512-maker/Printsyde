import { Head, Link } from "@inertiajs/react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

const launchMilestones = [
    { label: "Design brief builder", status: "In progress" },
    { label: "Live garment previews", status: "Preview soon" },
    { label: "Instant quote flow", status: "Final polish" },
];

const serviceNotes = [
    "Upload artwork and share product direction",
    "Choose apparel type, quantity, and finishing",
    "Receive a guided quote from the PrintSyde team",
];

export default function ComingSoon() {
    return (
        <>
            <Head title="Design Studio Coming Soon | PrintSyde" />

            <div className="min-h-screen text-slate-800">
                <Header />
                <Navbar />

                <main className="px-3 pb-10 pt-4 sm:px-6 lg:px-8">
                    <section className="mx-auto grid min-h-[620px] max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/80 shadow-[0_30px_90px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="relative flex items-center bg-slate-950 px-6 py-12 text-white sm:px-10 lg:px-14">
                            <img
                                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1400&q=80"
                                alt="Premium apparel design workspace"
                                className="absolute inset-0 h-full w-full object-cover opacity-45"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.84)_48%,rgba(15,23,42,0.46)_100%)]" />

                            <div className="relative max-w-2xl">
                                <p className="lux-kicker border-amber-400/30 bg-white/10 text-amber-300">
                                    PrintSyde Design Studio
                                </p>
                                <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                    Coming soon.
                                </h1>
                                <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
                                    Hum aapke custom apparel orders ke liye ek
                                    guided design experience develop kar rahe
                                    hain. Soon you will be able to brief,
                                    preview, and request quotes from one
                                    polished workspace.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <a
                                        href="mailto:support@printsyde.com?subject=Custom%20Design%20Request"
                                        className="lux-button-primary bg-none"
                                    >
                                        Request Early Access
                                    </a>
                                    <Link
                                        href="/collections"
                                        className="lux-button-secondary border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15"
                                    >
                                        Browse Collections
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center gap-6 px-6 py-10 sm:px-10 lg:px-12">
                            <div className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">
                                            Launch Status
                                        </p>
                                        <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                            Studio in development
                                        </h2>
                                    </div>
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-xl font-black text-amber-700">
                                        72%
                                    </div>
                                </div>

                                <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-slate-950 via-slate-700 to-amber-600" />
                                </div>

                                <div className="mt-6 grid gap-3">
                                    {launchMilestones.map((milestone) => (
                                        <div
                                            key={milestone.label}
                                            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3"
                                        >
                                            <p className="text-sm font-semibold text-slate-800">
                                                {milestone.label}
                                            </p>
                                            <p className="text-right text-[0.68rem] font-semibold tracking-[0.16em] text-amber-700 uppercase">
                                                {milestone.status}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                {serviceNotes.map((note, index) => (
                                    <article
                                        key={note}
                                        className="rounded-[1.4rem] border border-white/70 bg-slate-950 px-4 py-5 text-white shadow-[0_18px_45px_rgba(15,23,42,0.14)]"
                                    >
                                        <p className="text-sm font-black tracking-[0.18em] text-amber-300 uppercase">
                                            0{index + 1}
                                        </p>
                                        <p className="mt-4 text-sm leading-6 text-slate-200">
                                            {note}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
