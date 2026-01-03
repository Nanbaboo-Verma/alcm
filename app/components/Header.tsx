"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "./NavProvider";

export default function Header() {
    const { navItems, toggle } = useNav();
    const pathname = usePathname();
    const [showTop, setShowTop] = useState(false);
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
                    <div className="text-lg font-semibold">ALCM</div>
                    <div className="text-sm">Public School</div>
                </div>

                <div className="flex gap-4 align-items-center" style={{ alignItems: "center" }}>
                    <div className="md:block hidden">ALCM</div>
                    <button className="py-2 px-4 rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
                        Admission
                    </button>
                    <button className="py-2 px-4 rounded-lg text-sm bg-amber-200 hover:bg-amber-300 cursor-pointer">
                        Sign In
                    </button>

                    <button aria-label="Toggle menu" onClick={toggle} className="sm:hidden">
                        ☰
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
                                    className={`px-4 py-1.5 hover:underline text-[#f1f1f1] ${
                                        isActive ? "bg-black" : "hover:bg-black"
                                    } hover:text-white`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
}
