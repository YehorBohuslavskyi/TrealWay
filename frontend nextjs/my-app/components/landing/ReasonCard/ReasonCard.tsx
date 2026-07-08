import { ReactNode } from "react";

type Props = {
  index: string;
  title: ReactNode;
  description: ReactNode;
};

export function ReasonCard({ index, title, description }: Props) {
  return (
    <div className="flex min-w-0 flex-1 gap-3 rounded-xl bg-dark-gray p-4 transition-colors duration-300 hover:bg-dark-gray/90 md:min-w-[280px] md:gap-5 md:pr-6">
      <div className="flex w-12 shrink-0 items-center justify-center rounded-lg bg-[#1F1F1F] text-lg font-bold text-logo md:w-20 md:text-2xl">
        {index}
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <span className="text-lg font-medium uppercase leading-snug break-words md:text-xl">
          {title}
        </span>
        <span className="text-sm leading-relaxed text-light-gray break-words md:text-base">
          {description}
        </span>
      </div>
    </div>
  );
}
