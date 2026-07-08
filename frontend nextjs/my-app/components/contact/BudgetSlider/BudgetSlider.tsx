"use client";

const MIN = 1000;
const MAX = 200000;
const STEP = 5000;

function formatCompact(n: number): string {
  if (n >= 1000) return `$${Math.round(n / 1000)}K`;
  return `$${n}`;
}

type Props = {
  valueLeft: number;
  valueRight: number;
  onValueLeftChange: (v: number) => void;
  onValueRightChange: (v: number) => void;
};

export function BudgetSlider({ valueLeft, valueRight, onValueLeftChange, onValueRightChange }: Props) {
  const fillLeft = ((valueLeft - MIN) / (MAX - MIN)) * 100;
  const fillRight = ((valueRight - MIN) / (MAX - MIN)) * 100;
  const fillWidth = fillRight - fillLeft;

  const tooClose = fillRight - fillLeft < 12;

  const handleLeft = (v: number) => {
    if (valueRight - v <= 0) onValueRightChange(v);
    onValueLeftChange(v);
  };
  const handleRight = (v: number) => {
    if (v - valueLeft <= 0) onValueLeftChange(v);
    onValueRightChange(v);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative mt-5 h-[82px] w-full md:h-[70px]">
        <div className="absolute inset-y-0 m-auto h-[5px] w-full rounded-[5px] border border-[#404040] bg-[#262626]" />
        <div
          className="absolute inset-y-0 m-auto h-[5px] rounded-[5px] border border-logo bg-[#8777D4] z-[1]"
          style={{ left: `${fillLeft}%`, width: `${fillWidth}%` }}
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          value={valueLeft}
          id="slider-1"
          step={STEP}
          onChange={(e) => handleLeft(Number(e.target.value))}
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={valueRight}
          id="slider-2"
          step={STEP}
          onChange={(e) => handleRight(Number(e.target.value))}
        />

        {tooClose ? (
          <div
            className="absolute top-[46px] z-[4] whitespace-nowrap px-2 py-1.5 text-sm font-semibold -translate-x-1/2 transition-[left] duration-100 md:top-[42px] md:text-base"
            style={{ left: `${(fillLeft + fillRight) / 2}%` }}
          >
            {formatCompact(valueLeft)} – {formatCompact(valueRight)}
          </div>
        ) : (
          <>
            <div
              className="absolute top-[46px] z-[4] whitespace-nowrap px-2 py-1.5 text-sm font-semibold -translate-x-1/2 transition-[left] duration-100 md:top-[42px] md:text-base"
              style={{ left: `${fillLeft}%` }}
            >
              {formatCompact(valueLeft)}
            </div>
            <div
              className="absolute top-[46px] z-[4] whitespace-nowrap px-2 py-1.5 text-sm font-semibold -translate-x-1/2 transition-[left] duration-100 md:top-[42px] md:text-base"
              style={{ left: `${fillRight}%` }}
            >
              {formatCompact(valueRight)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
