"use client";

import { Home, X } from "react-feather";
import { useNav } from "./NavProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const active = usePathname();
  const { navItems, isOpen, close } = useNav();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/40"
            onClick={close} />
          <aside className="relative w-70 h-full bg-white dark:bg-black">
            <div className="flex items-center justify-between border-b border-gray-400 px-4 py-2">
              <div className="space-y-0.5">
                <h3 className="text-lg font-medium text-blue-600 uppercase">NeoSOFT Technology</h3>
                <p className="text-xs text-yellow-500">Lower parel mumbai 200140</p>
              </div>
              {/* <button onClick={close} className=""><X size={18} color="gray"/></button> */}
            </div>
            <ul className="p-4 overflow-auto space-y-1" style={{ height: "calc(100vh - 78px)" }}>
              {navItems.map((item) => {
                const activeNav = active === item.href?'bg-blue-50 text-blue-600':'text-gray-700';

                return <li key={item.href} className="">
                  <Link href={item.href} onClick={close} 
                  className={`flex items-center gap-3 px-3 py-2.5 text-[13px] rounded ${activeNav} hover:bg-blue-50 hover:text-blue-600 hover:underline`}>
                    <Home size={16} /> {item.label}
                  </Link>
                </li>
              })}
            </ul>
          </aside>
        </div>
      )}
    </>
  );
}

