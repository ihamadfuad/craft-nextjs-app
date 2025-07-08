"use client"

// This will be home page (/)

import '@/app/globals.css'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { useLocalization } from "@/context/LocalizationContext";
import { Fragment, useEffect, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { ChartArea } from './design-system/charts'
import { Dialog } from '@radix-ui/react-dialog'
import LoginPage from '@/pages/authentication/login'
import DialogCloseButton from '@/components/dialog-context-menu'
import DefineNewAudience from '@/components/define-new-audience'
import { ThemeMode } from '@/components/theme-mode';
import { parseAsInteger, useQueryState } from "nuqs";
import { Metadata } from 'next';

const tabs = [
  { key: 0, label: (loc: any) => loc.titles.primary },
  { key: 1, label: (loc: any) => loc.titles.secondary },
];

export const metadata: Metadata = {
  title: 'Console',
  description: 'A console dashboard for demo.',
  keywords: ["react", "client components"]
};

export default function Console() {
  const router = useRouter()
  const { lang, setLang, localized } = useLocalization();
  if (!localized) return null;

  const [selection, setSelection] = useState<0 | 1>(0);
  const [hello, setHello] = useQueryState("hello", { defaultValue: "" });
  const [count, setCount] = useQueryState(
    "count",
    parseAsInteger.withDefault(0),
  );

  return (

    // Example of state manager for query
    // <>
    //   <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
    //   <input
    //     value={hello}
    //     placeholder="Enter your name"
    //     onChange={(e) => setHello(e.target.value || null)}
    //   />
    //   <p>Hello, {hello || "anonymous visitor"}!</p>
    // </>
    
    <Dialog>
      <div
        className="flex flex-col m-12"
        dir={lang === 'en' ? 'ltr' : 'rtl'}
      >
        <NavigationBarView
          selection={selection}
          setSelection={setSelection}
          localized={localized}
          lang={lang}
          setLang={setLang}
        />
        <MainTabView selection={selection} />
      </div>
    </Dialog>
  )
}

function NavigationBarView({
  selection,
  setSelection,
  localized,
  lang,
  setLang,
}: {
  selection: 0 | 1;
  setSelection: (key: 0 | 1) => void;
  localized: any;
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
}) {
  return (
    <Fragment>
      <div className='flex items-stretch mb=8'>
        {tabs.map(tab => (
          <Button
            key={tab.key}
            variant="ghost"
            onClick={() => setSelection(tab.key as 0 | 1)}
          >
            <h4
              className={
                selection === tab.key
                  ? "scroll-m-20 text-4xl font-semibold tracking-tight text--color-foreground"
                  : "scroll-m-20 text-3xl font-regular tracking-tight text-foreground-gray-50"
              }
            >
              {tab.label(localized)}
            </h4>
          </Button>
        ))}

        <DialogCloseButton />

        <div className='ms-auto me-2'>
          <ThemeMode />
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            const newLang = lang === 'en' ? 'ar' : 'en';
            setLang(newLang);
            localStorage.setItem('Accept-Language', newLang);
          }}
        >
          {lang === 'en' ? 'العربية' : 'English'}
        </Button>
      </div>

      <Separator className='mt-4' />
    </Fragment>
  )
}

// grid - cols - 1(default, mobile)
// sm: grid - cols - 2(≥640px)
// md: grid - cols - 3(≥768px)
// lg: grid - cols - 4(≥1024px)
// xl: grid - cols - 5(≥1280px)
// 2xl: grid - cols - 6(≥1536px)

function MainTabView({ selection }: { selection: 0 | 1 }) {

  if (selection === 0) {

    const { localized } = useLocalization();
    if (!localized) return null;

    const data = [
      { month: "January", desktop: 18 },
      { month: "February", desktop: 35 },
      { month: "March", desktop: 23 },
      { month: "April", desktop: 33 },
      { month: "May", desktop: 29 },
      { month: "June", desktop: 24 },
    ]

    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {[0, 1, 2, 3, 4].map(index => (
          <div className='m-8' key={index}>
            <ChartArea
              config={{
                desktop: {
                  label: "Desktop",
                  color: "var(--chart-3)",
                },
              }}
              data={data}
              title={localized.charts.title}
              subtitle={localized.charts.subtitle}
              footnote={localized.charts.footnote}
              description="January - June 2024" />
          </div>
        ))}
        <div className='m-8'>
          <DefineNewAudience />
        </div>
      </div>
    );
  }

  return <LoginPage />;
}