import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { blogs } from "@/lib/blog";

const Blogs = () => {
  return (
    <div className="container md:pt-10">
      <div className="flex items-center justify-center py-6 md:py-10">
        <div className="flex flex-col gap-2 justify-center md:justify-start md:w-5/6">
          <h1>Ziba Pay Blogs</h1>
          <p className="text-[#0000008F]">
            Latest Insights, Tips, and News in the World of Payments
          </p>
          <p className="my-4 md:w-3/4">
            Welcome to the Ziba Pay Blog! Here, you&apos;ll find the latest insights, tips, and news about online payments, financial management, and how Ziba Pay is making a difference for businesses across Africa.
          </p>
          <Image src="/images/blogs1.png" alt="blog" width={1000} height={582}/>
        </div>
      </div>

      <h1 className="my-4">All Articles</h1>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-2 gap-8 items-center justify-center mx-auto">
          {blogs.map((blog) => (
            <Link href={`/blogs/${blog.slug}`} key={blog.id} legacyBehavior>
              <a className="flex flex-col gap-2 bg-white w-full md:w-[320px] lg:w-[400px] 2xl:w-[418px] md:h-[500px] shadow-sm rounded">
                <Image src={blog.image} alt={blog.title} className="w-full" />
                <div className="p-4">
                  <h3 className="my-2">{blog.title}</h3>
                  <p className="text-[#3498DB] text-[16px]">{blog.excerpt}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className="py-10 md:py-40">
        <h1 className="my-3">Subscribe to Our Newsletter</h1>
        <p className="mb-6">
          Don&apos;t miss out on the latest updates from Ziba Pay. Subscribe to our newsletter to receive our latest blog posts, news, and special offers directly in your inbox.
        </p>
        <Button className="p-6">
          Email <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Blogs;
