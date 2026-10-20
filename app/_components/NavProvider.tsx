"use client";

import React, { createContext, useContext, useState } from "react";
import { Award, BarChart, Briefcase, Calendar, FileText, Home, LifeBuoy, Phone, Triangle, Users } from "react-feather";

type NavItem = { label: string; path: string, icon: React.ReactNode};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/", icon: <Home size={18} /> },
  { label: "About", path: "/about", icon: <Users size={18} /> },
  { label: "Contact us", path: "/contact-us", icon: <Phone size={18} /> },
  { label: "Admission", path: "/admission", icon: <FileText size={18} /> },
  { label: "Result", path: "/result", icon: <BarChart size={18} /> },
  { label: "Game", path: "/game", icon: <LifeBuoy size={18} /> },
  { label: "Guest", path: "/guest", icon: <Users size={18} /> },
  { label: "Calendar", path: "/calendar", icon: <Calendar size={18} /> },
  { label: "Career", path: "/career", icon: <Briefcase size={18} /> },
  { label: "Gallery", path: "/gallery", icon: <Triangle size={18} /> },
  // for admin 
  { label: "Contact Info", path: "/contact-info", icon: <Home size={18} /> },
  { label: "Award", path: "/award", icon: <Award size={18} /> },
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
