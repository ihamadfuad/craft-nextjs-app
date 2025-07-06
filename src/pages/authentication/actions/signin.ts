import { FormState, SigninFormSchema } from "@/lib/form-validation";
import { redirect } from "next/navigation";

export async function signin(state: FormState, formData: FormData) {

  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const { email, password } = validatedFields.data;

  await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" }
  });

  // ✅ Return redirect as a response succeed
  return redirect("/console");
}
