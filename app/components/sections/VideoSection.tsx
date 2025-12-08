'use client';

export function VideoSection() {
  return (
    <section className="bg-[var(--color-lilac)] py-[var(--spacing-lg)]">
      <div className="w-full px-[var(--spacing-xs)] md:px-[var(--spacing-sm)] lg:px-[var(--container-padding)]">
        <div className="relative aspect-video w-full border-2 border-black rounded-[var(--radius-lg)] overflow-hidden bg-gradient-to-br from-[var(--color-lilac-light)] to-[var(--color-lilac)]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-heading text-h5 text-black">Featured Work</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

