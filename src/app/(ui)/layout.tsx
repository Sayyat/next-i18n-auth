/*
 * Copyright (c) 2025. Sayat Raykul
 */

import React from "react";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/core/components/AppSidebar";
import { Header } from "@/core/components/Header";
import { Footer } from "@/core/components/Footer";

export default async function UILayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="h-full bg-sidebar">
      <AppSidebar />
      <div className="relative flex w-full flex-1 flex-col mx-4 pt-2">
        <Header />

        <SidebarInset className="h-full rounded-xl overflow-auto border-b-none">
          {children}
        </SidebarInset>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
