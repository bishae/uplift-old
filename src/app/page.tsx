import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="container flex h-screen max-w-[64rem] flex-col items-center justify-center gap-4 text-center">
      <Link
        href={siteConfig.links.twitter}
        className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
        target="_blank"
      >
        Follow along on LinkedIn
      </Link>
      <h1 className="font-heading text-xl sm:text-5xl md:text-6xl lg:text-7xl">
        Take Control with UPLIFT.
      </h1>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        All-in-one project and cost management platform, built for freelancers
        who prioritize financial success.
      </p>
      <div className="space-x-4">
        <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
          Get Started
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          GitHub
        </Link>
      </div>
    </main>
  );
}
