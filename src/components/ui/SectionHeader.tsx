import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 id={id} className="h-section mt-5">{title}</h2>
      {lead && <p className="lead mt-6">{lead}</p>}
    </Reveal>
  );
}
