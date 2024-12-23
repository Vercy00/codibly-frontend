"use client";

import Image from "next/image";
import Link from "next/link";
import { Switch } from "./ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

function Navbar() {
  const [theme, switchTheme] = useTheme();

  return (
    <header className="py-4 w-full border-b flex justify-center px-8">
      <div className="max-w-[1536px] w-full">
        <div className="flex justify-between w-full items-center">
          <nav>
            <Link href="/">
              <div className="flex items-center gap-1">
                <Image
                  className="invert dark:invert-0"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                <span className="font-semibold">Weather App</span>
              </div>
            </Link>
          </nav>
          <Switch checked={theme === "dark"} onClick={switchTheme}>
            <div className="w-full h-full flex items-center justify-center">
              {theme === "dark" ? (
                <Moon className="size-3" />
              ) : (
                <Sun className="size-3" />
              )}
            </div>
          </Switch>
        </div>
      </div>
    </header>
  );
}

export { Navbar };
