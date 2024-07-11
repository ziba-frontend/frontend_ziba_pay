"use client";

import React from "react";
import { Swiper as SwiperType, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import review1 from "../../public/images/review1.png";
import review2 from "../../public/images/review2.png";

const reviews = [
   {
      image: review1,
      alt: "ziba pay",
      text: "Ziba Pay has been a lifesaver for my business. It has helped me keep track of my sales and manage my finances more efficiently. Plus, the peace of mind knowing that my transactions are secure is invaluable. Thank you, Ziba Pay",
      name: "John Suleman",
      title: "Local Entrepreneur",
   },
   {
      image: review2,
      alt: "ziba pay",
      text: "Being a market woman, I needed something easy and dependable for handling payments. Ziba Pay blew me away with how simple it is to use and how helpful their customer support is. I'd definitely suggest it to any market vendor who wants to make taking payments easier.",
      name: "Mama Aisha",
      title: "Small Business Owner",
   },
   {
      image: review1,
      alt: "ziba pay",
      text: "Ziba Pay has been a lifesaver for my business. It has helped me keep track of my sales and manage my finances more efficiently. Plus, the peace of mind knowing that my transactions are secure is invaluable. Thank you, Ziba Pay",
      name: "John Suleman",
      title: "Local Entrepreneur",
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
                  slidesPerView: 2,
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
                  className="py-4"
               >
                  <div className="flex gap-4 flex-col items-center md:items-start justify-center md:flex-row ">
                     <div className="w-48 h-48 md:w-96">
                        <Image
                           src={review.image}
                           alt={review.alt}
                           layout="responsive"
                           className="object-cover w-full h-full"
                        />
                     </div>

                     <div>
                        <p className="mb-6">{review.text}</p>
                        <div className="flex flex-col  gap-4 md:flex-row ">
                           <h4>{review.name}</h4>
                           <p>{review.title}</p>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </SwiperType>
      </section>
   );
};

export default Slider;
