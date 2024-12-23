import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
}

function Footer({ children }: FooterProps) {
  return (
    <footer className="mt-3 grid gap-3 w-full">
      <div className="flex justify-center w-full px-8">
        <div className="flex w-full max-w-[1536px] justify-between items-center">
          {children}
        </div>
      </div>

      <div className="border-t px-8 py-3 w-full flex justify-center">
        <div className="flex w-full max-w-[1536px] justify-between items-center">
          <span className="w-full max-w-[1536px]">
            Created by David Czarnecki
          </span>
          <Link
            href="https://github.com/Vercy00/codibly-frontend"
            target="_blank"
          >
            <Image
              src="/github-mark.png"
              alt="Github logomark"
              width={20}
              height={20}
              className="dark:invert"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
