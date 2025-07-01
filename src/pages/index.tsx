"use client"

// This will be home page (/)

import '@/app/globals.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { localizationSets } from '@/app/localization'
import { useEffect, useState } from 'react'
import AccordionDemo from './accordion'
import { NavigationStack } from './main/navigation-stack'
import { VSpacer, HSpacer, VStack, HStack, ZStack, StackContent } from './main/stacks'
import { Separator } from "@/components/ui/separator"
import { ChartAreaDefault } from './design-system/charts'
import { Card } from '@/components/ui/card'

// div direction (dir="ltr") (dir="rtl") (ms: margin start) (me: margin end) (ps: padding start) (pe: padding end)
// child outer margin: mt-8 ml-8 mr-8 mb-8 (vertical margin: my-8) (horizontal margin: mx-8) 
// child inner padding: pt-8 pl-8 pr-8 pb-8 (vertical padding: py-8) (horizontal padding: px-8) 
// children spacing: space-x-8 space-y-8
// w-full w-8 w-1/2 (viewport: w-screen)

export default function Page({
  params,
}: {
  params: { lang: 'en' | 'ar' } | undefined
}) {
  const router = useRouter()
  const [lang, setLang] = useState<'en' | 'ar'>('en'); // default fallback
  const [localized, setLocalized] = useState<any>(null);

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

    <div className='flex flex-col m-12'>
      <div className='flex items-stretch mb=8'>

        <Button
          variant="ghost"
          onClick={() => {
          }}>
          <h4 className="scroll-m-20 text-4xl font-semibold tracking-tight">
            {localized.titles.overview}
          </h4>
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
          }}>
          <h4 className="scroll-m-20 text-3xl font-regular tracking-tight text-foreground-gray-50">
            {localized.titles.segmentation}
          </h4>
        </Button>
      </div>

      <Separator className='mt-4' />

      <div className='grid grid-cols-4'>

        <div className='m-8'>
          <ChartAreaDefault />
        </div>

        <div className='m-8'>
          <ChartAreaDefault />
        </div>

        <div className='m-8'>
          <ChartAreaDefault />
        </div>

        <div className='m-8'>
          <ChartAreaDefault />
        </div>

        <div className='m-8'>
          <ChartAreaDefault />
        </div>

        <div className='m-8'>
          <ChartAreaDefault />
        </div>

        <div className='m-8'>
          <ChartAreaDefault />
        </div>

        <div className='m-8'>
          <ChartAreaDefault />
        </div>

        <Card className="m-8 p-8">

          <Image src="/plus.circle.dashed.svg" alt="Add new audience" width={64} height={64} />

          <h3 className="scroll-m-20 text-3xl font-regular tracking-tight text-foreground-gray-50">
            Define
          </h3>
          <h4 className="scroll-m-20 text-3xl font-regular tracking-tight text-foreground-gray-50">
            New Audience
          </h4>
        </Card>
      </div>

      <div className='flex my-12 items-stretch bg-gray-100'>

        <Button
          variant="secondary"
          onClick={() => {
            const newLang = lang === 'en' ? 'ar' : 'en';
            setLang(newLang);
            // Simulate Accept-Language by storing in localStorage or triggering fetch
            localStorage.setItem('Accept-Language', newLang);
          }}>
          {localized.products.cart}
        </Button>

        <Button
          variant="secondary"
          className='w-20 ml-auto'>
          {localized.products.cart}
        </Button>

        <Button
          variant="secondary"
          className='w-20 ml-auto'>
          {localized.products.cart}
        </Button>

      </div>
    </div>

    // <VStack className="bg-gray-200">

    //   <HStack alignment='center'>
    //     <HSpacer />
    //     <NavigationStack />
    //     <HSpacer />


    //     <div className='mt-8 ml-8 mr-8 mb-8'>
    //     </div>

    //     {/* <StackContent className=''>
    //       <Button
    //         variant="secondary"
    //         onClick={() => {
    //           const newLang = lang === 'en' ? 'ar' : 'en';
    //           setLang(newLang);
    //           // Simulate Accept-Language by storing in localStorage or triggering fetch
    //           localStorage.setItem('Accept-Language', newLang);
    //         }}
    //       >
    //         {localized.products.cart}
    //       </Button>
    //     </StackContent> */}
    //   </HStack>

    //   <VSpacer />

    //   <HStack spacingX='16' marginTop='10' alignment='center'>

    //     <StackContent padding='2'>
    //       <Button variant="secondary" onClick={() => router.push('/accordion')}>
    //         {localized.products.cart}
    //       </Button>
    //     </StackContent>

    //     <StackContent padding='2'>
    //       <Button variant="secondary" onClick={() => router.push('/accordion')}>
    //         {localized.products.cart}
    //       </Button>
    //     </StackContent>

    //     <StackContent padding='2'>
    //       <Button variant="secondary" onClick={() => router.push('/accordion')}>
    //         {localized.products.cart}
    //       </Button>
    //     </StackContent>

    //   </HStack>

    //   <VSpacer />

    //   <HStack alignment='left' >
    //     <HSpacer />
    //     <AccordionDemo />
    //     <HSpacer />
    //   </HStack>

    // </VStack>
  )
}
