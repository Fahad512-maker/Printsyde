import { useMemo, useState } from 'react';

export default function LivePreview({ cards }) {
    const [density, setDensity] = useState(1);
    const [previewMode, setPreviewMode] = useState('desktop');

    const widthClass = useMemo(() => {
        if (previewMode === 'mobile') {
            return 'max-w-sm';
        }

        if (previewMode === 'tablet') {
            return 'max-w-2xl';
        }

        return 'max-w-none';
    }, [previewMode]);

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-black text-slate-900">Live Preview Area</h3>
                    <p className="text-sm text-slate-500">Hover cards and switch viewport modes to test responsiveness</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {['mobile', 'tablet', 'desktop'].map((mode) => (
                        <button
                            key={mode}
                            type="button"
                            onClick={() => setPreviewMode(mode)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                                previewMode === mode
                                    ? 'bg-slate-900 text-white'
                                    : 'border border-slate-300 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="density" className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">Card Scale</label>
                <input
                    id="density"
                    type="range"
                    min="0.85"
                    max="1.15"
                    step="0.01"
                    value={density}
                    onChange={(event) => setDensity(Number(event.target.value))}
                    className="mt-2 w-full accent-cyan-600"
                />
            </div>

            <div className="mt-5 overflow-x-auto">
                <div className={`transition-all duration-300 ${widthClass}`}>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {cards.map((card) => (
                            <article
                                key={card.title}
                                style={{ transform: `scale(${density})` }}
                                className="origin-top-left rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <h4 className="text-sm font-bold text-slate-900">{card.title}</h4>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{card.detail}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
