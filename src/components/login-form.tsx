import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useTransition } from "react"
import { useSession } from "@/context/SessionStorageContext"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [pending, startTransition] = useTransition()
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const { setItem, getItem } = useSession()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    // optional: client-side validation
    if (!email || !password) {
      setErrors({ email: !email ? "Required" : undefined, password: !password ? "Required" : undefined })
      return
    }

    startTransition(async () => {
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   body: JSON.stringify({ email, password }),
      //   headers: { "Content-Type": "application/json" }
      // })

      setItem("token", email)

      if (getItem("token")) {
        window.location.href = "/console" // ✅ redirect after success
      } else {
        setErrors({ email: " ", password: "Invalid credentials" })
      }
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Start using the app by logging in first
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <CardDescription>
                  {errors?.email && <p>{errors.email}</p>}
                </CardDescription>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" name="password" type="password" required />
                </div>

                <CardDescription>
                  {errors?.password && (
                    <div>
                      <p>Password must:</p>
                      <ul>
                        <li>- Be correct 😄</li>
                        <li>- Not empty</li>
                      </ul>
                      <p className="text-red-500 mt-1">{errors.password}</p>
                    </div>
                  )}
                </CardDescription>

                <Button disabled={pending} type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
