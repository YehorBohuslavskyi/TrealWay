import Image from "next/image";

type Props = {
  iconSrc: string;
  iconAlt: string;
  title: string;
  subtitle: string;
  href?: string;
};

export function SocialLink({ iconSrc, iconAlt, title, subtitle, href }: Props) {
  const content = (
    <>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#151515] md:h-10 md:w-10">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={20}
          height={20}
          className="opacity-80"
        />
      </div>
      <div className="min-w-0">
        <div className="truncate font-mono text-[11px] font-medium uppercase tracking-wider md:text-xs">
          {title}
        </div>
        <div className="truncate text-[11px] text-[#888] md:text-xs">
          {subtitle}
        </div>
      </div>
    </>
  );

  const className =
    "flex items-center gap-3 rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] p-3.5 transition-all duration-300 hover:border-dark-violet/20 md:p-5 no-underline text-foreground";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
