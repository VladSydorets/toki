import type { Metadata } from "next";
import "./globals.css";

import { Roboto, Montserrat, Nunito } from "next/font/google";

import { PageTransition } from "@/components/animations/PageTransition";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

import AuthProvider from "./(auth)/Provider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const nunito = Nunito({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Toki Issue Tracker",
  description: "Issue Tracker Application",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: { url: "/apple-touch-icon.png" },
  },
  appleWebApp: {
    title: "Toki",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${montserrat.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <body className={nunito.className}>
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            <div className="mx-auto max-w-screen-lg flex flex-col">
              <div className="flex-grow">
                <PageTransition>
                  {children}
                  <Toaster expand={true} richColors closeButton />
                </PageTransition>
              </div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
