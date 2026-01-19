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
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [trigger, setTrigger] = useState<HTMLElement | null>(null);
    const { theme, setTheme } = useTheme();
    const [showTop, setShowTop] = useState(false);
    const lastY = useRef(0);
    const [userProfile, setUserProfile] = useState('');

    useEffect(() => {
        const loginData = localStorage.getItem("login");

        if (loginData) {
            const { email } = JSON.parse(loginData);
            const initials = email.slice(0, 2).toUpperCase();
            setUserProfile(initials);
        }
    }, []);


    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;

            // Detect direction
            if (currentY > lastY.current && currentY >= 64) {
                // 🔽 Scrolling DOWN
                setShowTop(false);
                console.log("DOWN");
            } else if (currentY < lastY.current) {
                // 🔼 Scrolling UP
                setShowTop(true);
                console.log("UP");
            }

            lastY.current = currentY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);


    return (
        <header
            className={`left-0 right-0 z-50 w-full bg-[#f3f0e8] transition-transform duration-300 ${showTop ? 'fixed' : ''}`}>
            {/* header content section */}
            <div className="mx-auto max-w-7xl h-16 px-4 md:px-5 py-3 flex items-center justify-between">
                <div className="text-center">
                    <div className="text-lg font-semibold">NeoSOFT</div>
                    <div className="text-sm">Demo Project</div>
                </div>

                <div className="flex gap-4 align-items-center" style={{ alignItems: "center" }}>
                    {/* <button className="py-2 px-4 rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
                        Admission
                    </button> */}

                    <button
                        ref={setTrigger}
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                        className="h-10 w-10 flex align-items-center justify-center text-white text-2xl bg-blue-500 rounded-full hover:bg-blue-600 cursor-pointer">
                        {userProfile === ' ' ? <User /> : userProfile}
                    </button>

                    <button
                        aria-label="Toggle menu"
                        onClick={toggle}
                        className="flex items-center justify-center h-9 w-9 md:hidden border border-blue-500 cursor-pointer rounded">
                        <Menu color="blue"/>
                    </button>
                </div>
            </div>

            {/* header nav section */}
            <div className={`bg-[#282A35] md:block hidden z-40 ${showTop ? '' : 'fixed top-0 w-full'}`}>
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

                    {/* <button
                        className="flex items-center gap-3 w-full cursor-pointer rounded-lg px-4 py-3 
                    text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-500">
                        <Shield className="h-5 w-5" />
                        <span>Admin</span>
                    </button> */}
                </div>
                {/* <nav className="space-y-1 p-2" aria-label="Account menu"> */}

                {/* Admin */}
                {/* <a
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
                    </button> */}

                {/* Teacher */}
                {/* <a
                        href="#settings"
                        className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg">
                            <BookOpen className="h-5 w-5" />
                        </span>
                        <span>Teacher</span>
                    </a> */}
                {/* Student */}
                {/* <a
                        href="#settings"
                        className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg">
                            <Users className="h-5 w-5" />
                        </span>
                        <span>Student</span>
                    </a>
                </nav> */}

                <hr className="my-2 border-slate-200" />

                <div className="space-y-1 p-2">
                    <button
                        className="flex items-center w-full gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-500 cursor-pointer"
                        onClick={() => setTheme("light")}>🌞 Light</button>
                    <button
                        className="flex items-center w-full gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-500 cursor-pointer"
                        onClick={() => setTheme("dark")}>🌙 Dark</button>
                    <button
                        className="flex items-center w-full gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-500 cursor-pointer"
                        onClick={() => setTheme("system")}>💻 System</button>
                </div>
            </Popover>
        </header>
    );
}
