/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import React from "react";
import { ChevronRight } from "lucide-react";
import { useDynamicBreadcrumb } from "@/core/hooks/useDynamicBreadcrumb";

export function DynamicBreadcrumb() {
  const breadcrumbItems = useDynamicBreadcrumb();
  // console.log({ breadcrumbItems });
  return (
    <Breadcrumb className="p-2">
      <BreadcrumbList>
        {breadcrumbItems?.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2">
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator className="flex items-end justify-center h-full">
                <div className="flex items-end justify-center h-full">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
