/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";
import { SessionProvider } from "next-auth/react";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/core/providers/ThemeProvider";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@/i18n";

export function ClientProvidersWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      <ThemeProvider>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
