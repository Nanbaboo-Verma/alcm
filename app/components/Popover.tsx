'use client';

import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  popoverWidth?: string | number;
  customClass?: string;
  direction?: 'left' | 'right' | 'center';
  children?: React.ReactNode;
  triggerElement?: HTMLElement | null;
}

const Popover: React.FC<PopoverProps> = ({
  isOpen,
  onClose,
  popoverWidth = '250px',
  customClass = '',
  direction = 'center',
  children,
  triggerElement,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !triggerElement || !popoverRef.current) return;

    const calculatePosition = () => {
      const triggerRect = triggerElement.getBoundingClientRect();
      const popoverRect = popoverRef.current?.getBoundingClientRect();

      if (!popoverRect) return;

      let left = 0;
      let top = triggerRect.bottom + 8; // 8px gap below trigger

      // Calculate horizontal position based on direction
      switch (direction) {
        case 'left':
          left = triggerRect.left - popoverRect.width + triggerRect.width;
          break;
        case 'right':
          left = triggerRect.right - triggerRect.width;
          break;
        case 'center':
        default:
          left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
          break;
      }

      // Prevent popover from going off-screen
      const padding = 16;
      if (left < padding) {
        left = padding;
      } else if (left + popoverRect.width > window.innerWidth - padding) {
        left = window.innerWidth - popoverRect.width - padding;
      }

      setPosition({ top, left });
    };

    calculatePosition();
    window.addEventListener('scroll', calculatePosition);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, triggerElement, direction]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerElement &&
        !triggerElement.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, triggerElement]);

  if (!mounted || !isOpen) return null;

  const popoverWidth_px =
    typeof popoverWidth === 'number' ? `${popoverWidth}px` : popoverWidth;

  return createPortal(
    <div
      ref={popoverRef}
      className={`fixed z-50 rounded-xl border border-slate-200 bg-white p-2 shadow-sm ${customClass}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: popoverWidth_px,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default Popover;
