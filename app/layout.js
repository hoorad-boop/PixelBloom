import { Sniglet, Playpen_Sans } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const sniglet = Sniglet({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-sniglet',
});

const playpenSans = Playpen_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-playpen',
});

export const metadata = {
  title: "PixleBloom Canvas",
  description: "A fun canvas editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sniglet.variable} ${playpenSans.variable}`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <ConvexClientProvider>
              {children}
              <Toaster />
            </ConvexClientProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
