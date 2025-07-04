// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createSession } from "@/lib/session"; // your server-only logic

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body

  // TODO: validate credentials (dummy logic for now)
  if (email === "admin@example.com" && password === "securepassword") {
    await createSession({ res }, email); // store session cookie
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}