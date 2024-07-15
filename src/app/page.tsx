"use client";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export default async function Home() {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <motion.main
      className="container flex h-screen max-w-[64rem] flex-col items-center justify-center gap-4 text-center"
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.35 } },
      }}
    >
      <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
        <Link
          href={siteConfig.links.twitter}
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          target="_blank"
        >
          Follow along on LinkedIn
        </Link>
      </motion.div>
      <motion.h1
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="font-heading text-xl sm:text-5xl md:text-6xl lg:text-7xl"
      >
        UPLIFT.
      </motion.h1>
      <motion.p
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
      >
        All-in-one project and cost management platform, built for freelancers
        who prioritize financial success.
      </motion.p>
      <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="space-x-4">
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
      </motion.div>
    </motion.main>
  );
}
