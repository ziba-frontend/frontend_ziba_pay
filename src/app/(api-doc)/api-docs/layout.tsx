import { pageTree } from "@/app/source";
import { DocsLayout } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider";
import "fumadocs-ui/style.css";
import DocsNavbar from "@/components/DocsNavbar";

export default function RootDocsLayout({ children }: { children: ReactNode }) {
   return (
      <RootProvider>
         <DocsNavbar />
         <DocsLayout
            tree={pageTree}
            nav={{ enabled: false }}
         >
            {children}
         </DocsLayout>
      </RootProvider>
   );
}
