import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkGrid } from "@/components/WorkGrid";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Our Work — Live, interactive case studies",
  description:
    "Explore RA Interactive's portfolio: real, scrollable live previews of the websites and web apps we've shipped, each with the outcome it delivered.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="section pb-0">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our work"
            title={
              <>
                Real projects.{" "}
                <span className="accent-text">Really live.</span>
              </>
            }
            subtitle="Every project below is a genuine, scrollable preview of a site we built — filter by type, then open any of them live in a new tab."
          />
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <WorkGrid />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
