"use client";

import React from "react";
import { Swiper as SwiperType, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import review1 from "../../public/images/review1.png";
import review2 from "../../public/images/review2.png";
import review3 from "../../public/images/review3.png";
import review4 from "../../public/images/review4.png";
import review5 from "../../public/images/review5.png";
import review6 from "../../public/images/review6.png";
import review7 from "../../public/images/review7.png";
import review8 from "../../public/images/review8.png";

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
      image: review3,
      alt: "ziba pay",
      text: "Using Ziba Pay at the farmers' market has made my life so much easier. my customers are happy and I’m very happy. Thank you Ziba Pay",
      name: "Claudia Angel ",
      title: "Small Business Owner",
   },
   {
      image: review4,
      alt: "ziba pay",
      text: "Ziba Pay has been a lifesaver for my small graphic design studio. I'm not the most tech-savvy person, but their platform is so easy to use. Now, I can focus more on creating designs for my clients and less on worrying about getting paid",
      name: "Solange Fabrice ",
      title: "Owner of  Light designz",
   },
   {
      image: review5,
      alt: "ziba pay",
      text: "Ziba Pay has been a game-changer for my bakery business. I used to struggle with managing payments, but now it's so easy with Ziba Pay.",
      name: "Sarah Chukwu  ",
      title: "MFT Bakery",
   },
   {
      image: review6,
      alt: "ziba pay",
      text: "Running a medium-sized construction company comes with its challenges, but handling payments shouldn't be one of them. Ziba Pay has made it so simple for us to collect payments from our clients, and their platform is really user-friendly. Highly recommend it!",
      name: "Kofi Amida   ",
      title: "Ceo Amida Construtions",
   },
   {
      image: review7,
      alt: "ziba pay",
      text: "As a large enterprise, we have complex payment needs, but Ziba Pay has risen to the challenge. Their platform is robust and scalable, allowing us to handle large volumes of transactions with ease. Plus, their customer support team has been incredibly helpful whenever we've needed assistance.",
      name: "David Johnson    ",
      title: "CEO Maaway ventures",
   },
   {
      image: review8,
      alt: "ziba pay",
      text: "I sell handmade crafts at the local market, and Ziba Pay has made it so much easier for me to accept payments from my customers. It's simple to use, and I love that I can track all my sales in one place. Ziba Pay has definitely made my life easier.",
      name: "Fatima Mensah     ",
      title: "Market Vendor",
   },
];

const Slider = () => {
   return (
      <>
         <section className="mt-5 container text-light">
            <SwiperType
               pagination={{ dynamicBullets: true, clickable: true }}
               modules={[Pagination]}
               breakpoints={{
                  320: {
                     slidesPerView: 1,
                     spaceBetween: 10,
                  },
                  640: {
                     slidesPerView: 1,
                     spaceBetween: 20,
                  },
                  768: {
                     slidesPerView: 1.1,
                     spaceBetween: 30,
                  },
                  900: {
                     slidesPerView: 1.2,
                     spaceBetween: 30,
                  },
                  1024: {
                     slidesPerView: 1.5,
                     spaceBetween: 40,
                  },
                  1100: {
                     slidesPerView: 2,
                     spaceBetween: 40,
                  },
               }}
            >
               {reviews.map((review, index) => (
                  <SwiperSlide
                     key={index}
                     className="py-10"
                  >
                     <div className="flex flex-col sm:flex-row gap-4  items-center sm:items-start">
                        <Image
                           src={review.image}
                           alt={review.alt}
                           className="w-[150px] h-[150px] sm:w-[196px] sm:h-[196px]"
                        />
                        <div className="text-center sm:text-left">
                           <p className="mb-6">{review.text}</p>
                           <div className="flex flex-col sm:flex-row gap-4">
                              <h4>{review.name}</h4>
                              <p className="text-[#00000040]">{review.title}</p>
                           </div>
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </SwiperType>
         </section>
      </>
   );
};

export default Slider;
