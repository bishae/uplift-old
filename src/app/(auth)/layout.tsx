import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { UserNav } from "../_components/user-nav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Uplift",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkLoaded>
      <main>
        <header>
          {/* <ThemeToggle />
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn> */}
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              {/* <TeamSwitcher /> */}
              {/* <MainNav className="mx-6" /> */}
              <Link href="/" className="text-lg font-bold">
                UPLIFT
              </Link>
              <div className="ml-auto flex items-center space-x-4">
                {/* <Search /> */}
                <UserNav />
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </ClerkLoaded>
  );
}
