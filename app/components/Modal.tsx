"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalSize = "small" | "medium" | "large" | "xLarge";

type ModalAction = {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

interface ModalFooter {
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  heading?: React.ReactNode;
  headingIcon?: React.ReactNode;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  customClass?: string;
  modalSize?: ModalSize;
  footer?: ModalFooter;
  closeOnBackdrop?: boolean;
}

const sizeMap: Record<ModalSize, string> = {
  small: "max-w-md",
  medium: "max-w-2xl",
  large: "max-w-4xl",
  xLarge: "max-w-6xl",
};

export default function Modal({
  isOpen,
  onClose,
  heading,
  headingIcon,
  children,
  showCloseButton = true,
  customClass = "",
  modalSize = "medium",
  footer,
  closeOnBackdrop = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    // focus the dialog
    setTimeout(() => {
      modalRef.current?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
      onMouseDown={(e) => {
        if (!closeOnBackdrop) return;
        // close if clicking on backdrop (not the modal content)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full ${sizeMap[modalSize]} mx-auto ${customClass}`}
      >
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl overflow-hidden">
          <div className="flex items-start justify-between gap-4 p-4 border-b border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              {headingIcon && <div className="shrink-0">{headingIcon}</div>}
              {heading && <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{heading}</h3>}
            </div>

            {showCloseButton && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="p-4">
            {children}
          </div>

          {(footer?.primaryAction || footer?.secondaryAction) && (
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100 dark:border-zinc-800">
              {footer?.secondaryAction && (
                <button
                  onClick={footer.secondaryAction.onClick}
                  className={`px-4 py-2 rounded-md bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-200 ${footer.secondaryAction.className || ""}`}
                  disabled={footer.secondaryAction.disabled}
                >
                  {footer.secondaryAction.label}
                </button>
              )}

              {footer?.primaryAction && (
                <button
                  onClick={footer.primaryAction.onClick}
                  className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 ${footer.primaryAction.className || ""}`}
                  disabled={footer.primaryAction.disabled}
                >
                  {footer.primaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}

export type { ModalProps, ModalFooter, ModalAction };
