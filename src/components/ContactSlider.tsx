"use client";

import React from "react";
import { Swiper as SwiperType, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

const reviews = [
   {
      text: "Ziba Pay's support team was incredibly helpful in guiding us through the setup process. Thanks to their assistance, our business is now smoothly processing payments online.",
      name: "Fatima Kamara, Owner of Kaya Boutique, ",
      location: "Nigeria",
   },
   {
      text: "I reached out to Ziba Pay's support team with a question about integrating their payment system with our e-commerce platform. They responded promptly and provided clear instructions that helped us get up and running in no time.",
      name: "David Ndlovu, Founder of Ndlovu Electronics, ",
      location: "Kenya",
   },
   {
      text: "The support team at Ziba Pay went above and beyond to address an issue we encountered with our account. Their dedication to resolving the problem quickly and efficiently was greatly appreciated.",
      name: " Aisha Diop, CEO of Diop Fashion House, ",
      location: "Kenya",
   },
   {
      text: "Ziba Pay's support team was amazing! They helped us customize our payment options to suit our business needs in Ghana.",
      name: "  Kwame Mensah, Owner of Mensah Mart, ",
      location: "Ghana",
   },
   {
      text: "I contacted Ziba Pay's support team for assistance with setting up our payment system for our online store in Rwanda. They were incredibly patient and provided step-by-step guidance that made the process easy.",
      name: "  Alice Mukamana, Founder of Mukamana Fashion,  ",
      location: "Rwanda",
   },
];

const Slider = () => {
   return (
      <section className="container mt-5 text-light">
         <SwiperType
            pagination={{ dynamicBullets: true, clickable: true }}
            modules={[Pagination]}
            breakpoints={{
               640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
               },
               768: {
                  slidesPerView: 1,
                  spaceBetween: 30,
               },
               1024: {
                  slidesPerView: 2,
                  spaceBetween: 40,
               },
            }}
            onSlideChange={(swiper) => {
               console.log("Slide changed to: ", swiper.activeIndex);
            }}
         >
            {reviews.map((review, index) => (
               <SwiperSlide
                  key={index}
                  className="py-10 pb-16"
               >
                  <div className="flex flex-col gap-4 w-full sm:w-5/6 md:w-[500px] hover:bg-main rounded-lg p-6 hover:text-white items-center  ">
                     <p className="flex gap-2">
                        <span>
                           <FaQuoteLeft className="text-black/50" />
                        </span>
                        {review.text}
                     </p>
                     <p className="text-center">{review.name}</p>
                     <p className="text-center">{review.location}</p>
                  </div>
               </SwiperSlide>
            ))}
         </SwiperType>
      </section>
   );
};

export default Slider;
