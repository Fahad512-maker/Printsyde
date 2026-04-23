const highlights = [
    "Free delivery on orders above Rs. 5,000",
    "Premium finishing for every order",
    "Trusted by 10,000+ apparel buyers",
];

export default function Header() {
    return (
        <header className="border-b border-white/10 bg-slate-950 text-slate-100">
            <div className="lux-shell flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-[0.68rem] font-semibold tracking-[0.22em] uppercase sm:justify-between sm:text-[0.72rem]">
                {highlights.map((item) => (
                    <p key={item} className="text-center text-slate-200">
                        {item}
                    </p>
                ))}
            </div>
        </header>
    );
}
