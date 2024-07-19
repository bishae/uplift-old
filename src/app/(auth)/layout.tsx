import "@/styles/globals.css";

import { ClerkLoaded } from "@clerk/nextjs";
import { UserNav } from "../_components/user-nav";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkLoaded>
      <header>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            {/* <MainNav className="mx-6" /> */}
            <Link href="/" className="text-lg font-bold">
              UPLIFT
            </Link>
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </div>
      </header>

      {children}
    </ClerkLoaded>
  );
}
