import Link from "next/link";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-xl2 border border-base-border bg-gradient-to-br from-base-panel to-base-soft px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Ready for a website that actually{" "}
              <span className="accent-text">brings you customers?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-muted">
              Tell us what you&apos;re building. We&apos;ll reply with honest
              advice and a clear quote. {site.responsePromise}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Start a project
              </Link>
              <Link href="/work" className="btn-ghost">
                See our work
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
