"use client"

// This will be home page (/)

import '@/app/globals.css'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { useLocalization } from "@/context/LocalizationContext";
import { Fragment, useEffect, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { ChartAreaDefault } from './design-system/charts'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import LoginPage from '@/pages/login/login-view'
import DialogCloseButton from '@/components/dialog-context-menu'
import DefineNewAudience from '@/components/define-new-audience'

const tabs = [
  { key: 0, label: (loc: any) => loc.titles.overview },
  { key: 1, label: (loc: any) => loc.titles.segmentation },
];

export default function Page() {
  const router = useRouter()
  const { lang, setLang, localized } = useLocalization();
  if (!localized) return null;

  const [selection, setSelection] = useState<0 | 1>(0);

  return (

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
                  ? "scroll-m-20 text-4xl font-semibold tracking-tight text-black"
                  : "scroll-m-20 text-3xl font-regular tracking-tight text-foreground-gray-50"
              }
            >
              {tab.label(localized)}
            </h4>
          </Button>
        ))}

        <DialogCloseButton />

        <Button
          variant="secondary"
          className='ml-auto'
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

function MainTabView({ selection }: { selection: 0 | 1 }) {
  if (selection === 0) {
    return (
      <div className="grid grid-cols-4">
        {[0, 1, 2, 3, 4].map(index => (
          <div className='m-8' key={index}>
            <ChartAreaDefault />
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