import type { MDXComponents } from "mdx/types";
// Assume you're using Fumadocs UI
import defaultComponents from "fumadocs-ui/mdx";
import Endpoint from "@/components/Endpoint";
import BEndpoint from "@/components/BEndpoint";
import Response from "@/components/Response";

import DocCards from "@/components/DocCards";
import DocCard from "@/components/DocCard";
import Reschema from "@/components/Reschema";
import Image from "next/image";

import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import DocsReview from "@/components/DocsReview";
import DocsFooter from "@/components/DocsFooter";

export function useMDXComponents(components: MDXComponents): MDXComponents {
   return {
      ...defaultComponents,
      DocCard,
      DocCards,
      Endpoint,
      Response,
      BEndpoint,
      Reschema,
      DocsReview,
      DocsFooter,
      Tab,
      Tabs,
      Image,
      ...components,
   };
}
