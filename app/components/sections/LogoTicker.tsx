'use client';

const brands = ['TEM', 'HCF', 'Lanolips', 'Tour de France', 'Smeg', 'Gatorade', 'Takemoto', 'AFW', 'Morco', '7 Miles'];

export function LogoTicker() {
  return (
    <section className="bg-[var(--color-lilac)] pt-[var(--spacing-lg)] pb-0 relative">
      <div className="absolute left-[54px] top-4 z-10 bg-[var(--color-lilac-light)] border-2 border-black rounded-lg px-4 py-3">
        <p className="font-special text-special-sm text-black whitespace-nowrap">
          They are trusting us ★★★★★
        </p>
      </div>

      <div className="border-y-2 border-black overflow-hidden">
        <div className="flex items-center gap-[var(--spacing-xl)] py-[var(--spacing-sm)] animate-ticker">
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex-shrink-0 h-[60px] min-w-[100px] flex items-center justify-center">
              <span className="font-heading text-h5 text-black whitespace-nowrap opacity-80">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

