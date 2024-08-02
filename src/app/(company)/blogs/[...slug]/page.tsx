import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { getAllBlogs, getBlogBySlug } from "@/lib/api-calls/blog";

interface BlogPostProps {
  params: { slug: string[] };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const slug = params.slug.join("/");
  let blog;

  try {
    blog = await getBlogBySlug(slug);
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    notFound();
    return;
  }

  if (!blog) {
    console.error(`Blog with slug ${slug} not found`);
    notFound();
    return;
  }

  return (
    <div className="container mx-auto md:pt-10">
      <div className="flex flex-col gap-6 items-center justify-center py-6">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-center md:w-5/6 lg:w-[60%]">{blog.excerpt}</p>
        <Image
          src={blog.image}
          alt={blog.title}
          width={991}
          height={500}
          className="my-6 rounded-[15px]"
        />
      </div>

      <div className="pt-10 prose max-w-none text-black container mx-auto">
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="w-full"
        />
      </div>

      <div className="py-4 md:py-20 md:w-5/6">
        <h1 className="text-2xl font-semibold my-3">
          Subscribe to Our Newsletter
        </h1>
        <p className="mb-6">
          Don&apos;t miss out on the latest updates from Ziba Pay. Subscribe to
          our newsletter to receive our latest blog posts, news, and special
          offers directly in your inbox.
        </p>
        <Button>
          Email <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog: { slug: any }) => ({
    slug: [blog.slug],
  }));
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/");
  const blogs = await getAllBlogs();
  const blog = blogs.find((blog: { slug: string }) => blog.slug === slug);

  if (!blog) {
    notFound();
  }

  return {
    title: blog.title,
    description: blog.excerpt,
  };
}
