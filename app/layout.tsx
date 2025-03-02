import type { Metadata } from "next";
import "./globals.css";
import { Inter, Roboto, Open_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  title: "Create Next App",
  description: "Generated by create next app",
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
        <ThemeProvider>
          <div className="mx-auto max-w-screen-lg h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
