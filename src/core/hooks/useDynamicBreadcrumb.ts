/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n";
import type { LucideIcon } from "lucide-react";
import { useRoutes } from "@/core/hooks/useRoutes";

type BreadcrumbItem = {
  name: string;
  href: string;
  icon?: LucideIcon;
};

export const useDynamicBreadcrumb = () => {
  const pathname = usePathname();
  const { t } = useTranslation("core.hooks.useDynamicBreadcrumb");
  const { FLATTENED_ROUTES } = useRoutes();
  // Flatten all routes including subRoutes

  // Split pathname into segments
  const segments = (pathname || "").split("/").filter(Boolean);
  // console.log({ segments });
  if (segments.length === 0) {
    return [
      {
        name: t("Home"),
        href: "/",
        icon: FLATTENED_ROUTES["/"]?.icon,
      },
    ];
  }
  const breadcrumbItems: BreadcrumbItem[] = [];

  // Iterate through path segments and find the corresponding title & icon
  let pathSoFar = "";
  for (const segment of segments) {
    pathSoFar = pathSoFar ? `${pathSoFar}/${segment}` : `/${segment}`; // Build correct paths
    const route = FLATTENED_ROUTES[pathSoFar]; // Find route object

    if (route) {
      breadcrumbItems.push({
        name: route.title,
        href: pathSoFar,
        icon: route.icon,
      });
    } else {
      breadcrumbItems.push({
        name: segment,
        href: pathSoFar,
      });
    }
  }

  return breadcrumbItems;
};
