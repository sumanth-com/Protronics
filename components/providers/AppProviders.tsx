"use client";

import dynamic from "next/dynamic";
import ThemeProvider from "@/components/providers/ThemeProvider";
import MotionProvider from "@/components/providers/MotionProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import RouteScrollReset from "@/components/layout/RouteScrollReset";
import NavPrefetch from "@/components/layout/NavPrefetch";
import NavigationProgress from "@/components/layout/NavigationProgress";

const CompareShell = dynamic(() => import("@/components/compare/CompareShell"), {
  ssr: false,
});

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <SmoothScroll>
          <NavigationProgress />
          <RouteScrollReset />
          <NavPrefetch />
          {children}
          <CompareShell />
        </SmoothScroll>
      </MotionProvider>
    </ThemeProvider>
  );
}
