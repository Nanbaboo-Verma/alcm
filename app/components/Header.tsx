"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "./NavProvider";
import { ArrowLeft, BookOpen, LogIn, LogOut, Menu, Settings, Shield, User, Users } from "react-feather";
import Popover from "./Popover";
import { useTheme } from "next-themes";
import logo from "../../public/assets/images/alcm_logo.png"
import alcmAddress from "../../public/assets/images/alcm_address.png"

export default function Header() {
    const { navItems, toggle } = useNav();
    const pathname = usePathname();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [trigger, setTrigger] = useState<HTMLElement | null>(null);
    const { theme, setTheme } = useTheme();
    const [showTop, setShowTop] = useState(false);
    const lastY = useRef(0);
    const [userProfile, setUserProfile] = useState('');
    const [admin, setAdmin] = useState(false);
    const [mounted, setMounted] = useState(false);
    // const [userDetails,setUserDetails] = useState({})
    // const [userDetails, setUserDetails] = useState(() => {
    //     if (typeof window !== "undefined") {
    //         const data = localStorage.getItem("user");
    //         return data ? JSON.parse(data) : null;
    //     }
    //     return null;
    // });


    // useEffect(() => {
    //     const loginData = localStorage.getItem("user");

    //     if (loginData) {
    //         const { email } = JSON.parse(loginData);
    //         const initials = email.slice(0, 2).toUpperCase();
    //         const isAdmin = JSON.parse(loginData).admin;
    //         setUserProfile(initials);
    //         setAdmin(isAdmin);
    //        setUserDetails(email)
    //     }

    // }, []);

    // useLayoutEffect(() => {
    //     const loginData = localStorage.getItem("user");

    //     if (loginData) {
    //         const user = JSON.parse(loginData);

    //         const initials = user.email.slice(0, 2).toUpperCase();

    //         setUserProfile(initials);
    //         setAdmin(user.admin);
    //         setUserDetails(user.email);
    //     }
    // }, []);

    useEffect(() => {
        setMounted(true);

        const loginData = localStorage.getItem("user");

        if (loginData) {
            const user = JSON.parse(loginData);

            // setUserDetails(user);
            setAdmin(user.admin);
            setUserProfile(user.email.slice(0, 2).toUpperCase());
        }
    }, []);







    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;

            // Detect direction
            if (currentY > lastY.current && currentY >= 64) {
                // 🔽 Scrolling DOWN
                setShowTop(false);
                // console.log("DOWN");
            } else if (currentY < lastY.current) {
                // 🔼 Scrolling UP
                setShowTop(true);
                // console.log("UP");
            }

            lastY.current = currentY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    // 
    // console.log(userDetails, admin, 'userProfile')
    // const isAuthenticated = admin && Object.keys(userDetails).length > 0 ? true : false\
    const isAuthenticated = Boolean(userProfile && admin);

    console.log(isAuthenticated, 'isAuth')

    const handleLogOut = () => {
        localStorage.removeItem('user');
    }


    return (<>
        <header
            className="sticky top-0 md:static z-50 md:shadow-none shadow w-full bg-white bg--[--#f3f0e8] transition-transform duration-300"
        >
                             {/* <div className="absolute left-0 top-0 w-1/6 h-full opacity-30">
    <div className="w-full h-full bg-[radial-gradient(circle,_#9ca3af_1px,_transparent_1px)] 
                bg-[size:10px_10px]">
    </div>
  </div> */}
            {/* header content section sm:h-18 h-14 */}
            <div className="mx-auto max-w-7xl px-4 md:px-5 py-3 flex items-center justify-between">
                <div className="w-20">
                    {/* <div className="text-lg font-semibold"> */}
                        <img src={logo.src} alt="" />
                    {/* </div> */}
                    {/* <div className="text-sm">Demo Project</div> */}
                </div>

                <div className="text-center sm:block hidden">
                    <img src={alcmAddress.src} alt="" className="max-w-md"/>
                    {/* <h2 className="uppercase text-blue-600 text-xl sm:text-2xl md:text-3xl font-semibold">ALCM Modern Public School</h2>
                    <p className="uppercase md:text-sm text-xs text-yellow-500">Chhaitikpurawa Ujjaini kalan, Gonda 271603</p> */}
                </div>

                <div className="flex gap-4 align-items-center" style={{ alignItems: "center" }}>
                    {/* <button className="py-2 px-4 rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
                        Admission
                    </button> */}

                    <button
                        ref={setTrigger}
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                        className="h-9 w-9 flex items-center justify-center text-white text-2xl bg-blue-500 rounded-full hover:bg-blue-600 cursor-pointer">
                        {userProfile === '' ? <User /> : userProfile}
                    </button>

                    <button
                        aria-label="Toggle menu"
                        onClick={toggle}
                        className="flex items-center justify-center h-9 w-9 md:hidden border rounded-full border-black bg-white cursor-pointer">
                        <Menu size={20}/>
                    </button>
                </div>
            </div>
        </header>

        {/* header nav section */}
        <div className={`bg-[#062a5f] md:block hidden sticky top-0 z-50`}>
            <div className="mx-auto max-w-7xl px-4 md:px-5 py-1 flex items-center justify-between overflow-x-auto no-scrollbar">
                <nav className="sm:flex text-[15px] space-x-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex gap-2 items-center whitespace-nowrap px-3 py-2 hover:underline text-[#f1f1f1] rounded-lg ${isActive ? "bg-[#3763c4]" : "hover:bg-[#3763c4]"
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
            popoverWidth={250}
            customClass="bg-blue-50"
        >
            <div className="space-y-1 p-2">

                {isAuthenticated
                    ? (<>
                        <Link href="/auth/login">
                            <button
                                className="flex items-center gap-3 w-full cursor-pointer rounded-lg px-4 py-3 
                    text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-500">
                                <Settings className="h-5 w-5" />
                                <span>Setting</span>
                            </button>
                        </Link>

                        <Link href="/auth/login">
                            <button
                                className="flex items-center gap-3 w-full cursor-pointer rounded-lg px-4 py-3 
                    text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-500">
                                <User className="h-5 w-5" />
                                <span>Profile</span>
                            </button>
                        </Link>



                        <button
                            onClick={handleLogOut}
                            className="flex items-center gap-3 w-full cursor-pointer rounded-lg px-4 py-3 
                    text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-400">
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </button>

                    </>
                    )
                    :
                    (<Link href="/auth/login">
                        <button
                            className="flex items-center gap-3 w-full cursor-pointer rounded-lg px-4 py-3 
                    text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-500">
                            <LogIn className="h-5 w-5" />
                            <span>Login</span>
                        </button>
                    </Link>
                    )}

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

    </>
    );
}
