import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page flex min-h-[50vh] flex-col items-center justify-center text-center">
        <span className="font-display text-7xl font-bold accent-text">404</span>
        <h1 className="mt-4 text-2xl font-bold">This page took a wrong turn.</h1>
        <p className="mt-2 max-w-md text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist — but our work does,
          and it&apos;s live.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back home
          </Link>
          <Link href="/work" className="btn-ghost">
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
