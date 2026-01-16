"use client";

import React, { createContext, useContext, useState } from "react";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact us", href: "/contact-us" },
  { label: "Admission", href: "/admission" },
  { label: "Result", href: "/result" },
  { label: "Game", href: "/game" },
  { label: "Guest", href: "/guest" },
  { label: "Calendar", href: "/calendar" },
  { label: "Career", href: "/career" },
  { label: "Gallery", href: "/gallery" },
];

type NavContextValue = {
  navItems: NavItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const NavContext = createContext<NavContextValue | undefined>(undefined);

export default function NavProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  return (
    <NavContext.Provider value={{ navItems: NAV_ITEMS, isOpen, open, close, toggle }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}
