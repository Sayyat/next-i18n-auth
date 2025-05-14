/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n";
import { TLanguage } from "@/i18n";
import { languages, NAMESPACES } from "@/i18n";
import { cn } from "@/shared";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/ui/popover";
import { KZ, RU, US, type FlagComponent } from "country-flag-icons/react/3x2";
import { Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const localeFlags: Record<TLanguage, FlagComponent> = {
  kk: KZ,
  ru: RU,
  en: US,
};

export function LanguageSelect() {
  const { t, i18n } = useTranslation("shared.components.LanguageSelect");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState<TLanguage>(
    i18n.language as TLanguage,
  );
  const [isPreloading, setIsPreloading] = useState(true);

  const labeledLanguage: { label: string; value: TLanguage }[] = [
    { label: t("Kazakh"), value: "kk" },
    { label: t("Russian"), value: "ru" },
    { label: t("English"), value: "en" },
  ];

  useEffect(() => {
    // Прелоадим все переводы для всех языков один раз при инициализации
    const preloadAllLanguages = async () => {
      for (const locale of languages) {
        await Promise.allSettled(
          NAMESPACES.map(async (ns) => {
            try {
              const data = await import(`@/i18n/locales/${locale}/${ns}.json`);
              i18n.addResourceBundle(
                locale,
                ns,
                data.default ?? data,
                true,
                true,
              );
            } catch {}
          }),
        );
      }
      setIsPreloading(false);
    };

    preloadAllLanguages();
  }, [i18n]);

  const handleLocaleChange = (locale: TLanguage) => {
    startTransition(async () => {
      await i18n.changeLanguage(locale);
      setCurrentLocale(locale);
      router.refresh();
    });
  };

  const CurrentFlagIcon = localeFlags[currentLocale];

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
            key={currentLocale}
            variant="outline"
            size="icon"
            className="bg-background rounded-xl p-0 size-9"
          >
            {isPreloading || isPending ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : (
              <CurrentFlagIcon className="w-6 h-4 object-cover rounded-xl" />
            )}
            <span className="sr-only">{t("Language")}</span>
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
          {labeledLanguage.map((lang) => {
            const Flag = localeFlags[lang.value];
            const isActive = lang.value === currentLocale;

            return (
              <button
                key={lang.value}
                onClick={() => handleLocaleChange(lang.value)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-muted font-semibold"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Flag className="w-6 h-4 object-cover rounded-sm flex-shrink-0" />
                <span className="flex-1 truncate">{lang.label}</span>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-4 h-4 text-primary" />
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
