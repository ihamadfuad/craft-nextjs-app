// This will be home page (/)

import '@/app/globals.css'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"

export default function Page() {

  const router = useRouter()

  return <Button variant="secondary" onClick={() => router.push('/accordion')}>
      Dashboard
    </Button>
}