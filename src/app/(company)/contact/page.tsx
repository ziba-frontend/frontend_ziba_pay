import Image from "next/image";
import React from "react";
import contact1 from "../../../../public/images/contact1.png";
import {
   FaHeadset,
   FaMailBulk,
   FaMailchimp,
   FaPhone,
   FaQuoteLeft,
} from "react-icons/fa";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import Slider from "@/components/Slider";
import ContactSlider from "@/components/ContactSlider";

const Contact = () => {
   return (
      <div className="container py-10">
         <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="flex flex-col gap-8">
               <h1>We are here to assist you Get in touch with us today.</h1>
               <Image
                  src={contact1}
                  alt="contact ziba pay"
               />
            </div>
            <div className="flex items-center  justify-center flex-wrap gap-4">
               <div className="flex flex-col gap-2 w-[250px] border border-black/50 p-6 min-h-[200px] hover:bg-main hover:text-white transition-all hover:border-none">
                  <FaMailBulk className="text-main" />
                  <h3>Email</h3>
                  <p>Contact Ziba pay today using Zibapaysupport.com</p>
               </div>
               <div className="flex flex-col gap-2 w-[250px] border border-black/50 p-6 min-h-[200px] hover:bg-main hover:text-white transition-all hover:border-none">
                  <FaPhone className="text-main" />
                  <h3>Call Us</h3>
                  <p>You can call us here +234810005456</p>
               </div>
               <div className="flex flex-col gap-2 w-[250px] border border-black/50 p-6 min-h-[200px] hover:bg-main hover:text-white transition-all hover:border-none">
                  <FaHeadset className="text-main" />
                  <h3>Contact Sales</h3>
                  <p>
                     Connect with our sales team directly to discuss your needs
                  </p>
               </div>
            </div>
         </div>
         <ContactSlider />
      </div>
   );
};

export default Contact;
