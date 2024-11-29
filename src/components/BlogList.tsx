"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/lib/blog";
import { toast } from "react-hot-toast";
import { useGetAllBlogs } from "@/hooks/useBlog";

interface BlogListProps {
   blogs: Blog[];
}

export const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
   return (
      <div className="flex items-center justify-center">
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-2 gap-8 items-center justify-center mx-auto">
            {blogs.map((blog) => (
               <Link
                  href={`/blogs/${blog.slug}`}
                  key={blog.id}
                  legacyBehavior
               >
                  <a className="flex flex-col gap-2 bg-white w-full md:w-[320px] lg:w-[400px] 2xl:w-[418px] md:h-[500px] shadow-sm rounded">
                     <Image
                        src={blog.image}
                        alt={blog.title}
                        width={320}
                        height={180}
                        className="w-full"
                     />
                     <div className="p-4">
                        <h3 className="my-2">{blog.title}</h3>
                        <p className="text-[#3498DB] text-[16px]">
                           {blog.description}
                        </p>
                     </div>
                  </a>
               </Link>
            ))}
         </div>
      </div>
   );
};

const BlogListWrapper: React.FC = () => {
   const { data: blogs, isLoading, isError, error } = useGetAllBlogs();

   if (isLoading) {
      return <div>Loading blogs...</div>;
   }

   if (isError) {
      toast.error(`Failed to fetch blogs: ${error?.message}`);
      return <div className="text-red-500">Failed to load blogs.</div>;
   }

   return <BlogList blogs={blogs || []} />;
};

export default BlogListWrapper;
