export function PlaceholderPage({ label }: { label: string }) {
  return (
    <main>
      <section className="page-shell flex min-h-[calc(100svh-5rem)] items-end py-16 sm:py-24">
        <h1 className="font-display text-5xl font-medium tracking-[-0.06em] text-text-primary sm:text-7xl">{label}</h1>
      </section>
    </main>
  );
}
