"use client";

type Props = {
  open: boolean;
  onToggle: () => void;
};

export function BurgerButton({ open, onToggle }: Props) {
  return (
    <button
      type="button"
      className="ml-auto flex shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-2 text-foreground md:hidden"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      <img
        src={open ? "/assets/images/header/closeBurger.svg" : "/assets/images/header/openBurger.svg"}
        alt=""
        width={28}
        height={28}
        className="block h-7 w-7"
      />
    </button>
  );
}
