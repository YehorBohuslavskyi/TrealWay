/**
 * Shared navigation contract: scroll to a section by its CSS class.
 * Used by Shell (header nav) and cross-feature CTAs (e.g. "Contact Us").
 */
const HEADER_OFFSET = 136;
const OFFSET = 20;

export function scrollToSection(sectionClass: string): void {
  if (typeof document === "undefined") return;
  const el = document.querySelector(`.${sectionClass}`);
  if (!el) return;
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition =
    elementPosition + window.pageYOffset - HEADER_OFFSET - OFFSET;
  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
}
