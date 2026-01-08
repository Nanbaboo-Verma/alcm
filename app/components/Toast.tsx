"use client";

import React, { useEffect, useState } from "react";

type ToastType = "default" | "success" | "error" | "warning";

interface ToastProps {
  isOpen: boolean;
  message: string;
  description?: string;
  type?: ToastType;
  timeOut?: number;
  customClass?: string;
  onClose?: () => void;
  icon?: React.ReactNode;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  autoClose?: boolean;
}

const positionClassMap: Record<string, string> = {
  "top-left": "fixed top-5 left-5",
  "top-right": "fixed top-5 right-5",
  "bottom-left": "fixed bottom-5 left-5",
  "bottom-right": "fixed bottom-5 right-5",
  "top-center": "fixed top-5 left-1/2 transform -translate-x-1/2",
  "bottom-center": "fixed bottom-5 left-1/2 transform -translate-x-1/2",
};

const Toast: React.FC<ToastProps> = ({
  isOpen,
  message,
  description,
  type = "default",
  timeOut = 3000,
  customClass = "",
  onClose,
  icon,
  position = "top-right",
  autoClose = true,
}) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    setVisible(isOpen);

    if (isOpen && autoClose && timeOut > 0) {
      const t = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, timeOut);
      return () => clearTimeout(t);
    }
  }, [isOpen, autoClose, timeOut, onClose]);

  useEffect(() => {
    if (!visible) onClose?.();
    // only call onClose when visible changes to false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  const baseClasses =
    "flex items-start gap-3 p-4 rounded-lg shadow-md min-w-[300px] max-w-md z-50";

  const typeClasses: Record<ToastType, string> = {
    default:
      "bg-white dark:bg-slate-800 border-l-4 border-gray-500 text-gray-900 dark:text-gray-100",
    success:
      "bg-emerald-50 dark:bg-emerald-900 border-l-4 border-emerald-500 text-emerald-800 dark:text-emerald-200",
    error:
      "bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-800 dark:text-red-200",
    warning:
      "bg-yellow-50 dark:bg-amber-900 border-l-4 border-amber-500 text-amber-800 dark:text-amber-200",
  };

  const getIcon = () => {
    if (icon) return icon;

    const svgProps = "w-5 h-5";

    switch (type) {
      case "success":
        return (
          <svg className={svgProps} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "error":
        return (
          <svg className={svgProps} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg className={svgProps} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "default":
      default:
        return (
          <svg className={svgProps} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 9a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const posClass = positionClassMap[position] || positionClassMap["top-right"];

  return (
    <div className={`${posClass} z-50`}> 
      <div className={`${baseClasses} ${typeClasses[type]} ${customClass}`}> 
        <div className="flex shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="font-semibold text-sm">{message}</div>
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>

        <button
          aria-label="Close toast"
          onClick={() => setVisible(false)}
          className="ml-3 flex shrink-0 text-gray-600 hover:opacity-80"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
export type { ToastProps, ToastType };
