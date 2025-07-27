// src/context/toast-context.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ToastType = {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

type ToastContextType = {
  toasts: ToastType[];
  toast: (data: Omit<ToastType, "id">) => void;
  remove: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const toast = (data: Omit<ToastType, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...data, id }]);
    // Que se remueva despues de 3s
    setTimeout(() => remove(id), 3000);
  };

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, remove }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
};
