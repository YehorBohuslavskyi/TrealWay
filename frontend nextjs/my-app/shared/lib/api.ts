/**
 * Shared API contract for feedback/contact.
 * Features (Contact: QA, Footer) use this instead of raw fetch.
 */
import { FEEDBACK_API_URL } from "@/shared/config/constants";

export interface SubmitContactPayload {
  name: string;
  email: string;
  contactReasons: string[] | null;
  budgetMin: number | null;
  budgetMax: number | null;
  question: string | null;
}

export interface SubscribePayload {
  email: string;
}

export const feedbackApi = {
  async submitContact(payload: SubmitContactPayload): Promise<Response> {
    return fetch(FEEDBACK_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },

  async subscribeEmail(payload: SubscribePayload): Promise<Response> {
    return fetch(FEEDBACK_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
};
