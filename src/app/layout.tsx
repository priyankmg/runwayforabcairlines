import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { OnboardingChat } from "@/components/chat/OnboardingChat";
import { getExpert, JORDAN_ID } from "@/data/mock/experts";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Runway | ABC Airlines Expert Onboarding",
  description: "From hired to cleared for takeoff — the expert journey, reimagined.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jordan = getExpert(JORDAN_ID);
  const stage = jordan?.stage ?? "TAXI";

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AppShell>{children}</AppShell>
        <OnboardingChat stage={stage} />
      </body>
    </html>
  );
}
