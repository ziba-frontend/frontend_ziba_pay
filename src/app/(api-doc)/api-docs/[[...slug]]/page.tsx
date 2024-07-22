import { getPage, getPages } from "@/app/source";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function Page({
   params,
}: {
   params: { slug?: string[] };
}) {
   const page = getPage(params.slug);

   if (page == null) {
      notFound();
   }

   const MDX = page.data.exports.default;

   return (
      <DocsPage
         breadcrumb={{ enabled: false }}
         footer={{ enabled: false }}
      >
         <DocsBody className=" md:w-[68vw] ">
            <h1>{page.data.title}</h1>
            <MDX />
         </DocsBody>
      </DocsPage>
   );
}

export async function generateStaticParams() {
   return getPages().map((page) => ({
      slug: page.slugs,
   }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
   const page = getPage(params.slug);

   if (page == null) notFound();

   return {
      title: page.data.title,
      description: page.data.description,
   } satisfies Metadata;
}
