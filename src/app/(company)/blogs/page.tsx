import React from "react";
import Image from "next/image";
import blogs1 from "../../../../public/images/blogs1.png";
import blog1 from "../../../../public/images/blog1.png";
import { Button } from "@/components/ui/button";
import { FaArrowCircleRight, FaArrowRight } from "react-icons/fa";

const Blogs = () => {
   return (
      <div className="container ">
         <div className="flex flex-col gap-4  justify-center">
            <h1>Ziba pay Blogs</h1>
            <p>Latest Insights, Tips, and News in the World of Payments</p>
            <p>
               Welcome to the Ziba Pay Blog! Here, you&apos;ll find the latest
               insights, tips, and news about online payments, financial
               management, and how Ziba Pay is making a difference for
               businesses across Africa.
            </p>
            <Image
               src={blogs1}
               alt="blog"
               className="mx-auto my-6 w-3/4"
            />
         </div>

         <h1 className="my-4">All Articles</h1>
         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-2 gap-8 items-center justify-center mx-auto ">
            <div className="flex flex-col gap-2 bg-white w-5/6 sm:w-[300px] md:w-[320px] lg:w-[380px]  h-[450px] shadow-sm rounded ">
               <Image
                  src={blog1}
                  alt="blog1"
                  className="w-full"
               />
               <div className="p-4">
                  <h3 className="my-2">
                     The Future of Online Payments in Africa
                  </h3>
                  <p>
                     Discover the latest trends and innovations shaping the
                     future of online payments in Africa. Learn how Ziba Pay is
                     at the forefront of this exciting transformation
                  </p>
               </div>
            </div>
            <div className="flex flex-col gap-2 bg-white w-5/6 sm:w-[300px] md:w-[320px] lg:w-[380px]  h-[450px] shadow-sm rounded">
               <Image
                  src={blog1}
                  alt="blog1"
                  className="w-full"
               />
               <div className="p-4">
                  <h3 className="my-2">
                     The Future of Online Payments in Africa
                  </h3>
                  <p>
                     Discover the latest trends and innovations shaping the
                     future of online payments in Africa. Learn how Ziba Pay is
                     at the forefront of this exciting transformation
                  </p>
               </div>
            </div>
            <div className="flex flex-col gap-2 bg-white w-5/6 sm:w-[300px] md:w-[320px] lg:w-[380px]  h-[450px] shadow-sm rounded">
               <Image
                  src={blog1}
                  alt="blog1"
                  className="w-full"
               />
               <div className="p-4">
                  <h3 className="my-2">
                     The Future of Online Payments in Africa
                  </h3>
                  <p>
                     Discover the latest trends and innovations shaping the
                     future of online payments in Africa. Learn how Ziba Pay is
                     at the forefront of this exciting transformation
                  </p>
               </div>
            </div>
            <div className="flex flex-col gap-2 bg-white w-5/6 sm:w-[300px] md:w-[320px] lg:w-[380px]  h-[450px] shadow-sm rounded">
               <Image
                  src={blog1}
                  alt="blog1"
                  className="w-full"
               />
               <div className="p-4">
                  <h3 className="my-2">
                     The Future of Online Payments in Africa
                  </h3>
                  <p>
                     Discover the latest trends and innovations shaping the
                     future of online payments in Africa. Learn how Ziba Pay is
                     at the forefront of this exciting transformation
                  </p>
               </div>
            </div>
            <div className="flex flex-col gap-2 bg-white w-5/6 sm:w-[300px] md:w-[320px] lg:w-[380px]  h-[450px] shadow-sm rounded">
               <Image
                  src={blog1}
                  alt="blog1"
                  className="w-full"
               />
               <div className="p-4">
                  <h3 className="my-2">
                     The Future of Online Payments in Africa
                  </h3>
                  <p>
                     Discover the latest trends and innovations shaping the
                     future of online payments in Africa. Learn how Ziba Pay is
                     at the forefront of this exciting transformation
                  </p>
               </div>
            </div>
            <div className="flex flex-col gap-2 bg-white w-5/6 sm:w-[300px] md:w-[320px] lg:w-[380px]  h-[450px] shadow-sm rounded">
               <Image
                  src={blog1}
                  alt="blog1"
                  className="w-full"
               />
               <div className="p-4">
                  <h3 className="my-2">
                     The Future of Online Payments in Africa
                  </h3>
                  <p>
                     Discover the latest trends and innovations shaping the
                     future of online payments in Africa. Learn how Ziba Pay is
                     at the forefront of this exciting transformation
                  </p>
               </div>
            </div>
         </div>

         <div className="py-40">
            <h1 className="my-3">Subscribe to Our Newsletter</h1>
            <p className="mb-6">
               Don&apos;t miss out on the latest updates from Ziba Pay. Subscribe to
               our newsletter to receive our <br /> latest blog posts, news, and
               special offers directly in your inbox
            </p>
            <Button>
               Email <FaArrowRight className="ml-2" />
            </Button>
         </div>
      </div>
   );
};

export default Blogs;
