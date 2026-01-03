"use client";

import { useNav } from "./NavProvider";
import Link from "next/link";

export default function Sidebar() {
  const { navItems, isOpen, close } = useNav();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/40" 
          onClick={close} />
          <aside className="relative w-64 h-full bg-white dark:bg-black border-r p-4">
            <button onClick={close} className="mb-4">Close</button>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={close} className="block hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </>
  );
}

