import { Link, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";

const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Collections", href: "/collections" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Contact", href: "/contact" },
];

const brandLogo = {
    src: "/printsydemainlogo.png",
    alt: "PrintSyde",
};

export default function Navbar() {
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentHash, setCurrentHash] = useState("");

    const currentPath = useMemo(() => {
        const [path] = url.split("#");

        return path || "/";
    }, [url]);

    useEffect(() => {
        const syncHash = () => {
            setCurrentHash(window.location.hash || "");
        };

        syncHash();
        window.addEventListener("hashchange", syncHash);

        return () => {
            window.removeEventListener("hashchange", syncHash);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [url]);

    const isLinkActive = (link) => {
        if (link.href.startsWith("/#")) {
            const targetHash = link.href.replace("/#", "#");

            return currentPath === "/" && currentHash === targetHash;
        }

        return currentPath === link.href;
    };

    const renderNavLink = (link) => {
        const isActive = isLinkActive(link);

        if (link.href.startsWith("#")) {
            return (
                <a
                    key={link.name}
                    href={link.href}
                    className={`relative rounded-full px-4 py-2 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition duration-300 ${
                        isActive
                            ? "bg-slate-950 text-white shadow-[0_10px_25px_rgba(15,23,42,0.18)]"
                            : "text-slate-600 hover:bg-white hover:text-amber-700"
                    }`}
                >
                    {link.name}
                </a>
            );
        }

        return (
            <Link
                key={link.name}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition duration-300 ${
                    isActive
                        ? "bg-slate-950 text-white shadow-[0_10px_25px_rgba(15,23,42,0.18)]"
                        : "text-slate-600 hover:bg-white hover:text-amber-700"
                }`}
            >
                {link.name}
            </Link>
        );
    };

    const renderMobileNavLink = (link) => {
        const isActive = isLinkActive(link);

        if (link.href.startsWith("#")) {
            return (
                <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-[1.2rem] border px-4 py-3 text-sm font-semibold tracking-[0.14em] uppercase transition duration-300 ${
                        isActive
                            ? "border-slate-900 bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]"
                            : "border-slate-200/80 bg-white/80 text-slate-700 hover:border-amber-200 hover:bg-white hover:text-amber-700"
                    }`}
                >
                    {link.name}
                </a>
            );
        }

        return (
            <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`rounded-[1.2rem] border px-4 py-3 text-sm font-semibold tracking-[0.14em] uppercase transition duration-300 ${
                    isActive
                        ? "border-slate-900 bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]"
                        : "border-slate-200/80 bg-white/80 text-slate-700 hover:border-amber-200 hover:bg-white hover:text-amber-700"
                }`}
            >
                {link.name}
            </Link>
        );
    };

    return (
        <nav className="sticky top-0 z-30 mx-auto block w-full max-w-none px-3 pt-3 pb-3 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl rounded-[1.75rem] border border-white/70 bg-gradient-to-r from-white/95 via-[#f8f3ea] to-[#f1e8db] px-4 py-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 backdrop-blur-xl sm:px-6 sm:py-4 lg:px-8">
                <div className="flex items-center justify-between gap-4 lg:gap-10">
                    <Link
                        href="/"
                        className="flex shrink-0 items-center rounded-2xl border border-transparent pr-2 transition duration-300 hover:border-slate-200/80 hover:bg-white/70"
                        aria-label={brandLogo.alt}
                    >
                        <img
                            src={brandLogo.src}
                            alt={brandLogo.alt}
                            className="h-20 w-auto object-contain drop-shadow-[0_8px_18px_rgba(15,23,42,0.10)] sm:h-24"
                            onError={(event) => {
                                event.currentTarget.style.display = "none";
                                const fallback =
                                    event.currentTarget.nextElementSibling;
                                if (fallback) {
                                    fallback.classList.remove("hidden");
                                }
                            }}
                        />
                        <ApplicationLogo className="hidden h-20 w-20 fill-current text-slate-900 sm:h-24 sm:w-24" />
                    </Link>

                    <div className="hidden flex-1 items-center justify-center lg:flex">
                        <div className="flex items-center gap-2 rounded-full border border-amber-100/80 bg-white/75 px-3 py-2 shadow-inner shadow-white/80">
                            {links.map((link) => renderNavLink(link))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                setIsMobileMenuOpen(
                                    (currentState) => !currentState,
                                )
                            }
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-900 shadow-sm transition duration-300 hover:bg-white lg:hidden"
                            aria-expanded={isMobileMenuOpen}
                            aria-label="Toggle navigation menu"
                        >
                            <span className="flex flex-col gap-1.5">
                                <span
                                    className={`h-0.5 w-5 rounded-full bg-slate-900 transition ${
                                        isMobileMenuOpen
                                            ? "translate-y-2 rotate-45"
                                            : ""
                                    }`}
                                />
                                <span
                                    className={`h-0.5 w-5 rounded-full bg-slate-900 transition ${
                                        isMobileMenuOpen ? "opacity-0" : ""
                                    }`}
                                />
                                <span
                                    className={`h-0.5 w-5 rounded-full bg-slate-900 transition ${
                                        isMobileMenuOpen
                                            ? "-translate-y-2 -rotate-45"
                                            : ""
                                    }`}
                                />
                            </span>
                        </button>

                        <Link
                            href="/design"
                            className="shrink-0 rounded-full border border-slate-900/10 bg-gradient-to-r from-slate-950 via-slate-800 to-amber-700 px-4 py-3 text-[0.68rem] font-semibold tracking-[0.18em] text-white uppercase shadow-[0_14px_30px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(15,23,42,0.24)] sm:px-6 sm:text-sm"
                        >
                            Start Design
                        </Link>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div className="flex min-h-screen justify-end px-3 pt-28 pb-4 sm:px-6">
                            <div
                                className="w-full max-w-sm rounded-[2rem] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(248,243,234,0.94))] p-4 shadow-[0_30px_80px_rgba(15,23,42,0.22)] ring-1 ring-slate-200/70"
                                onClick={(event) => event.stopPropagation()}
                            >
                                <div className="flex items-center justify-between rounded-[1.4rem] border border-amber-100/80 bg-white/80 px-4 py-3">
                                    <div>
                                        <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-amber-700 uppercase">
                                            Navigation
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-600">
                                            Explore PrintSyde pages
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                                        aria-label="Close navigation menu"
                                    >
                                        <span className="text-lg leading-none">
                                            X
                                        </span>
                                    </button>
                                </div>

                                <div className="mt-4 grid gap-3">
                                    {links.map((link) =>
                                        renderMobileNavLink(link),
                                    )}
                                </div>

                                <Link
                                    href="/design"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="lux-button-primary mt-5 flex w-full justify-center"
                                >
                                    Start Design
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
