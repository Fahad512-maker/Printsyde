const footerLinks = {
    Company: ["About Us", "Our Team", "Careers"],
    Services: ["Custom Printing", "Bulk Orders", "Design Support"],
    Support: ["FAQs", "Shipping", "Returns"],
};

export default function Footer() {
    return (
        <footer id="contact" className="bg-slate-950 text-slate-300">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
                <div className="md:col-span-1">
                    <h3 className="text-xl font-extrabold text-white">
                        PrintSyde
                    </h3>
                    <p className="mt-4 text-sm leading-7">
                        Premium custom T-shirts for startups, events, teams, and
                        brands.
                    </p>
                    <p className="mt-4 text-sm">support@printsyde.com</p>
                </div>

                {Object.entries(footerLinks).map(([title, items]) => (
                    <div key={title}>
                        <h4 className="text-sm font-semibold tracking-wide text-white uppercase">
                            {title}
                        </h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            {items.map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="transition hover:text-sky-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="border-t border-slate-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-xs text-slate-400">
                    <p>
                        © {new Date().getFullYear()} TShirtCraft. All rights
                        reserved.
                    </p>
                    <p>Built for modern custom apparel businesses.</p>
                </div>
            </div>
        </footer>
    );
}
