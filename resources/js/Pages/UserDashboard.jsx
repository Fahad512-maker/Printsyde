import { Head, Link, usePage } from "@inertiajs/react";

function SummaryCard({ label, value, description }) {
    return (
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase">
                {label}
            </p>
            <h3 className="mt-3 text-2xl font-black text-slate-900">
                {value}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
                {description}
            </p>
        </article>
    );
}

export default function UserDashboard({
    accountSummary = {},
    userStats = [],
}) {
    const { auth, flash } = usePage().props;

    return (
        <>
            <Head title="User Dashboard" />

            <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_45%),linear-gradient(180deg,_#f8fafc_0%,_#e2e8f0_100%)] px-4 py-6 text-slate-800 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl space-y-6">
                    <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 p-6 text-white shadow-xl sm:p-8">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-200 uppercase">
                                    User Dashboard
                                </p>
                                <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                                    {auth?.user?.name}, aap apna dashboard dekh
                                    rahe hain
                                </h1>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-cyan-100">
                                    Yahan sirf aapke account ki summary aur
                                    personal access details show ho rahi hain.
                                    Admin modules aapke account ke liye hidden
                                    hain.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                                <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
                                    Account Snapshot
                                </p>
                                <dl className="mt-4 space-y-3 text-sm">
                                    <div>
                                        <dt className="text-cyan-100/80">
                                            Email
                                        </dt>
                                        <dd className="font-semibold text-white">
                                            {accountSummary.email}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-cyan-100/80">
                                            Joined
                                        </dt>
                                        <dd className="font-semibold text-white">
                                            {accountSummary.member_since}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-cyan-100/80">
                                            Role
                                        </dt>
                                        <dd className="font-semibold text-white">
                                            {accountSummary.role}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </section>

                    {flash?.error && (
                        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 shadow-sm">
                            {flash.error}
                        </div>
                    )}

                    {flash?.success && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm">
                            {flash.success}
                        </div>
                    )}

                    <section className="grid gap-4 md:grid-cols-3">
                        {userStats.map((stat) => (
                            <SummaryCard
                                key={stat.label}
                                label={stat.label}
                                value={stat.value}
                                description={stat.description}
                            />
                        ))}
                    </section>

                    <section className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
                        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                                My Account
                            </p>
                            <h2 className="mt-3 text-2xl font-black text-slate-900">
                                Personal access only
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                Har user sirf apna dashboard access kar sakta
                                hai. Is view mein aapke account ki essential
                                details, verification state, aur profile actions
                                rakhe gaye hain.
                            </p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
                                        Full Name
                                    </p>
                                    <p className="mt-2 text-sm font-bold text-slate-900">
                                        {accountSummary.name}
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
                                        Email Verification
                                    </p>
                                    <p className="mt-2 text-sm font-bold text-slate-900">
                                        {accountSummary.email_verified
                                            ? "Verified"
                                            : "Pending"}
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                                Quick Actions
                            </p>
                            <div className="mt-5 space-y-3">
                                <Link
                                    href={route("profile.edit")}
                                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                                >
                                    Edit Profile
                                    <span>&rarr;</span>
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                                >
                                    Logout
                                    <span>&rarr;</span>
                                </Link>
                            </div>
                        </article>
                    </section>
                </div>
            </div>
        </>
    );
}
