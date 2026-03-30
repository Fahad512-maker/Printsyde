import { Link } from "@inertiajs/react";

const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Collections", href: "/#collections" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const renderNavLink = (link) => {
        if (link.href.startsWith("#")) {
            return (
                <a
                    key={link.name}
                    href={link.href}
                    className="px-1 text-sm font-medium text-slate-600 transition hover:text-sky-600"
                >
                    {link.name}
                </a>
            );
        }

        return (
            <Link
                key={link.name}
                href={link.href}
                className="px-1 text-sm font-medium text-slate-600 transition hover:text-sky-600"
            >
                {link.name}
            </Link>
        );
    };

    return (
        <nav className="sticky top-0 z-30 mx-0 block w-full max-w-none border-b border-slate-200 bg-white/95 p-0 backdrop-blur">
            <div className="flex w-full items-center justify-between gap-4 py-4 pr-4 pl-2 sm:pr-6 sm:pl-3 md:gap-8 md:py-5 lg:pr-8 lg:pl-4">
                <Link
                    href="/#top"
                    className="shrink-0 text-xl font-extrabold tracking-tight text-slate-900"
                >
                    PrintSyde
                </Link>

                <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
                    {links.map((link) => renderNavLink(link))}
                </div>

                <Link
                    href="/#order"
                    className="shrink-0 rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-700 sm:px-5 sm:py-2.5 sm:text-sm"
                >
                    Start Design
                </Link>
            </div>
        </nav>
    );
}
