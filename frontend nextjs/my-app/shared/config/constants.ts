/**
 * Shared config: API endpoint for feedback/contact.
 * Defaults to the built-in Next.js API route (same origin — no CORS).
 * Override via NEXT_PUBLIC_FEEDBACK_API_URL if you need an external backend.
 */
export const FEEDBACK_API_URL: string =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_FEEDBACK_API_URL
    ? process.env.NEXT_PUBLIC_FEEDBACK_API_URL
    : "/api/feedback";
