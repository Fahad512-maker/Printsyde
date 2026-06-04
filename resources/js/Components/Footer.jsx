import { Link } from "@inertiajs/react";

const footerGroups = [
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Collections", href: "/collections" },
            { label: "How It Works", href: "/how-it-works" },
        ],
    },
    {
        title: "Services",
        links: [
            { label: "Custom Printing", href: "/#services" },
            { label: "Catalog", href: "/#catalog" },
            { label: "Private Label", href: "/about#company-story" },
        ],
    },
    {
        title: "Contact",
        links: [
            { label: "support@printsyde.com", href: "mailto:support@printsyde.com" },
            { label: "+92 300 1234567", href: "tel:+923001234567" },
            { label: "Hyderabad, Pakistan", href: "/#contact" },
        ],
    },
];

function FooterLink({ href, label }) {
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
        return (
            <a href={href} className="transition hover:text-amber-300">
                {label}
            </a>
        );
    }

    return (
        <Link href={href} className="transition hover:text-amber-300">
            {label}
        </Link>
    );
}

export default function Footer() {
    return (
        <footer id="contact" className="mt-8 bg-slate-950 text-slate-300">
            <div className="lux-shell py-16">
                <div className="lux-panel-dark overflow-hidden px-6 py-10 sm:px-8 lg:px-10">
                    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
                        <div className="max-w-md">
                            <p className="lux-kicker border-amber-400/30 bg-white/5 text-amber-300">
                                PrintSyde Studio
                            </p>
                            <h3 className="mt-5 text-3xl font-black tracking-tight text-white">
                                Luxury presentation for custom apparel brands.
                            </h3>
                            <p className="mt-4 text-sm leading-7 text-slate-300">
                                Strategy, design direction, production discipline, and polished fulfilment for startups,
                                teams, events, and premium merchandise programs.
                            </p>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                                    <p className="text-2xl font-black text-white">48 Hrs</p>
                                    <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                                        Quote Turnaround
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                                    <p className="text-2xl font-black text-white">Nationwide</p>
                                    <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                                        Delivery Support
                                    </p>
                                </div>
                            </div>
                        </div>

                        {footerGroups.map((group) => (
                            <div key={group.title}>
                                <h4 className="text-sm font-semibold tracking-[0.18em] text-white uppercase">
                                    {group.title}
                                </h4>
                                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            <FooterLink href={link.href} label={link.label} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3 px-2 pt-6 text-xs font-medium tracking-[0.08em] text-slate-500 uppercase sm:flex-row sm:items-center sm:justify-between">
                    <p>Copyright {new Date().getFullYear()} PrintSyde. All rights reserved.</p>
                    <p>Built for premium custom apparel experiences.</p>
                </div>
            </div>
        </footer>
    );
}
