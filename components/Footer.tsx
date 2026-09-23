import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-base-border bg-base-soft/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-display text-lg font-bold">
              RA<span className="text-accent">.</span>Interactive
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-ink-muted">
            {site.description}
          </p>
          <p className="mt-4 text-sm text-ink-faint">{site.location}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink-muted hover:text-accent-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
            Services
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="text-ink-muted hover:text-accent-soft"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-ink-muted hover:text-accent-soft"
              >
                {site.email}
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-ink-muted hover:text-accent-soft">
                Start a project
              </Link>
            </li>
            <li className="pt-2 text-ink-faint">{site.responsePromise}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-base-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-faint sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Built with Next.js — and yes, this whole site is our sample of work.
          </p>
        </div>
      </div>
    </footer>
  );
}
