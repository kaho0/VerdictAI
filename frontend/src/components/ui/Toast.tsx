"use client";

import { useEffect, useState } from "react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

let toastId = 0;

export function showToast(message: string, type: "success" | "error" = "success") {
  const id = `toast-${toastId++}`;
  const event = new CustomEvent("showToast", { detail: { id, message, type } });
  window.dispatchEvent(event);
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (e: CustomEvent) => {
      const toast = e.detail as Toast;
      setToasts(prev => [...prev, toast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 3000);
    };

    window.addEventListener("showToast", handleToast as EventListener);
    return () => window.removeEventListener("showToast", handleToast as EventListener);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all transform ${
            toast.type === "success" 
              ? "bg-green-600" 
              : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
