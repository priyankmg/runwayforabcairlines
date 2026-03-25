"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Plane,
  Target,
  Phone,
  Award,
  Users,
  UserCog,
  BarChart3,
} from "lucide-react";

const expertLinks = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/runway", label: "Runway", icon: Plane },
  { href: "/missions", label: "Missions", icon: Target },
  { href: "/contacts", label: "Contacts", icon: Phone },
  { href: "/badges", label: "Badges", icon: Award },
  { href: "/cohort", label: "Cohort", icon: Users },
];

const managerLinks = [
  { href: "/manager", label: "Manager", icon: UserCog },
  { href: "/admin/metrics", label: "Metrics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const isManagerArea = pathname.startsWith("/manager") || pathname.startsWith("/admin");

  const linkCls = (href: string) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
      active
        ? "bg-[#0F2B5B] text-amber-400"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-white/10 bg-[#0B1426]">
      <div className="border-b border-white/10 p-4">
        <div className="font-semibold tracking-tight text-white">Runway</div>
        <div className="text-xs text-slate-400">ABC Airlines Experts</div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Expert</div>
        {expertLinks.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={linkCls(href)}>
            <Icon className="h-4 w-4 shrink-0 text-sky-400" />
            {label}
          </Link>
        ))}
        <div className="mb-2 mt-6 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Leadership</div>
        {managerLinks.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={linkCls(href)}>
            <Icon className="h-4 w-4 shrink-0 text-amber-400" />
            {label}
          </Link>
        ))}
      </nav>
      {isManagerArea && (
        <div className="border-t border-amber-500/30 p-3 text-xs text-amber-200/90">Manager view</div>
      )}
    </aside>
  );
}
