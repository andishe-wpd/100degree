import React, { useEffect, useState } from "react";
import styles from "./Toast.module.scss";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose?: () => void;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 4000,
  onClose,
  isVisible,
}) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(() => {
          onClose?.();
        }, 300); // Wait for fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isShowing) return null;

  return (
    <div className={`${styles.toast} ${styles[type]} ${isShowing ? styles.show : styles.hide}`}>
      <div className={styles.content}>
        <span className={styles.message}>{message}</span>
        <button
          className={styles.closeButton}
          onClick={() => {
            setIsShowing(false);
            setTimeout(() => {
              onClose?.();
            }, 300);
          }}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};
