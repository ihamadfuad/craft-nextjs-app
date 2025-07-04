import { SignupFormSchema, FormState, SigninFormSchema } from "@/lib/form-validation";
import { redirect, RedirectType } from "next/navigation";
//import { createSession, deleteSession } from "@/lib/session";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it

  await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" }
  });

  // 5. Redirect user
  redirect("/console", RedirectType.replace);
}

export async function signin(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;

  // e.g. Hash the user's password before storing it

  await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" }
  });

  // 5. Redirect user
  // ✅ Return redirect as a response
  return redirect("/console");
}

export async function logout() {
  //await deleteSession(null);
  redirect("/authentication/login");
}
