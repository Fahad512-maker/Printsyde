import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

export default function About() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <Header />
            <Navbar />

            <main className="mx-auto max-w-5xl px-6 py-16">
                <p className="text-sm font-semibold tracking-[0.2em] uppercase text-sky-700">About Us</p>
                <h1 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-5xl">We build custom apparel that represents your brand.</h1>
                <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                    PrintSyde ka focus quality, creativity, aur reliable delivery par hai. Hum startups, teams, events,
                    aur growing brands ke liye custom T-shirt solutions provide karte hain.
                </p>

                <section className="mt-12 grid gap-6 sm:grid-cols-2">
                    <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            Har order ko aisi finishing ke sath deliver karna jo aapke brand ki value ko reflect kare.
                        </p>
                    </article>

                    <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-bold text-slate-900">Why PrintSyde</h2>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            Premium fabrics, multiple print techniques, aur transparent process ke sath long-term support.
                        </p>
                    </article>
                </section>
            </main>

            <Footer />
        </div>
    );
}
