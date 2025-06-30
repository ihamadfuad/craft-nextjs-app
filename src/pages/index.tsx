"use client"

// This will be home page (/)

import '@/app/globals.css'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { localizationSets } from '@/app/localization'
import { useEffect, useState } from 'react'
import AccordionDemo from './accordion'
import { NavigationStack } from './main/navigation-stack'
import { Content, HSpacer, HStack, Spacer, StackContent, VSpacer, VStack, ZStack } from './main/stacks'

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

    <VStack className="bg-gray-200">

      <HStack alignment='center'>
        <HSpacer />
        <NavigationStack />
        <HSpacer />

        <StackContent>
          <Button
            variant="secondary"
            onClick={() => {
              const newLang = lang === 'en' ? 'ar' : 'en';
              setLang(newLang);
              // Simulate Accept-Language by storing in localStorage or triggering fetch
              localStorage.setItem('Accept-Language', newLang);
            }}
          >
            {localized.products.cart}
          </Button>
        </StackContent>
      </HStack>

      <VSpacer />

      <HStack spacingX='16' marginTop='10' alignment='center'>

        <StackContent padding='2'>
          <Button variant="secondary" onClick={() => router.push('/accordion')}>
            {localized.products.cart}
          </Button>
        </StackContent>

        <StackContent padding='2'>
          <Button variant="secondary" onClick={() => router.push('/accordion')}>
            {localized.products.cart}
          </Button>
        </StackContent>

        <StackContent padding='2'>
          <Button variant="secondary" onClick={() => router.push('/accordion')}>
            {localized.products.cart}
          </Button>
        </StackContent>

      </HStack>

      <VSpacer />

      <HStack alignment='left' >
        <HSpacer />
        <AccordionDemo />
        <HSpacer />
      </HStack>

    </VStack>
  )
}
