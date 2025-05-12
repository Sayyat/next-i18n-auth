/*
 * Copyright (c) 2025. Sayat Raykul
 */

import type { LucideIcon } from "lucide-react";

export interface IBaseRoute {
  title: string; // Ключ для перевода (гарантированно правильный)
  url: string; // Абсолютный путь
  icon?: LucideIcon; // Иконка маршрута
}

export interface IAppRoute extends IBaseRoute {
  subRoutes?: IBaseRoute[]; // ✅ Можно вложить подмаршруты
}
