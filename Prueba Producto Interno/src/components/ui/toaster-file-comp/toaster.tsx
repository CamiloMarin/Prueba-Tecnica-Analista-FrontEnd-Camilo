// src/components/ToastContainer.tsx
import { useToast } from "@/lib/toast-context"
import styles from "./ToastContainer.module.css"

export function ToastContainer() {
  const { toasts, remove } = useToast()

  return (
    <div className={styles.toastWrapper}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${
            toast.variant === "destructive" ? styles.destructive : styles.default
          }`}
        >
          <div className={styles.title}>{toast.title}</div>
          {toast.description && (
            <div className={styles.description}>{toast.description}</div>
          )}
          <button
            onClick={() => remove(toast.id)}
            className={styles.close}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
