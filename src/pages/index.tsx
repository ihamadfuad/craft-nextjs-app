"use client"

// This will be home page (/)

import '@/app/globals.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { localizationSets } from '@/app/localization'
import { useEffect, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { ChartAreaDefault } from './design-system/charts'
import { Card } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Label } from 'recharts'
import { Input } from '@/components/ui/input'
import LoginPage from '@/pages/login/login-view'

export default function Page({
  params,
}: {
  params: { lang: 'en' | 'ar' } | undefined
}) {
  const router = useRouter()
  const [lang, setLang] = useState<'en' | 'ar'>('en'); // default fallback
  const [localized, setLocalized] = useState<any>(null);

  const [selection, setSelection] = useState<0 | 1>(0); // default fallback

  useEffect(() => {
    const fetchLang = async () => {
      const resolvedParams = await params;
      setLang(resolvedParams?.lang || 'en'); // default fallback
    };

    fetchLang();
  }, [params]);

  useEffect(() => {
    const fetchLocalization = async () => {
      const localization = await localizationSets[lang]();
      setLocalized(localization);
    };

    if (lang) {
      fetchLocalization();
    }
  }, [lang]);

  if (!localized) return null;

  return (

    <Dialog>
      <div className='flex flex-col m-12'>
        <div className='flex items-stretch mb=8'>

          <Button
            variant="ghost"
            onClick={() => setSelection(0)}>
            <h4 className={selection == 0 ? "scroll-m-20 text-4xl font-semibold tracking-tight text-black" : "scroll-m-20 text-3xl font-regular tracking-tight text-foreground-gray-50"}>
              {localized.titles.overview}
            </h4>
          </Button>

          <Button
            variant="ghost"
            onClick={() => setSelection(1)}>
            <h4 className={selection == 1 ? "scroll-m-20 text-4xl font-semibold tracking-tight text-black" : "scroll-m-20 text-3xl font-regular tracking-tight text-foreground-gray-50"}>
              {localized.titles.segmentation}
            </h4>
          </Button>

          <Button
            variant="secondary"
            className='ml-auto'
            onClick={() => {
              const newLang = lang === 'en' ? 'ar' : 'en';
              setLang(newLang);
              // Simulate Accept-Language by storing in localStorage or triggering fetch
              localStorage.setItem('Accept-Language', newLang);
            }}>
            {lang === 'en' ? 'العربية' : 'English'}
          </Button>
        </div>

        <Separator className='mt-4' />

        <div className={`${selection == 0 ? 'hidden' : ''}`}>
          <LoginPage />
        </div>

        <div className={`grid grid-cols-4 ${selection !== 0 ? 'hidden' : ''}`}>

          {[0, 1, 2, 3, 4].map((index) => (
            <div className='m-8'>
              <ChartAreaDefault />
            </div>
          ))}

          <DialogTrigger>
            <button
              type="button"
              // onClick={() => { setSelection(1) }}
              className="text-left"
            >
              <Card className="m-0 p-16">
                <Image src="/plus.circle.dashed.svg" alt="Add new audience" width={64} height={64} />
                <h3 className="scroll-m-20 text-3xl font-regular tracking-tight text-slate-400">
                  Define
                </h3>
                <h4 className="scroll-m-20 text-3xl font-regular tracking-tight text-slate-400">
                  New Audience
                </h4>
              </Card>
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label>Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>

        </div>
      </div>
    </Dialog>
  )
}
