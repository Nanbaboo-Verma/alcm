"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "./NavProvider";
import {
  BookOpen,
  LogIn,
  LogOut,
  Menu,
  Shield,
  User,
  Users,
} from "react-feather";
import Popover from "./Popover";
import { useTheme } from "next-themes";
import logo from "../../public/assets/images/alcm_logo.png";
import alcmAddress from "../../public/assets/images/alcm_address.png";
import { useAuth } from "@/app/features/auth/AuthContext";

export default function Header() {
  const { navItems, toggle } = useNav();
  const pathname = usePathname();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const { setTheme } = useTheme();
  const lastY = useRef(0);

  const { user, role, isAuthenticated, logout } = useAuth();

  const userInitials = user?.name
    ? user.name.slice(0, 2).toUpperCase()
    : user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "";

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 md:static z-50 md:shadow-none shadow w-full bg-white transition-transform duration-300">
        <div className="mx-auto max-w-7xl px-4 md:px-5 py-3 flex items-center justify-between">
          <div className="w-20">
            <Link href="/">
              <img src={logo.src} alt="ALCM Logo" className="cursor-pointer" />
            </Link>
          </div>

          <div className="text-center sm:block hidden">
            <img src={alcmAddress.src} alt="ALCM Address" className="max-w-md" />
          </div>

          <div
            className="flex gap-4 align-items-center"
            style={{ alignItems: "center" }}
          >
            {/* User Profile / Login Avatar */}
            <button
              ref={setTrigger}
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className={`h-9 w-9 flex items-center justify-center text-white text-xs font-bold rounded-full transition shadow-xs cursor-pointer ${
                role === "admin"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : role === "teacher"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : role === "student"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              title={isAuthenticated ? `${user?.name} (${role})` : "Account"}
            >
              {isAuthenticated && userInitials ? userInitials : <User size={18} />}
            </button>

            <button
              aria-label="Toggle menu"
              onClick={toggle}
              className="flex items-center justify-center h-9 w-9 md:hidden border rounded-full border-black bg-white cursor-pointer"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Header Navigation Section */}
      <div className="bg-[#062a5f] md:block hidden sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 md:px-5 py-1 flex items-center justify-between overflow-x-auto no-scrollbar">
          <nav className="sm:flex text-[15px] space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex gap-2 items-center whitespace-nowrap px-3 py-2 hover:underline text-[#f1f1f1] rounded-lg ${
                    isActive ? "bg-[#3763c4]" : "hover:bg-[#3763c4]"
                  } hover:text-white`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <Popover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        triggerElement={trigger}
        direction="left"
        popoverWidth={280}
        customClass="bg-white shadow-xl rounded-2xl border border-slate-200"
      >
        <div className="space-y-1 p-3">
          {isAuthenticated && user ? (
            <>
              {/* User Identity Info */}
              <div className="px-3 py-2 bg-slate-50 rounded-xl mb-2 border border-slate-100">
                <p className="font-bold text-sm text-slate-900 truncate">{user.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                <div className="mt-1.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : role === "teacher"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {role === "admin" && "🛡️ Admin"}
                    {role === "teacher" && "👨‍🏫 Teacher"}
                    {role === "student" && "🎓 Student"}
                  </span>
                </div>
              </div>

              {/* Role-Specific Dashboard Access */}
              {role === "student" && (
                <Link
                  href="/student/dashboard"
                  onClick={() => setIsPopoverOpen(false)}
                  className="flex items-center gap-3 w-full rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>Student Portal</span>
                </Link>
              )}

              {role === "teacher" && (
                <Link
                  href="/teacher/dashboard"
                  onClick={() => setIsPopoverOpen(false)}
                  className="flex items-center gap-3 w-full rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition"
                >
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  <span>Teacher Portal</span>
                </Link>
              )}

              {role === "admin" && (
                <>
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsPopoverOpen(false)}
                    className="flex items-center gap-3 w-full rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition"
                  >
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span>Admin Control Center</span>
                  </Link>

                  <Link
                    href="/teacher/dashboard"
                    onClick={() => setIsPopoverOpen(false)}
                    className="flex items-center gap-3 w-full rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition"
                  >
                    <BookOpen className="h-4 w-4 text-emerald-500" />
                    <span>Teacher View</span>
                  </Link>

                  <Link
                    href="/student/dashboard"
                    onClick={() => setIsPopoverOpen(false)}
                    className="flex items-center gap-3 w-full rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>Student View</span>
                  </Link>
                </>
              )}

              <hr className="my-2 border-slate-100" />

              <button
                onClick={() => {
                  setIsPopoverOpen(false);
                  logout();
                }}
                className="flex items-center gap-3 w-full rounded-xl px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-red-500" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setIsPopoverOpen(false)}
                className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-xs font-semibold text-blue-700 bg-blue-50/70 hover:bg-blue-100 transition"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In to Portal</span>
              </Link>

              <Link
                href="/signup"
                onClick={() => setIsPopoverOpen(false)}
                className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                <User className="h-4 w-4" />
                <span>Create Account</span>
              </Link>
            </>
          )}
        </div>

        <hr className="my-1 border-slate-100" />

        <div className="space-y-1 p-2">
          <p className="px-3 text-[10px] uppercase font-semibold tracking-wider text-slate-400">Theme</p>
          <div className="grid grid-cols-3 gap-1 px-1">
            <button
              className="px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg text-center cursor-pointer"
              onClick={() => setTheme("light")}
            >
              🌞 Light
            </button>
            <button
              className="px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg text-center cursor-pointer"
              onClick={() => setTheme("dark")}
            >
              🌙 Dark
            </button>
            <button
              className="px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg text-center cursor-pointer"
              onClick={() => setTheme("system")}
            >
              💻 Auto
            </button>
          </div>
        </div>
      </Popover>
    </>
  );
}
