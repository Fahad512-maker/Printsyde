import { Head } from "@inertiajs/react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

const steps = [
    {
        step: "01",
        title: "Tell Us What You Need",
        benefit:
            "You get clear direction quickly, so you do not waste time guessing which products, print methods, or quantities will work best.",
        detail:
            "Share your idea with PrintSyde for custom T-shirts, branded caps, printed mugs, or a full merchandise setup for your campaign, team, or brand.",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "T-shirt concept planning and apparel design discussion",
        points: [
            "Fast guidance on the right merch direction",
            "A smoother start to your custom order",
        ],
        icon: "brief",
    },
    {
        step: "02",
        title: "Approve A Polished Design",
        benefit:
            "You see your branding before production begins, which gives you more confidence and reduces the chance of last-minute changes.",
        detail:
            "PrintSyde prepares a clean visual direction so your T-shirts, caps, and mugs feel consistent, premium, and aligned with your brand identity.",
        image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Printed T-shirt mockup and branded merchandise design review",
        points: [
            "Better visibility before final production",
            "A stronger and more professional brand look",
        ],
        icon: "design",
    },
    {
        step: "03",
        title: "Receive Ready-To-Use Merch",
        benefit:
            "You receive finished products that are easier to launch, gift, distribute, or sell because they arrive looking professional and brand-ready.",
        detail:
            "From production to finishing and delivery, PrintSyde handles the hard part so your custom merchandise arrives prepared for real use.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Finished branded T-shirts and merchandise ready for delivery",
        points: [
            "Less stress from production through dispatch",
            "Consistent quality across your merch order",
        ],
        icon: "delivery",
    },
];

const outcomes = [
    { value: "3", label: "Simple Steps" },
    { value: "Tees, Caps, Cups", label: "Popular Products" },
    { value: "Brand Ready", label: "Final Experience" },
];

export default function HowItWorks() {
    return (
        <>
            <Head title="How It Works | PrintSyde" />

            <div className="min-h-screen text-slate-800">
                <Header />
                <Navbar />

                <section className="lux-shell py-8 sm:py-12">
                    <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
                        <div className="lux-panel-dark px-6 py-10 sm:px-8 sm:py-12">
                            <p className="lux-kicker border-amber-400/30 bg-white/5 text-amber-300">
                                How It Works
                            </p>
                            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                                A simple way to create custom PrintSyde merchandise without the usual confusion.
                            </h1>
                            <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
                                PrintSyde aapko idea se le kar final delivery tak guide karta hai. Process simple rakha
                                gaya hai taake aapko har step par clarity milay aur final T-shirts, caps, mugs, ya
                                branded merch zyada polished lage.
                            </p>
                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                {outcomes.map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-5"
                                    >
                                        <p className="text-2xl font-black text-white">{item.value}</p>
                                        <p className="mt-2 text-[0.68rem] font-semibold tracking-[0.18em] text-slate-300 uppercase">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lux-panel overflow-hidden p-3">
                            <img
                                src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80"
                                alt="Printed T-shirt display and custom apparel presentation"
                                className="h-full min-h-[420px] w-full rounded-[1.6rem] object-cover"
                            />
                        </div>
                    </div>
                </section>

                <section className="lux-shell py-10 sm:py-14">
                    <div className="mb-8 max-w-3xl">
                        <p className="lux-kicker">3-Step Process</p>
                        <h2 className="mt-5 lux-title">
                            Clear steps that help you move faster and get better-looking results.
                        </h2>
                        <p className="mt-5 lux-copy">
                            Yeh sirf features ka list nahi hai. Har step is tarah built hai ke aapko zyada clarity,
                            better design confidence, aur final delivery par stronger brand presentation milay.
                        </p>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-3">
                        {steps.map((item) => (
                            <article
                                key={item.step}
                                className="overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.imageAlt}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,rgba(15,23,42,0.7)_100%)]" />
                                    <div className="absolute left-5 top-5 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white backdrop-blur-sm">
                                            <StepIcon icon={item.icon} />
                                        </div>
                                        <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-sm">
                                            Step {item.step}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-black text-slate-950">{item.title}</h3>
                                    <p className="mt-4 text-sm leading-7 text-slate-700">{item.benefit}</p>
                                    <p className="mt-4 text-sm leading-7 text-slate-600">{item.detail}</p>

                                    <div className="mt-6 grid gap-3">
                                        {item.points.map((point) => (
                                            <div
                                                key={point}
                                                className="flex items-center gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3"
                                            >
                                                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                                <span className="text-sm font-medium text-slate-700">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="lux-shell py-10 sm:py-14">
                    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="lux-panel px-6 py-8 sm:px-8 sm:py-10">
                            <p className="lux-kicker">Why This Works</p>
                            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                Built to save your time while improving the final look of your merchandise.
                            </h2>
                            <p className="mt-5 lux-copy">
                                PrintSyde process ko isi liye structured rakhta hai taake aapko repeatedly explain,
                                correct, ya chase na karna paray. Aapko ek organized path milta hai that feels easier
                                to trust and easier to manage.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {[
                                "You get quicker clarity on the right product and print direction.",
                                "You review a cleaner concept before production starts.",
                                "You receive merch that feels more polished and easier to present.",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="lux-panel px-6 py-5 text-sm leading-7 text-slate-700"
                                >
                                    {item}
                                </div>
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
                            Start your custom T-shirts, caps, cups, or full merch order with more confidence.
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
                            Agar aap branded merchandise ko simple aur professional process ke sath launch karna
                            chahtay hain, PrintSyde is ready to help you begin.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <a href="/#order" className="lux-button-primary">
                                Get Started
                            </a>
                            <a
                                href="/collections"
                                className="lux-button-secondary border-white/20 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                            >
                                View Collections
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}

function StepIcon({ icon }) {
    if (icon === "brief") {
        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
                <path d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z" />
                <path d="M10 12h4" />
            </svg>
        );
    }

    if (icon === "design") {
        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
        );
    }

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14 4h3l3 3v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7l3-3h3" />
            <path d="M12 3v9" />
            <path d="m8.5 9 3.5 3 3.5-3" />
        </svg>
    );
}
