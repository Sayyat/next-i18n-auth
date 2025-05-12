/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/shared/components/ui/sidebar";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useProfile } from "@/features/authentication";
import { RenderRouteGroup } from "./RenderSidebarGroup";
import { useRoutes } from "@/core/hooks/useRoutes"; // Импортируем отдельные функции

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const { data: profile } = useProfile();
  const { COMMON_ROUTES, MANAGER_ROUTES } = useRoutes();

  return (
    <Sidebar variant="inset" {...props}>
      {/* Header с логотипом */}
      <SidebarHeader className="h-18 flex-row p-0 items-center">
        <Image
          src="/assets/logo-transparent.png"
          alt="logo"
          width={64}
          height={64}
        />
        <span className="text-xl font-bold">Next i18n Auth</span>
      </SidebarHeader>

      <SidebarContent className="gap-2">
        <RenderRouteGroup routes={COMMON_ROUTES} />
        {session && profile?.is_superuser && (
          <RenderRouteGroup routes={MANAGER_ROUTES} />
        )}
      </SidebarContent>
    </Sidebar>
  );
}
