"use client";

import * as React from "react";
import {ThemeProvider as NextThemesProvider, useTheme} from "next-themes";
import {useEffect, useState} from "react";

export function ThemeProvider({children}: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{visibility: "hidden"}}/>;
    }

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
            themes={["dark", "light"]}
        >
            {children}
        </NextThemesProvider>
    );
}

