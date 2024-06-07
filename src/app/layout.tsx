import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Ziba Pay",
   description: "A payment gateway",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='en'>
         <body className={cn("min-h-screen w-full   ", inter.className)}>
            {children}
         </body>
      </html>
   );
}
