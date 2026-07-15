import Link from "next/link";
import type { ReactNode } from "react";

type SidebarItem = {
  href: string;
  label: string;
};

type SidebarShellProps = {
  items: SidebarItem[];
  children: ReactNode;
};

export function SidebarShell({ items, children }: SidebarShellProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "100vh" }}>
      <aside>
        <nav aria-label="Sidebar navigation">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
