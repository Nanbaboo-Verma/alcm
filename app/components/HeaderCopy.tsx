"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "./NavProvider";
import { ArrowLeft, BookOpen, Menu, Settings, Shield, User, Users } from "react-feather";
import Popover from "./Popover";
import { useTheme } from "next-themes";

export default function Header() {
    const { navItems, toggle } = useNav();
    const pathname = usePathname();
    const [showTop, setShowTop] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [trigger, setTrigger] = useState<HTMLElement | null>(null);
    const { theme, setTheme } = useTheme();

    const lastY = useRef(0);

    useEffect(() => {
        // initialize lastY and showTop
        lastY.current = window.scrollY;

        const onScroll = () => {
            // on wider screens keep header visible
            if (window.innerWidth >= 768) {
                setShowTop(true);
                lastY.current = window.scrollY;
                return;
            }

            const y = window.scrollY;
            const delta = lastY.current - y; // positive when scrolling up

            if (y <= 50) {
                setShowTop(true);
            } else if (delta > 50) {
                setShowTop(true);
            } else if (delta < -10) {
                setShowTop(false);
            }

            lastY.current = y;
        };

        const onResize = () => {
            if (window.innerWidth >= 768) {
                setShowTop(true);
            } else {
                // recalc based on current scroll position
                onScroll();
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        // run once to set initial state
        onResize();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <header
            // toggle top between hidden (-top-16) and visible (top-0)
            className={`sticky left-0 right-0 z-50 w-full bg-[#f3f0e8] ${showTop ? "top-0" : "-top-16"}`}
            style={{ transition: "top 280ms ease" }}
        >
            {/* header content section */}
            <div className="mx-auto max-w-7xl h-16 px-4 md:px-5 py-3 flex items-center justify-between">
                <div className="text-center">
                    <div className="text-lg font-semibold">NeoSOFT</div>
                    <div className="text-sm">Demo Project</div>
                </div>

                <div className="flex gap-4 align-items-center" style={{ alignItems: "center" }}>
                    <button className="py-2 px-4 rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
                        Admission
                    </button>

                    <button
                        ref={setTrigger}
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                        className="text-white bg-blue-500 rounded-full p-2 hover:bg-blue-600 cursor-pointer">
                        <User />
                    </button>

                    <button aria-label="Toggle menu" onClick={toggle} className="md:hidden border cursor-pointer p-1 rounded">
                        <Menu />
                    </button>

                </div>
            </div>

            {/* header nav section */}
            <div className="bg-[#282A35] md:block hidden">
                <div className="mx-auto max-w-7xl px-4 md:px-5 flex items-center justify-between">
                    <nav className="sm:flex text-[15px]">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-1.5 hover:underline text-[#f1f1f1] ${isActive ? "bg-black" : "hover:bg-black"
                                        } hover:text-white`}
                                >
                                    {item.label}
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
                popoverWidth={250}
                customClass="bg-blue-50"
            >
                <div className="space-y-1 p-2">
                    <Link href="/auth/login">
                    <button
                        className="flex items-center gap-3 w-full cursor-pointer rounded-lg px-4 py-3 
                    text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-500">
                        <Shield className="h-5 w-5" />
                        <span>Login</span>
                    </button>
                    </Link>

                     <button
                        className="flex items-center gap-3 w-full cursor-pointer rounded-lg px-4 py-3 
                    text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-500">
                        <Shield className="h-5 w-5" />
                        <span>Admin</span>
                    </button>
                </div>
                <nav className="space-y-1 p-2" aria-label="Account menu">

                    {/* Admin */}
                    <a
                        href="#settings"
                        className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-slate-900"
                    >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg">
                            <Shield className="h-5 w-5" />
                        </span>
                        <span>Admin</span>
                    </a>
                    <button
                        className="flex items-center gap-3 w-full cursor-pointer rounded-lg px-4 py-3 
                    text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-slate-900">
                        <Shield className="h-5 w-5" />
                        <span>Admin</span>
                    </button>

                    {/* Teacher */}
                    <a
                        href="#settings"
                        className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg">
                            <BookOpen className="h-5 w-5" />
                        </span>
                        <span>Teacher</span>
                    </a>
                    {/* Student */}
                    <a
                        href="#settings"
                        className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg">
                            <Users className="h-5 w-5" />
                        </span>
                        <span>Student</span>
                    </a>
                </nav>

                <hr className="my-2 border-slate-200" />

                <div className="space-y-1 p-2">
                    <button className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer" onClick={() => setTheme("light")}>Light🌞</button>
                    <button className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer" onClick={() => setTheme("dark")}>Dark🌙</button>
                    <button className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer" onClick={() => setTheme("system")}>System💻</button>
                </div>
            </Popover>
        </header>
    );
}
