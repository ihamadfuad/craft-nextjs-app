import React, { createContext, useContext, useEffect, useState } from "react";
import { localizationSets } from "@/lib/localization";

type Lang = 'en' | 'ar';

interface LocalizationContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    localized: any;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider = ({ children, initialLang = 'en' }: { children: React.ReactNode, initialLang?: Lang }) => {
    const [lang, setLang] = useState<Lang>(initialLang);
    const [localized, setLocalized] = useState<any>(null);

    useEffect(() => {
        localizationSets[lang]().then(setLocalized);
    }, [lang]);

    return (
        <LocalizationContext.Provider value={{ lang, setLang, localized }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (!context) throw new Error("useLocalization must be used within a LocalizationProvider");
    return context;
};