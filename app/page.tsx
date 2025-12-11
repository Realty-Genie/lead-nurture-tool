'use client'
import { RedirectToSignIn } from "@clerk/nextjs";

export default function Home() {
  // If the user is not signed in, Clerk will redirect to the sign‑in page.
  // After a successful sign‑in Clerk will forward the user to `/onboarding`.
  return <RedirectToSignIn redirectUrl="/onboarding" />;
}
