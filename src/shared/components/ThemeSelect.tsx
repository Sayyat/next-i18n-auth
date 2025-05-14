/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import * as React from "react";
import { Laptop, Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/ui/popover";
import { useTranslation } from "@/i18n";
import { motion } from "framer-motion";
import { cn } from "@/shared";
import { JSX } from "react"; // твоя утилита cn

type TThemeItem = {
  value: string;
  label: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export function ThemeSelect() {
  const { setTheme, theme } = useTheme();
  const { t } = useTranslation("shared.components.ThemeSelect");

  const themeOptions: TThemeItem[] = [
    {
      value: "light",
      label: t("Light"),
      icon: (props) => <Sun {...props} />,
    },
    {
      value: "dark",
      label: t("Dark"),
      icon: (props) => <Moon {...props} />,
    },
    {
      value: "system",
      label: t("System"),
      icon: (props) => <Laptop {...props} />,
    },
  ];

  const CurrentIcon =
    themeOptions.find((option) => option.value === theme)?.icon || Laptop;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-xl"
        >
          <Button
            key={theme}
            variant="outline"
            size="icon"
            className="bg-background rounded-xl p-0 size-9"
          >
            <CurrentIcon className="size-4 text-foreground" />
            <span className="sr-only">{t("Theme")}</span>
          </Button>
        </motion.div>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        className="w-48 p-2 bg-popover shadow-lg rounded-xl"
        asChild
      >
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex flex-col gap-1"
        >
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = theme === option.value;

            return (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-muted font-semibold"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0 text-foreground" />
                <span className="flex-1 truncate">{option.label}</span>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
