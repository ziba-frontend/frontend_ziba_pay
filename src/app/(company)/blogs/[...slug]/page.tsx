import { notFound } from "next/navigation";
import Image from "next/image";
import { blogs } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

interface BlogPostProps {
   params: { slug: string[] };
}

export default function BlogPost({ params }: BlogPostProps) {
   const slug = params.slug.join("/");
   const blog = blogs.find((blog) => blog.slug === slug);

   if (!blog) {
      notFound();
   }

   return (
      <div className="container pt-10">
         <div className="flex flex-col gap-6 items-center justify-center py-6">
            {" "}
            <h1>{blog.title}</h1>
            <p className="text-center md:5/6 lg:w-[60%]">{blog.excerpt}</p>
            <Image
               src={blog.image}
               alt={blog.title}
               width={991}
               className="my-6 rounded-[15px]"
            />
         </div>

         <div className=" pt-10 flex flex-col gap-6">
            <p>
               Online payments are poised to revolutionize the financial
               landscape in Africa, offering unprecedented opportunities for
               businesses and individuals alike. As technology advances and
               internet penetration increases across the continent, the future
               of online payments in Africa looks incredibly promising. Here’s
               an in-depth look at what users can expect:
            </p>
            <p>1. Widespread Adoption of Digital Wallets and Mobile Payments</p>
            <p>
               The use of digital wallets and mobile payment solutions is
               rapidly growing in Africa. With the increasing availability of
               smartphones and mobile networks, more people are gaining access
               to these convenient and secure payment methods.
            </p>
            <p>Increased Accessibility:</p>
            <ul className="flex flex-col gap-6 list-disc list-outside ">
               <li>
                  Digital wallets and mobile payment platforms are accessible to
                  a broader population, including those in remote areas without
                  traditional banking infrastructure. This inclusivity ensures
                  that more people can participate in the digital economy.
               </li>
            </ul>
            <p>Convenient Transactions:</p>
            <ul className="flex flex-col gap-6 list-disc list-outside ">
               <li>
                  Users can make payments, transfer money, and manage their
                  finances directly from their mobile devices, eliminating the
                  need for cash transactions. This convenience is particularly
                  beneficial for small businesses and individuals in rural
                  areas.
               </li>
            </ul>
            <p>Enhanced Security:</p>
            <ul className="flex flex-col gap-6 list-disc list-outside ">
               <li>
                  Digital wallets and mobile payment solutions offer robust
                  security features, such as biometric authentication and
                  encryption, providing users with peace of mind and protecting
                  their financial information.
               </li>
            </ul>

            <p>2. Expansion of E-Commerce and Online Marketplaces</p>

            <p>
               The e-commerce sector in Africa is experiencing exponential
               growth, driven by increasing internet access and consumer demand
               for online shopping.
            </p>

            <ul className="flex flex-col gap-6 list-disc list-outside ">
               <li>Seamless Shopping Experience:</li>
               <ul className="flex flex-col gap-6 list-disc list-outside ">
                  <li>
                     Online payment solutions enable a smooth and hassle-free
                     shopping experience, allowing users to purchase goods and
                     services from the comfort of their homes. This convenience
                     is a significant driver of e-commerce growth.
                  </li>
               </ul>
            </ul>
            <p>Conclusion</p>
            <p>
               The future of online payments in Africa is bright, with immense
               potential to transform the financial landscape and drive economic
               growth. As digital wallets, mobile payments, e-commerce, and
               fintech innovations continue to evolve, more people will gain
               access to financial services, fostering greater financial
               inclusion and prosperity. Ziba Pay is at the forefront of this
               revolution, committed to providing secure, convenient, and
               innovative payment solutions that empower businesses and
               individuals across the continent.
            </p>
         </div>


         <div className="py-40">
        <h1 className="my-3">Subscribe to Our Newsletter</h1>
        <p className="mb-6">
          Don&apos;t miss out on the latest updates from Ziba Pay. Subscribe to our newsletter to receive our latest blog posts, news, and special offers directly in your inbox.
        </p>
        <Button>
          Email <FaArrowRight className="ml-2" />
        </Button>
      </div>
      </div>
   );
}

export async function generateStaticParams() {
   return blogs.map((blog) => ({
      slug: [blog.slug], // Use an array to match catch-all routes
   }));
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
   const slug = params.slug.join("/");
   const blog = blogs.find((blog) => blog.slug === slug);

   if (!blog) {
      notFound();
   }

   return {
      title: blog.title,
      description: blog.excerpt,
   };
}
