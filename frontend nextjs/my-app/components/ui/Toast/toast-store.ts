/**
 * Minimal toast store — no external deps.
 * Components call `toast.success(msg)` / `toast.error(msg)`;
 * the mounted <Toaster /> subscribes and renders them.
 */
export type ToastVariant = "success" | "error";

export interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

type Listener = (toasts: ToastItem[]) => void;

let toasts: ToastItem[] = [];
let counter = 0;
const listeners = new Set<Listener>();

const emit = () => listeners.forEach((l) => l(toasts));

export function subscribe(listener: Listener) {
  listeners.add(listener);
  listener(toasts);
  return () => {
    listeners.delete(listener);
  };
}

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

function push(message: string, variant: ToastVariant) {
  const id = ++counter;
  toasts = [...toasts, { id, message, variant }];
  emit();
  return id;
}

export const toast = {
  success: (message: string) => push(message, "success"),
  error: (message: string) => push(message, "error"),
};
