import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { GeolocationProvider } from "@/hooks/use-geolocation";
import { Footer } from "@/components/footer";
import { Summary } from "@/components/summary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description:
    "Sprawdź prognozę pogody na najbliższe 7 dni oraz przewidywaną ilość energii, którą wygenerują panele słoneczne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <GeolocationProvider>
        <html lang="en" className="dark">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar />

            <main className="py-3 flex flex-col justify-center items-center">
              <div className="w-full px-8 flex justify-center">
                <div className="w-full max-w-[1536px]">{children}</div>
              </div>
            </main>

            <Footer>
              <section className="w-full">
                <h2 className="mb-2">Podsumowanie tygodnia</h2>
                <Summary />
              </section>
            </Footer>

            <Toaster />
          </body>
        </html>
      </GeolocationProvider>
    </ThemeProvider>
  );
}
