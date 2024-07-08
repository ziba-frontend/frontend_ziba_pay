import { pageTree } from "@/app/source";
import { DocsLayout } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider";
import "fumadocs-ui/style.css";
import 'fumadocs-ui/twoslash.css';
import DocsNavbar from "@/components/DocsNavbar";

export default function RootDocsLayout({ children }: { children: ReactNode }) {
   return (
      <RootProvider
         theme={{
            enabled: false,
         }}
      >
         <DocsNavbar />
         <div className="pt-[90px]">
            <DocsLayout
               tree={pageTree}
               nav={{ enabled: false }}
            >
               {children}
            </DocsLayout>
         </div>
      </RootProvider>
   );
}
