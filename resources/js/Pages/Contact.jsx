import { Head } from "@inertiajs/react";
import { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

const contactMethods = [
    {
        key: "email",
        title: "Email Support",
        description:
            "Send project briefs, artwork files, and order requests directly to our team.",
        actionLabel: "Email Support",
        actionHref: "mailto:support@printsyde.com",
        detail: "support@printsyde.com",
    },
    {
        key: "phone",
        title: "Call or WhatsApp",
        description:
            "Quick coordination for quotes, sizing, production questions, and delivery updates.",
        actionLabel: "Call / WhatsApp",
        actionHref: "tel:+923001234567",
        detail: "+92 300 1234567",
    },
    {
        key: "links",
        title: "Contact without Email",
        description:
            "Explore our Collections, learn how we work, and start a requirement brief without sending an email.",
        actionLabel: "View Collections",
        actionHref: "/collections",
        detail: "No email required",
    },
];

const quickLinks = [
    {
        label: "Collections",
        href: "/collections",
    },
    {
        label: "How It Works",
        href: "/how-it-works",
    },
    {
        label: "About PrintSyde",
        href: "/about",
    },
];

export default function Contact() {
    const [activeMethod, setActiveMethod] = useState("email");
    const activeContact = contactMethods.find(
        (method) => method.key === activeMethod,
    );

    return (
        <div className="min-h-screen text-slate-800">
            <Head title="Contact | PrintSyde" />
            <Header />
            <Navbar />

            <section className="lux-shell py-10 sm:py-14">
                <div className="lux-panel overflow-hidden px-6 py-10 sm:px-8 sm:py-12">
                    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
                        <div>
                            <p className="lux-kicker border-amber-400/30 bg-white/5 text-amber-300">
                                Contact PrintSyde
                            </p>
                            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                                Professional apparel support with flexible
                                contact options.
                            </h1>
                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                                Hamari team aapko email, phone, aur direct links
                                ke through assist karti hai. Agar aap email
                                prefer nahi karte, to humari phone/WhatsApp aur
                                quick-link options se bhi professional support
                                available hai.
                            </p>
                        </div>
                        <div className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-8 text-slate-100 shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                                Fast response support
                            </p>
                            <h2 className="mt-5 text-3xl font-black tracking-tight">
                                Choose the contact path that suits your project.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-slate-300">
                                Har option clearly separate ki gayi hai, taake
                                aap asani se dekhein ki email, phone, ya web
                                links mein se kaun sa route best rahega.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="lux-shell py-6 sm:py-10">
                <div className="grid gap-6 md:grid-cols-3">
                    {contactMethods.map((method) => {
                        const isActive = method.key === activeMethod;

                        return (
                            <button
                                type="button"
                                key={method.key}
                                onClick={() => setActiveMethod(method.key)}
                                className={`group rounded-[1.75rem] border p-6 text-left transition duration-300 ${
                                    isActive
                                        ? "border-amber-400/70 bg-amber-50 shadow-[0_16px_45px_rgba(251,191,36,0.18)]"
                                        : "border-slate-200/80 bg-white hover:border-amber-300 hover:bg-amber-50/70"
                                }`}
                            >
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                    {method.key === "email"
                                        ? "Email"
                                        : method.key === "phone"
                                          ? "Phone"
                                          : "Links"}
                                </span>
                                <h3 className="mt-4 text-xl font-black tracking-tight text-slate-950">
                                    {method.title}
                                </h3>
                                <p className="mt-4 text-sm leading-7 text-slate-600">
                                    {method.description}
                                </p>
                                <div className="mt-6 flex items-center gap-3">
                                    <span
                                        className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${
                                            isActive
                                                ? "bg-slate-950 text-white"
                                                : "bg-slate-100 text-slate-700"
                                        }`}
                                    >
                                        {isActive ? "Selected" : "View"}
                                    </span>
                                    <span className="text-sm font-medium text-slate-500">
                                        {method.detail}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="lux-shell py-10 sm:py-14">
                <div className="lux-panel flex flex-col gap-8 p-8 sm:p-10">
                    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <p className="lux-kicker border-amber-400/30 bg-white/5 text-amber-300">
                                Selected Contact Path
                            </p>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                {activeContact.title}
                            </h2>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                                {activeContact.description}
                            </p>
                        </div>

                        <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-950 p-6 text-slate-100">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                                Recommended Action
                            </p>
                            <div className="mt-6 flex flex-col gap-4">
                                <a
                                    href={activeContact.actionHref}
                                    className="lux-button-primary w-full text-center"
                                >
                                    {activeContact.actionLabel}
                                </a>
                                <p className="text-sm leading-7 text-slate-300">
                                    {activeContact.key === "links"
                                        ? "No email required. Choose a fast, direct link to continue."
                                        : "Click to open your preferred messaging option and start your request now."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
