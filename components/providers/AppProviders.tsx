"use client";

import dynamic from "next/dynamic";
import ThemeProvider from "@/components/providers/ThemeProvider";
import MotionProvider from "@/components/providers/MotionProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import RouteScrollReset from "@/components/layout/RouteScrollReset";
import NavPrefetch from "@/components/layout/NavPrefetch";
import NavigationProgress from "@/components/layout/NavigationProgress";
import FormEndpointInit from "@/components/providers/FormEndpointInit";

const CompareShell = dynamic(() => import("@/components/compare/CompareShell"), {
  ssr: false,
});

const SplashScreen = dynamic(() => import("@/components/splash/SplashScreen"), {
  ssr: false,
});

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <SplashScreen />
        <SmoothScroll>
          <FormEndpointInit />
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
