"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Device = "desktop" | "tablet" | "mobile";

type LivePreviewProps = {
  liveUrl: string;
  domain: string;
  screenshotUrl: string;
  name: string;
  /** Only sites we've verified permit framing offer the live iframe. */
  allowEmbed?: boolean;
  /** Compact chrome for cards; full controls on project pages. */
  compact?: boolean;
  className?: string;
};

// Max-widths per device. The embedded site responds to this width naturally,
// so no fragile scale math — the toggle genuinely resizes the frame.
const DEVICE_WIDTH: Record<Device, string> = {
  desktop: "100%",
  tablet: "820px",
  mobile: "390px",
};

const LOAD_TIMEOUT_MS = 12000;

export function LivePreview({
  liveUrl,
  domain,
  screenshotUrl,
  name,
  allowEmbed = false,
  compact = false,
  className,
}: LivePreviewProps) {
  const [device, setDevice] = useState<Device>("desktop");
  // Embeddable previews start live; blocked ones stay on the snapshot.
  const [mode, setMode] = useState<"screenshot" | "live">(
    allowEmbed ? "live" : "screenshot"
  );
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "failed">(
    "idle"
  );
  const [inView, setInView] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  // Once the user manually asks for the snapshot, don't auto-upgrade back to live.
  const forcedSnapshot = useRef(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lazy-load: never load anything until the component scrolls near view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clearLoadTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const goLive = useCallback(() => {
    forcedSnapshot.current = false;
    setMode("live");
    setStatus("loading");
    setReloadKey((k) => k + 1);
  }, []);

  const goSnapshot = useCallback(() => {
    forcedSnapshot.current = true;
    clearLoadTimeout();
    setMode("screenshot");
  }, []);

  // Kick off the live embed as soon as an embeddable preview enters view.
  useEffect(() => {
    if (
      inView &&
      allowEmbed &&
      mode === "live" &&
      status === "idle" &&
      !forcedSnapshot.current
    ) {
      setStatus("loading");
      setReloadKey((k) => k + 1);
    }
  }, [inView, allowEmbed, mode, status]);

  // Load-failure watchdog: if a frame never signals a clean load, fall back.
  useEffect(() => {
    if (mode !== "live" || status !== "loading") return;
    clearLoadTimeout();
    timeoutRef.current = setTimeout(() => {
      setStatus((s) => {
        if (s === "loading") {
          setMode("screenshot");
          return "failed";
        }
        return s;
      });
    }, LOAD_TIMEOUT_MS);
    return clearLoadTimeout;
  }, [mode, status, reloadKey]);

  const handleIframeLoad = () => {
    clearLoadTimeout();
    setStatus("ok");
  };

  const reload = () => {
    if (mode === "live") {
      setStatus("loading");
      setReloadKey((k) => k + 1);
    }
  };

  const devices: { id: Device; label: string; icon: string }[] = [
    { id: "desktop", label: "Desktop", icon: "M3 4h18v11H3zM8 19h8M12 15v4" },
    { id: "tablet", label: "Tablet", icon: "M5 3h14v18H5zM11 17h2" },
    { id: "mobile", label: "Mobile", icon: "M7 3h10v18H7zM10 18h4" },
  ];

  const showIframe = mode === "live" && inView && allowEmbed;

  return (
    <div ref={wrapRef} className={className}>
      <div className="glass overflow-hidden shadow-panel">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-base-border bg-base-soft/80 px-3 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-base-border bg-base px-3 py-1.5">
            <LockIcon />
            <span className="truncate text-xs text-ink-muted">{domain}</span>
            {showIframe && status === "ok" && (
              <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#28c840]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#28c840]" />
                Live
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={reload}
            disabled={!showIframe}
            className="hidden h-7 w-7 items-center justify-center rounded-full border border-base-border text-ink-muted transition-colors hover:text-accent-soft disabled:opacity-40 sm:inline-flex"
            aria-label="Reload preview"
            title="Reload preview"
          >
            <ReloadIcon />
          </button>
        </div>

        {/* Controls */}
        {!compact && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-border bg-base-soft/40 px-3 py-2.5">
            <div
              className="hidden items-center gap-1 rounded-full border border-base-border bg-base p-1 sm:flex"
              role="group"
              aria-label="Preview device size"
            >
              {devices.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDevice(d.id)}
                  aria-pressed={device === d.id}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    device === d.id
                      ? "bg-accent text-base"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={d.icon} />
                  </svg>
                  {d.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {allowEmbed && mode === "screenshot" && (
                <button
                  type="button"
                  onClick={goLive}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-base transition-colors hover:bg-accent-soft"
                >
                  <PlayIcon />
                  Preview live
                </button>
              )}
              {showIframe && (
                <button
                  type="button"
                  onClick={goSnapshot}
                  className="inline-flex items-center gap-1.5 rounded-full border border-base-border px-3.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  Snapshot
                </button>
              )}
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-base-border px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent-soft"
              >
                Open live
                <ArrowUpRight />
              </a>
            </div>
          </div>
        )}

        {/* Viewport */}
        <div className="relative bg-[#0d0d10]">
          <div
            className="mx-auto transition-[max-width] duration-500 ease-out"
            style={{ maxWidth: compact ? "100%" : DEVICE_WIDTH[device] }}
          >
            <div
              className={`relative w-full overflow-hidden ${
                compact ? "h-56 sm:h-64" : "h-[380px] sm:h-[520px]"
              }`}
            >
              {/* Screenshot layer — instant placeholder + fallback (always under). */}
              <div
                className={`absolute inset-0 overflow-y-auto overflow-x-hidden ${
                  showIframe ? "" : "z-[1]"
                }`}
              >
                {inView ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={screenshotUrl}
                    alt={`Preview of the ${name} website`}
                    className="w-full select-none"
                    loading="lazy"
                    draggable={false}
                  />
                ) : (
                  <Skeleton />
                )}
              </div>

              {/* Live iframe layer — the real, scrollable site. */}
              {showIframe && (
                <>
                  <iframe
                    key={reloadKey}
                    src={liveUrl}
                    title={`Live preview of ${name}`}
                    onLoad={handleIframeLoad}
                    className="absolute inset-0 z-[2] h-full w-full border-0 bg-white"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {status === "loading" && (
                    <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center bg-[#0d0d10]/70">
                      <div className="flex flex-col items-center gap-3">
                        <Spinner />
                        <span className="text-xs text-ink-muted">
                          Loading the real site…
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Compact: a small corner "Open live" pill (doesn't block scrolling). */}
              {compact && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2.5 right-2.5 z-[4] inline-flex items-center gap-1.5 rounded-full bg-base/85 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur transition-colors hover:text-accent-soft"
                  aria-label={`Open ${name} live in a new tab`}
                >
                  Open live <ArrowUpRight />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status note under the frame */}
      {!compact && (
        <p className="mt-3 flex items-center gap-2 text-xs text-ink-faint">
          {showIframe && status === "ok" ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
              You&apos;re scrolling the real, live site — right here. Try the
              device toggle, or open it in a new tab.
            </>
          ) : status === "loading" ? (
            <>
              <InfoIcon />
              Loading the real site into the frame…
            </>
          ) : status === "failed" || (!allowEmbed && mode === "screenshot") ? (
            <>
              <InfoIcon />
              This site blocks embedding, so we show a live snapshot. Hit “Open
              live” to scroll the real thing in a new tab.
            </>
          ) : (
            <>
              <InfoIcon />
              Snapshot view. Hit “Preview live” to scroll the real site here.
            </>
          )}
        </p>
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="h-full w-full">
      <div className="relative h-full w-full overflow-hidden bg-base-panel">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
  );
}

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 10V8a6 6 0 1 1 12 0v2M5 10h14v10H5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-ink-faint"
      />
    </svg>
  );
}

function ReloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 11v5M12 8h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
