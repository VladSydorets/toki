import type { Metadata } from "next";
import "./globals.css";
import { Inter, Roboto, Open_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthProvider from "./(auth)/Provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
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
      className={`${inter.variable} ${roboto.variable} ${openSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AuthProvider>
          <ThemeProvider>
            <div className="mx-auto max-w-screen-lg h-screen flex flex-col">
              <Navbar />
              <div className="flex-grow">{children}</div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
