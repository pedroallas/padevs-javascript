"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loading } from "./loading";

export function NavigationLoading() {
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    window.addEventListener("beforeunload", handleStart);
    window.addEventListener("load", handleStop);

    return () => {
      window.removeEventListener("beforeunload", handleStart);
      window.removeEventListener("load", handleStop);
    };
  }, []);

  React.useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 w-full bg-gray-200 dark:bg-gray-700">
        <div className="h-full w-full bg-blue-500 dark:bg-blue-400 animate-[loading_1s_ease-in-out_infinite]" />
      </div>
      <div className="absolute top-4 right-4">
        <Loading size="sm" variant="primary" />
      </div>
    </div>
  );
}
