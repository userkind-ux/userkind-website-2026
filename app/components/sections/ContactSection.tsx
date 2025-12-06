'use client';

import { Button } from '../ui/Button';

function InputField({ label, type = 'text', placeholder = '' }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2 py-2 w-full">
      <label className="font-heading text-subheading text-black">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-4 bg-white border-2 border-black rounded font-body text-body-md text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-lilac)]"
      />
    </div>
  );
}

export function ContactSection() {
  return (
    <section className="bg-[var(--color-lilac-lighter)]">
      <div className="py-[var(--spacing-xl)] flex flex-col items-center">
        <div className="w-full max-w-[800px] mx-auto px-[var(--spacing-xs)] text-center">
          <h2 className="font-heading text-h2 text-black">Join other brands who made the transformation</h2>
        </div>
      </div>

      <div className="container-uk pb-[var(--spacing-2xl)]">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="aspect-[804/860] w-full max-w-[804px] bg-gradient-to-br from-[var(--color-lilac)] to-[var(--color-yellow)] rounded-[var(--radius-lg)] border-2 border-black flex items-center justify-center">
              <p className="font-heading text-h4 text-black/50">Before / After</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-12 items-center">
            <div className="w-full max-w-[700px] px-0 lg:px-12">
              <h3 className="font-heading text-h4 text-black mb-8">Fill out the form below and we'll confirm a call time with you</h3>

              <form className="flex flex-col">
                <div className="flex flex-col sm:flex-row gap-4">
                  <InputField label="Your name" placeholder="John" />
                  <InputField label="Last name" placeholder="Doe" />
                </div>
                <InputField label="Email" type="email" placeholder="john@company.com" />
                <InputField label="Company" placeholder="Acme Inc." />
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-[362px]">
                    <InputField label="Phone" type="tel" placeholder="+61 400 000 000" />
                  </div>
                  <InputField label="Budget" placeholder="$10,000 - $50,000" />
                </div>
                <div className="flex flex-col gap-2 py-2 w-full">
                  <label className="font-heading text-subheading text-black">Tell us about your project</label>
                  <textarea
                    placeholder="Brief description..."
                    rows={5}
                    className="w-full px-3 py-4 h-[133px] bg-white border-2 border-black rounded font-body text-body-md text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-lilac)] resize-none"
                  />
                </div>
                <div className="mt-4">
                  <Button type="submit" label="Book a call" className="w-full" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

